import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { SkaterStatsParams } from '../../models/players/skaterStatsParams';
import { SortHelper } from '../sortHelper';
import { GetSkaterStatsQueries as Queries } from './getSkaterStats.queries';

const proStatTable = 'PlayerProStat';
const farmStatTable = 'PlayerFarmStat';
const proTeamTable = 'TeamProInfo';
const farmTeamTable = 'TeamFarmInfo';

const sortableCustomFields = ['Position', 'AvgTOI', 'ShotsPCT', 'P60', 'TeamAbbre'];
const sortableStatFields = ['Number', 'Name', 'GP', 'G', 'A', 'P',
    'PlusMinus', 'PIM', 'Hits', 'Shots', 'ShotsBlock', 'PPG', 'PPA', 'PPP'];

const allowedSortFields = sortableCustomFields.concat(sortableStatFields);

const transformSortField = (field: string, statTable: string):
  { field: string, descending: boolean } => {
  const sort = SortHelper.validateAndConvertSort(field, allowedSortFields);

  if (sort.field) {
    let fieldWithTablePrefix = sort.field;
    if (sortableStatFields.indexOf(sort.field) >= 0) {
      fieldWithTablePrefix = `${statTable}.${sort.field}`;
    }

    sort.field = fieldWithTablePrefix;
  }

  return sort;
};

const getWhereConditions = (params: SkaterStatsParams) => {
  const conditions = [];
  const league = params.league === 'farm' ? 'farm' : 'pro';

  if (params.hasPlayedMinimumGames === 'true') { conditions.push(Queries.hasPlayedMinimumGames); }
  if (params.league) { conditions.push(Queries.fromLeague(league)); }
  if (params.hasPoints === 'true') { conditions.push(Queries.hasPoints); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }
  if (params.team) { conditions.push(Queries.fromTeam(params.team)); }

  return conditions;
};

export function getSkaterStats(params: SkaterStatsParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const teamTableToUse = params.league === 'farm' ? farmTeamTable : proTeamTable;
  const conditions = getWhereConditions(params);
  const sort = transformSortField(params.sort, statTableToUse);

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending);

  return QueryRunner.runQuery(query, statTableToUse, teamTableToUse);
}

export function getSkaterStatsCount(params: SkaterStatsParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const teamTableToUse = params.league === 'farm' ? farmTeamTable : proTeamTable;
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query, statTableToUse, teamTableToUse);
}
