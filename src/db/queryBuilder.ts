import { Logger } from '../common/logger';

const log = new Logger('QueryBuilder');

const limitClause = (limit: number) => limit ? `LIMIT ${limit}` : '';
const skipClause = (skip: number) => skip ? `OFFSET ${skip}` : '';

export class QueryBuilder {
  static buildWhereClause(where: string[]): string {
    if (where.length === 0) {
      return '';
    }

    const clause = where.map((w) => w ? '(' + w + ')\n' : '');
    if (!clause) {
      return '';
    }

    return 'WHERE\n' + clause.join('  AND ');
  }

  static buildQueryDynamic(...args: string[]): string {
    let query = '';

    for (let i = 0; i < args.length; i++) {
      if (!query) {
        query = args[i];
      } else {
        query += ' ' + args[i];
      }
    }

    return query;
  }

  static buildQuery(query: string, limit: number, skip: number): string {
    return this.buildQueryDynamic(
      query,
      limitClause(limit),
      skipClause(skip));
  }

  static formatQuery(query: string, ...args: (string | number) []): string {
    let i = 0;

    const regex = new RegExp('\\{' + i.toString() + '\\}', 'g');

    while (regex.test(query)) {
      if (args[i] === undefined) {
        throw new Error('formatQuery: No argument provided for {' + i + '}');
      }

      query = query.replace(regex, args[i].toString());
      i++;
    }

    return query;
  }
}