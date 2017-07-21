import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { TeamInfoParams } from '../../../models/teams/teamInfoParams';
import { TeamFinancesQueries as Queries } from './getTeamFinances.queries';
import { ParamHelper } from '../../paramHelper';

const getWhereConditions = (params: TeamInfoParams) => {
  const conditions = [];

  const id = ParamHelper.parseNumberParam(params.id);
  if (id >= 0) {
    conditions.push(Queries.hasId(id));
  }

  return conditions;
};

export function getTeamFinances(params: TeamInfoParams) {
  const id = ParamHelper.parseNumberParam(params.id);
  if (id < 0) {
    throw new Error('Missing or invalid team ID.');
  }

  const conditions = getWhereConditions(params);
  const selectQuery = params.league === 'farm' ? Queries.selectFarmFinanceQuery : Queries.selectProFinanceQuery;
  const tablesToUse = params.league === 'farm' ? ['TeamFarmStat', 'TeamFarmInfo'] : ['TeamProStat', 'TeamProInfo'];

  const query = new Query(selectQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuerySingle(query, ...tablesToUse);
}
