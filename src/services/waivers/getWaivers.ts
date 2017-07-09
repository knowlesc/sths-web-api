import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { WaiversParams } from '../../models/waivers/waiversParams';
import { WaiversQueries as Queries } from './getWaivers.queries';
import { FieldHelper } from '../fieldHelper';

const allowedSortFields = [];

export function getWaivers(params: WaiversParams) {
  const query = new Query(Queries.selectWaiversQuery, Queries.fromWaiversQuery)
    .limit(params.limit)
    .skip(params.skip);

  return QueryRunner.runQuery(query);
}

export function getWaiversCount(params: WaiversParams) {
  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromWaiversQuery);

  return QueryRunner.runQuery(query);
}

export function getWaiversOrder() {
  const query = new Query(Queries.selectWaiversOrderQuery, Queries.fromWaiversOrderQuery);

  return QueryRunner.runQuery(query);
}
