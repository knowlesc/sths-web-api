import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { SortHelper } from '../sortHelper';
import { GoalieStatsParams } from '../../models/players/goalieStatsParams';
import { GetGoalieStatsQueries as Queries } from './getGoalieStats.queries';

const proStatTable = 'GoalerProStat';
const farmStatTable = 'GoalerFarmStat';

const allowedSortFields = ['Name', 'TeamAbbre', 'GP', 'W', 'L', 'OTL', 'PCT', 'GAA',
  'SecondPlay', 'Pim', 'Shootout', 'GA', 'SA', 'A', 'EmptyNetGoal', 'PenaltyShotsPCT',
  'PenalityShotsShots'];

const getWhereConditions = (params: GoalieStatsParams) => {
  const conditions = [];
  const league = params.league === 'farm' ? 'farm' : 'pro';

  if (params.hasPlayedMinimumGames === 'true') { conditions.push(Queries.hasPlayedMinimumGames); }
  if (params.hasSavePercentage === 'true') { conditions.push(Queries.hasSavePercentage); }
  if (params.league) { conditions.push(Queries.fromLeague(league)); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }
  if (params.team) { conditions.push(Queries.fromTeam(params.team)); }

  return conditions;
};

export function getGoalieStats(params: GoalieStatsParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const conditions = getWhereConditions(params);
  const sort = SortHelper.validateAndConvertSort(
    params.sort, allowedSortFields, (field) => `{0}.${field}`);

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending);

  return QueryRunner.runQuery(query, statTableToUse);
}

export function getGoalieStatsCount(params: GoalieStatsParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query, statTableToUse);
}
