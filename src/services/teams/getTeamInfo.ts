import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { TeamInfoParams } from '../../models/teams/teamInfoParams';

const selectListFieldsQuery = `SELECT Abbre, Name`;
const selectAllFieldsQuery = `SELECT *`;
const fromQuery = `FROM {0}`;

const farmTable = 'TeamFarmInfo';
const proTable = 'TeamProInfo';

const getWhereConditions = (params: TeamInfoParams) => {
  const conditions = [`Abbre = '${params.id}'`];

  return conditions;
};

export function getTeamList(params: TeamInfoParams) {
  const tableToUse = params.league === 'farm' ? farmTable : proTable;

  const query = new Query(selectListFieldsQuery, fromQuery)
    .orderBy('Abbre');

  return QueryRunner.runQuery(query, tableToUse);
}

export function getTeamInfo(params: TeamInfoParams) {
  if (!params.id || !/[A-Z][A-Z][A-Z]/.test(params.id)) {
    throw new Error('Missing or invalid team ID.');
  }

  const tableToUse = params.league === 'farm' ? farmTable : proTable;
  const conditions = getWhereConditions(params);

  const query = new Query(selectAllFieldsQuery, fromQuery)
    .where(conditions)
    .orderBy('Abbre');

  return QueryRunner.runQuerySingle(query, tableToUse);
}
