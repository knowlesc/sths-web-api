import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { TeamStatsParams } from '../../../models/teams/teamStatsParams';
import { TeamStatsQueries as Queries } from './getTeamStats.queries';
import { TeamStatsFields as Fields } from './getTeamStats.fields';
import { SortHelper } from '../../sortHelper';
import { FieldHelper } from '../../fieldHelper';
import { ParamHelper } from '../../paramHelper';

const proStatTable = 'TeamProStat';
const farmStatTable = 'TeamFarmStat';

const getWhereConditions = (params: TeamStatsParams) => {
  const conditions = [];
  const team = ParamHelper.parseNumberParam(params.team);

  if (team >= 0) { conditions.push(Queries.fromTeam(team)); }

  return conditions;
};

export function getTeamStats(params: TeamStatsParams) {
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

export function getTeamStatsCount(params: TeamStatsParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const conditions = getWhereConditions(params);

  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query, statTableToUse);
}
