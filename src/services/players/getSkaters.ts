import { DB } from '../../db/sqliteDb';
import { QueryBuilder} from '../../db/queryBuilder';
import { Logger } from '../../common/logger';

const log = new Logger('getSkaters');

const baseQuery = `
  SELECT PlayerProStat.G, PlayerProStat.A, PlayerProStat.P, PlayerProStat.GP,
    PlayerProStat.Name, PlayerProStat.Number, TeamProInfo.Abbre
  FROM
    (
      PlayerInfo INNER JOIN PlayerProStat ON PlayerInfo.Number = PlayerProStat.Number
    )
    LEFT JOIN TeamProInfo ON PlayerInfo.Team = TeamProInfo.Number
  {0}
  ORDER BY PlayerProStat.P DESC, PlayerProStat.G DESC, PlayerProStat.GP ASC
`;

const hasPoints = `PlayerProStat.P > 0`;
const hasTeam = `PlayerInfo.Team > 0`;
const hasPlayedMinimumGames = `PlayerProStat.GP >= (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)`;

export class SkaterParams {
  hasPlayedMinimumGames: boolean;
  hasTeam: boolean;
  hasPoints: boolean;
}

export function getSkaters(params: SkaterParams) {
  const conditions = [];
  if (params.hasPlayedMinimumGames) {
    conditions.push(hasPlayedMinimumGames);
  }
  if (params.hasPoints) {
    conditions.push(hasPoints);
  }
  if (params.hasTeam) {
    conditions.push(hasTeam);
  }

  const whereClause = QueryBuilder.buildWhereClause(conditions);
  const query = QueryBuilder.formatQuery(baseQuery, whereClause);

  log.debug(query);

  return DB.all(query);
}