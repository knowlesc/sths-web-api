import { Query } from './query';
import { DB } from './sqliteDb';

export class QueryRunner {
  static runQuery(query: Query, ...args: string[]) {
    const queryString = (args && args.length > 0) ?
      query.toFormattedString(...args) :
      query.toString();

    return DB.all(queryString);
  }

  static runQuerySingle(query: Query, ...args: string[]) {
    const queryString = (args && args.length > 0) ?
      query.toFormattedString(...args) :
      query.toString();

    return DB.get(queryString);
  }
}
