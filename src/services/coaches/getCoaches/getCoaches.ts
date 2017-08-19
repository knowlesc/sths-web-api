import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { CoachParams } from '../../../models/coaches/coachParams';
import { GetCoachesQueries as Queries } from './getCoaches.queries';
import { GetCoachesFields as Fields } from './getCoaches.fields';
import { FieldHelper } from '../../fieldHelper';
import { SortHelper } from '../../sortHelper';

export function getCoaches(params: CoachParams) {
  const sort = SortHelper.validateAndConvertSort(
    params.sort, Fields.allowedFields, Fields.getFullColumnName);
  const select = FieldHelper.generateSelectQuery(
    params.fields, Fields.allowedFields, Fields.getFullColumnDescriptor);
  const query = new Query(select, Queries.fromQuery)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending);

  return QueryRunner.runQuery(query);
}

export function getCoachesCount(params: CoachParams) {
  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromQuery);

  return QueryRunner.runQuery(query);
}
