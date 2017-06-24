import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { TeamInfoParams } from '../../../models/teams/teamInfoParams';
import { TeamInfoQueries as Queries } from './getTeamInfo.queries';
import { ParamHelper } from '../../paramHelper';

const farmTable = 'TeamFarmInfo';
const proTable = 'TeamProInfo';

const getWhereConditions = (params: TeamInfoParams) => {
  const conditions = [];

  const id = ParamHelper.parseNumberParam(params.id);
  if (id >= 0) {
    conditions.push(Queries.hasId(id));
  }

  return conditions;
};

export function getTeamList(params: TeamInfoParams) {
  const tableToUse = params.league === 'farm' ? farmTable : proTable;

  const query = new Query(Queries.selectListFieldsQuery, Queries.fromQuery)
    .orderBy('{0}.Abbre');

  return QueryRunner.runQuery(query, tableToUse);
}

export function getTeamInfo(params: TeamInfoParams) {
  const id = ParamHelper.parseNumberParam(params.id);
  if (id < 0) {
    throw new Error('Missing or invalid team ID.');
  }

  const tableToUse = params.league === 'farm' ? farmTable : proTable;
  const otherTable = params.league === 'farm' ? proTable : farmTable;
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.selectAllFieldsQuery, Queries.fromQuery)
    .where(conditions)
    .orderBy('{0}.Abbre');

  return QueryRunner.runQuerySingle(query, tableToUse, otherTable);
}
