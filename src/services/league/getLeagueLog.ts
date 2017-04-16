import { DB } from '../../db/sqliteDb';
import { QueryBuilder } from '../../db/queryBuilder';
import { Logger } from '../../common/logger';

const log = new Logger('getLeagueLog');

const baseQuery = `
  SELECT LeagueLog.*
  FROM LeagueLog
  WHERE ((LeagueLog.TransactionType = 1)
    OR (LeagueLog.TransactionType = 2)
    OR  (LeagueLog.TransactionType = 3)
    OR  (LeagueLog.TransactionType = 6))
  ORDER BY LeagueLog.Number DESC
`;

export interface LeagueLogParams {
  skip: number;
  limit: number;
}

export function getLeagueLog(params: LeagueLogParams) {
  const query = QueryBuilder.buildQuery(baseQuery, params.limit, params.limit ? params.skip : null);

  log.debug(query);

  return DB.all(query);
}