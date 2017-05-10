import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';

const allFieldsQuery = `SELECT LeagueLog.*`;
const totalResultsQuery = `SELECT count(*) as count`;

const fromQuery = `FROM LeagueLog`;

const whereConditions = [`
  (LeagueLog.TransactionType = 1)
  OR (LeagueLog.TransactionType = 2)
  OR  (LeagueLog.TransactionType = 3)
  OR  (LeagueLog.TransactionType = 6)
`];

export interface LeagueLogParams {
  skip?: number;
  limit?: number;
}

export function getLeagueLog(params: LeagueLogParams) {
  const query = new Query(allFieldsQuery, fromQuery)
    .where(whereConditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy('LeagueLog.Number', true);

  return QueryRunner.runQuery(query);
}

export function getLeagueLogCount(params: LeagueLogParams) {
  const query = new Query(totalResultsQuery, fromQuery)
    .where(whereConditions)
    .limit(params.limit)
    .skip(params.skip);

  return QueryRunner.runQuery(query);
}
