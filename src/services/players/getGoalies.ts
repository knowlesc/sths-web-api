import { DB } from '../../db/sqliteDb';
import { QueryBuilder } from '../../db/queryBuilder';
import { Logger } from '../../common/logger';

const log = new Logger('getGoalies');

const baseQuery = `
  SELECT ROUND((CAST(GoalerProStat.SA - GoalerProStat.GA AS REAL) / (GoalerProStat.SA)),3) AS PCT,
    GoalerProStat.W, GoalerProStat.SecondPlay, GoalerProStat.Name, GoalerProStat.Number, TeamProInfo.Abbre
  FROM
    (
      GoalerInfo INNER JOIN GoalerProStat ON GoalerInfo.Number = GoalerProStat.Number
    ) LEFT JOIN TeamProInfo ON GoalerInfo.Team = TeamProInfo.Number
  {0}
  ORDER BY PCT DESC, GoalerProStat.W DESC
`;

const hasPlayedMinimumGames = `
  (GoalerProStat.SecondPlay >= (
    (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)*3600)
  )
`;

const hasTeam = `(GoalerInfo.Team > 0)`;
const hasSavePercentage = `(PCT > 0)`;

export class GoalieParams {
  hasPlayedMinimumGames: boolean;
  hasTeam: boolean;
  hasSavePercentage: boolean;
}

export function getGoalies(params: GoalieParams) {
  const conditions = [];
  if (params.hasPlayedMinimumGames) {
    conditions.push(hasPlayedMinimumGames);
  }
  if (params.hasSavePercentage) {
    conditions.push(hasSavePercentage);
  }
  if (params.hasTeam) {
    conditions.push(hasTeam);
  }

  const whereClause = QueryBuilder.buildWhereClause(conditions);
  const query = QueryBuilder.formatQuery(baseQuery, whereClause);

  log.debug(query);

  return DB.all(query);
}