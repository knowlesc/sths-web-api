import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { DB } from '../../../db/sqliteDb';
import { QueryBuilder } from '../../../db/queryBuilder';
import { PlayerSearchParams } from '../../../models/players/playerSearchParams';
import { GetPlayersByNameQueries as Queries } from './getPlayersByName.queries';
import { FieldHelper } from '../../fieldHelper';

export function getPlayersByName(params: PlayerSearchParams) {
  if (!params.name) {
    throw new Error('Missing search query.');
  }

  const escapedName = params.name.replace('\'', '');

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery)
    .with(Queries.resultsUnionQuery)
    .limit(params.limit)
    .skip(params.skip);

  return QueryRunner.runQuery(query, escapedName);
}

export function getPlayersByNameCount(params: PlayerSearchParams) {
  if (!params.name) {
    throw new Error('Missing search query.');
  }

  const escapedName = params.name.replace('\'', '');

  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromQuery)
    .with(Queries.resultsUnionQuery);

  return QueryRunner.runQuery(query, escapedName);
}
