import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { LeagueLogParams } from '../../../models/league/leagueLogParams';
import { GetLeagueLogQueries as Queries } from './getLeagueLog.queries';
import { ParamHelper } from '../../paramHelper';
import { FieldHelper } from '../../fieldHelper';

const getWhereConditions = (params: LeagueLogParams) => {
  const conditions = [];

  let typesToFilterOn = [1, 2, 3, 6];
  if (params.type) {
    const types = params.type.split(',');
    if (types.length >= 0) {
      typesToFilterOn = types.map((type) => ParamHelper.parseNumberParam(parseInt(type)));
    }
  }

  conditions.push(Queries.types(typesToFilterOn));

  return conditions;
};

export function getLeagueLog(params: LeagueLogParams) {
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy('LeagueLog.Number', true);

  return QueryRunner.runQuery(query);
}

export function getLeagueLogCount(params: LeagueLogParams) {
  const conditions = getWhereConditions(params);

  const query = new Query(FieldHelper.totalResultsQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip);

  return QueryRunner.runQuery(query);
}
