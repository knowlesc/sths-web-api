import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { SortHelper } from '../../sortHelper';
import { GetGoalieStatsFields as Fields } from './getGoalieStats.fields';
import { GoalieStatsParams } from '../../../models/players/goalieStatsParams';
import { GetGoalieStatsQueries as Queries } from './getGoalieStats.queries';
import { FieldHelper } from '../../fieldHelper';
import { ParamHelper } from '../../paramHelper';

const proStatTable = 'GoalerProStat';
const farmStatTable = 'GoalerFarmStat';

const allowedSortFields = ['Name', 'TeamAbbre', 'GP', 'W', 'L', 'OTL', 'PCT', 'GAA',
  'SecondPlay', 'Pim', 'Shootout', 'GA', 'SA', 'A', 'EmptyNetGoal', 'PenaltyShotsPCT',
  'PenalityShotsShots'];

const getWhereConditions = (params: GoalieStatsParams) => {
  const conditions = [];
  const league = params.league === 'farm' ? 'farm' : 'pro';
  const team = ParamHelper.parseNumberParam(params.team);

  if (team >= 0) { conditions.push(Queries.fromTeam(team)); }
  if (params.hasPlayedMinimumGames === 'true') { conditions.push(Queries.hasPlayedMinimumGames); }
  if (params.hasSavePercentage === 'true') { conditions.push(Queries.hasSavePercentage); }
  if (params.league) { conditions.push(Queries.fromLeague(league)); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }

  return conditions;
};

export function getGoalieStats(params: GoalieStatsParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const conditions = getWhereConditions(params);
  const sort = SortHelper.validateAndConvertSort(
    params.sort, Fields.allowedFields, Fields.getFullColumnName);
  const select = FieldHelper.generateSelectQuery(
    params.fields, Fields.allowedFields, Fields.getFullColumnDescriptor);

  const query = new Query(select, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending);

  return QueryRunner.runQuery(query, statTableToUse);
}

export function getGoalieStatsCount(params: GoalieStatsParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const conditions = getWhereConditions(params);

  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query, statTableToUse);
}
