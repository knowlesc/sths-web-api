import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { LeagueLogParams } from '../../../models/league/leagueLogParams';
import { GetLeagueLogQueries as Queries } from './getLeagueLog.queries';
import { TransactionTypes } from '../../../models/league/transactionTypes';
import { ParamHelper } from '../../paramHelper';
import { FieldHelper } from '../../fieldHelper';

const getWhereConditions = (params: LeagueLogParams) => {
  const conditions = [];

  let typesToFilterOn = [
    TransactionTypes.Trade,
    TransactionTypes.Injury,
    TransactionTypes.Waiver,
    TransactionTypes.Suspension
  ];

  if (params.type) {
    const types = params.type.split(',');
    if (types.length >= 0) {
      typesToFilterOn = types.map((type) => ParamHelper.parseNumberParam(parseInt(type)));
    }
  }

  conditions.push(Queries.types(typesToFilterOn));

  if (typesToFilterOn.length === 1 && typesToFilterOn[0] === TransactionTypes.Trade) {
    conditions.push(Queries.tradeFilter);
  }

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
    .where(conditions);

  return QueryRunner.runQuery(query);
}
