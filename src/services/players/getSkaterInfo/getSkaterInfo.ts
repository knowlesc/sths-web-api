import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { SkaterInfoParams } from '../../../models/players/skaterInfoParams';
import { GetSkaterInfoQueries as Queries } from './getSkaterInfo.queries';
import { GetSkaterInfoFields as Fields } from './getSkaterInfo.fields';
import { SortHelper } from '../../sortHelper';
import { FieldHelper } from '../../fieldHelper';

const getWhereConditions = (params: SkaterInfoParams) => {
  const conditions = [];
  const league = params.league === 'farm' ? 'farm' : 'pro';

  // If an ID is provided, none of the other params apply
  if (params.id && !isNaN(parseInt(params.id))) {
    conditions.push(Queries.hasId(params.id));

    return conditions;
  }

  if (!isNaN(params.team)) { conditions.push(Queries.fromTeam(params.team)); }
  if (params.league) { conditions.push(Queries.fromLeague(league)); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }

  return conditions;
};

export function getSingleSkaterInfo(params: SkaterInfoParams) {
  if (!params.id || isNaN(parseInt(params.id))) {
    throw new Error('Missing or invalid skater ID.');
  }

  const select = FieldHelper.generateSelectQuery(
    params.fields, Fields.allowedFields, Fields.getFullColumnDescriptor);

  const query = new Query(select, Queries.fromQuery)
    .where([Queries.hasId(params.id)]);

    return QueryRunner.runQuerySingle(query);
}

export function getSkaterInfo(params: SkaterInfoParams) {
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

export function getSkaterInfoCount(params: SkaterInfoParams) {
  const conditions = getWhereConditions(params);

  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query);
}
