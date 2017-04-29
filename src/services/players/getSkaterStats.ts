import { DB } from '../../db/sqliteDb';
import { Query } from '../../db/query';
import { Logger } from '../../common/logger';

const log = new Logger('getSkaterStats');

const shotPctFormula = `ROUND((CAST({0}.G AS REAL) / ({0}.Shots)) * 100, 2)`;
const toiPerGameFormula = `ROUND((CAST({0}.SecondPlay AS REAL) / ({0}.GP)), 2)`;
const faceoffPctFormula = `ROUND((CAST({0}.FaceOffWon AS REAL) / ({0}.FaceOffTotal)) * 100, 2)`;
const pointsPer60Formula = `ROUND((CAST({0}.P AS REAL) / ({0}.SecondPlay) * 60 * 60),2)`;
const positionFormula = `CASE
  WHEN PlayerInfo.PosC = 'True' THEN 'C'
  WHEN PlayerInfo.PosLW = 'True' THEN 'LW'
  WHEN PlayerInfo.PosRW = 'True' THEN 'RW'
  WHEN PlayerInfo.PosD = 'True' THEN 'D'
END`;

const baseQuery = `
  SELECT {0}.*, ${positionFormula} as Position,
    PlayerInfo.TeamName, ${shotPctFormula} AS ShotsPCT, ${toiPerGameFormula} AS AvgTOI,
    ${faceoffPctFormula} as FaceoffPCT, ${pointsPer60Formula} AS P60
  FROM PlayerInfo INNER JOIN {0} ON PlayerInfo.Number = {0}.Number
`;

const fromTeam = (teamId: number) => `PlayerInfo.Team = ${teamId}`;

const hasPoints = `{0}.P > 0`;
const hasTeam = `PlayerInfo.Team > 0`;
const hasPlayedMinimumGames = `{0}.GP >= (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)`;

const proStatTable = 'PlayerProStat';
const farmStatTable = 'PlayerFarmStat';

const sortablePlayerInfoFields = ['TeamName'];
const sortableCustomFields = ['Position', 'AvgTOI', 'ShotsPCT', 'P60'];
const sortableStatFields = ['Number', 'Name', 'GP', 'G', 'A', 'P',
  'PlusMinus', 'PIM', 'Hits', 'Shots', 'ShotsBlock', 'PPG', 'PPA', 'PPP'];

const allowedSortFields = sortablePlayerInfoFields
  .concat(sortableCustomFields)
  .concat(sortableStatFields);

const transformSortField = (field: string, statTable: string):
  { field: string, descending: boolean } => {
  if (!validateSort(field)) {
    return { field: null, descending: false };
  }

  let descending = false;
  if (field[0] === '-') {
    field = field.substring(1);
    descending = true;
  }

  let fieldWithTablePrefix = field;
  if (sortablePlayerInfoFields.indexOf(field) >= 0) {
    fieldWithTablePrefix = `PlayerInfo.${field}`;
  } else if (sortableStatFields.indexOf(field) >= 0) {
    fieldWithTablePrefix = `${statTable}.${field}`;
  }

  return { field: fieldWithTablePrefix, descending: descending };
};

const validateSort = (field: string) => {
  if (!field) {
    return false;
  }

  if (field[0] === '-') {
    return allowedSortFields.indexOf(field.substring(1)) >= 0;
  } else {
    return allowedSortFields.indexOf(field) >= 0;
  }
};

export interface SkaterParams {
  hasPlayedMinimumGames?: string;
  hasTeam?: string;
  hasPoints?: string;
  league?: string;
  team?: number;
  limit?: number;
  skip?: number;
  sort?: string;
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
  const sort = transformSortField(params.sort, statTableToUse);

  const query = new Query(baseQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending)
    .toFormattedString(statTableToUse);

  log.debug(query);

  return DB.all(query);
}
