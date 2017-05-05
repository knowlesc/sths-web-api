import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { TeamListParams } from '../../models/teams/teamListParams';

const selectQuery = `SELECT Abbre, Name`;
const fromQuery = `FROM {0}`;

const farmTable = 'TeamFarmInfo';
const proTable = 'TeamProInfo';

export function getTeamList(params: TeamListParams) {
  const tableToUse = params.league === 'farm' ? farmTable : proTable;

  const query = new Query(selectQuery, fromQuery)
    .orderBy('Abbre');

  return QueryRunner.runQuery(query, tableToUse);
}
