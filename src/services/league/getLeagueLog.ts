import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';

const selectQuery = `SELECT LeagueLog.*`;

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
  const query = new Query(selectQuery, fromQuery)
    .where(whereConditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy('LeagueLog.Number', true);

  return QueryRunner.runQuery(query);
}
