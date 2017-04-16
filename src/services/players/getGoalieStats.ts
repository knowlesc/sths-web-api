import { DB } from '../../db/sqliteDb';
import { Query } from '../../db/query';
import { Logger } from '../../common/logger';

const log = new Logger('getGoalieStats');

const gaaFormula = `ROUND((CAST({0}.GA AS REAL) / ({0}.SecondPlay / 60)) * 60, 3)`;
const pctFormula = `ROUND((CAST({0}.SA - {0}.GA AS REAL) / ({0}.SA)), 3)`;
const psPctFormula = `
  ROUND((CAST({0}.PenalityShotsShots - {0}.PenalityShotsGoals AS REAL) /
  ({0}.PenalityShotsShots)), 3)
`;

const baseQuery = `
  SELECT GoalerInfo.TeamName, {0}.*, ${gaaFormula} AS GAA, ${pctFormula} AS PCT, ${psPctFormula} AS PenaltyShotsPCT
  FROM GoalerInfo
  INNER JOIN {0} ON GoalerInfo.Number = {0}.Number
`;

const fromTeam = (teamId: number) => `GoalerInfo.Team = ${teamId}`;

const hasTeam = `(GoalerInfo.Team > 0)`;
const hasSavePercentage = `(PCT > 0)`;
const hasPlayedMinimumGames = `
  ({0}.SecondPlay >= (
    (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)*3600)
  )
`;

const proStatTable = 'GoalerProStat';
const farmStatTable = 'GoalerFarmStat';

export interface GoalieParams {
  hasPlayedMinimumGames?: string;
  hasTeam?: string;
  hasSavePercentage?: string;
  team?: number;
  limit?: number;
  skip?: number;
}

export function getGoalies(params: GoalieParams) {
  const conditions = [];
  if (params.hasPlayedMinimumGames === 'true') {
    conditions.push(hasPlayedMinimumGames);
  }
  if (params.hasSavePercentage === 'true') {
    conditions.push(hasSavePercentage);
  }
  if (params.hasTeam === 'true') {
    conditions.push(hasTeam);
  }
  if (params.team) {
    conditions.push(fromTeam(params.team));
  }

  const query = new Query(baseQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .toFormattedString(proStatTable);

  log.debug(query);

  return DB.all(query);
}
