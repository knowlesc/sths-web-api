import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { GoalieInfoParams } from '../../../models/players/goalieInfoParams';
import { GetGoalieInfoQueries as Queries } from './getGoalieInfo.queries';
import { GetGoalieInfoFields as Fields } from './getGoalieInfo.fields';
import { SortHelper } from '../../sortHelper';
import { FieldHelper } from '../../fieldHelper';
import { ParamHelper } from '../../paramHelper';

const getWhereConditions = (params: GoalieInfoParams) => {
  const conditions = [];
  const league = params.league === 'farm' ? 'farm' : 'pro';
  const team = ParamHelper.parseNumberParam(params.team);

  if (team >= 0) { conditions.push(Queries.fromTeam(team)); }
  if (params.league) { conditions.push(Queries.fromLeague(league)); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }

  return conditions;
};

export function getGoalieInfo(params: GoalieInfoParams) {
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

  return QueryRunner.runQuery(query);
}

export function getGoalieInfoCount(params: GoalieInfoParams) {
  const conditions = getWhereConditions(params);

  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query);
}
