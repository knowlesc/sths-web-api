import { DB } from '../../db/sqliteDb';
import { Query } from '../../db/query';
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
  skip?: number;
  limit?: number;
}

export function getLeagueLog(params: LeagueLogParams) {
  const query = new Query(baseQuery)
    .limit(params.limit)
    .skip(params.skip)
    .toString();

  log.debug(query);

  return DB.all(query);
}
