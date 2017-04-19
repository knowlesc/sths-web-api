import { DB } from '../../db/sqliteDb';
import { Query } from '../../db/query';
import { Logger } from '../../common/logger';

const log = new Logger('getSkaterStats');

const shotPctFormula = `ROUND((CAST({0}.G AS REAL) / ({0}.Shots)) * 100, 2)`;
const amgFormula = `ROUND((CAST({0}.SecondPlay AS REAL) / 60 / ({0}.GP)), 2)`;
const faceoffPctFormula = `ROUND((CAST({0}.FaceOffWon AS REAL) / ({0}.FaceOffTotal)) * 100, 2)`;
const pointsPer60Formula = `ROUND((CAST({0}.P AS REAL) / ({0}.SecondPlay) * 60 * 60),2)`;

const baseQuery = `
  SELECT {0}.*, PlayerInfo.PosC, PlayerInfo.PosLW, PlayerInfo.PosRW, PlayerInfo.PosD,
    PlayerInfo.TeamName, ${shotPctFormula} AS ShotsPCT, ${amgFormula} AS AMG,
    ${faceoffPctFormula} as FaceoffPCT, ${pointsPer60Formula} AS P60
  FROM PlayerInfo INNER JOIN {0} ON PlayerInfo.Number = {0}.Number
`;

const fromTeam = (teamId: number) => `PlayerInfo.Team = ${teamId}`;

const hasPoints = `{0}.P > 0`;
const hasTeam = `PlayerInfo.Team > 0`;
const hasPlayedMinimumGames = `{0}.GP >= (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)`;

const proStatTable = 'PlayerProStat';
const farmStatTable = 'PlayerFarmStat';

export interface SkaterParams {
  hasPlayedMinimumGames?: string;
  hasTeam?: string;
  hasPoints?: string;
  league?: string;
  team?: number;
  limit?: number;
  skip?: number;
}

export function getSkaters(params: SkaterParams) {
  const conditions = [];
  if (params.hasPlayedMinimumGames === 'true') {
    conditions.push(hasPlayedMinimumGames);
  }
  if (params.hasPoints === 'true') {
    conditions.push(hasPoints);
  }
  if (params.hasTeam === 'true') {
    conditions.push(hasTeam);
  }
  if (params.team) {
    conditions.push(fromTeam(params.team));
  }

  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;

  const query = new Query(baseQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .toFormattedString(statTableToUse);

  log.debug(query);

  return DB.all(query);
}
