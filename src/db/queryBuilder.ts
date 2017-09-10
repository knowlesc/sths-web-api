const limitClause = (limit: number) => limit ? `LIMIT ${limit}` : '';
const skipClause = (skip: number) => skip ? `OFFSET ${skip}` : '';
const orderByClause = (field: string, order: 'ASC' | 'DESC') => `ORDER BY ${field} ${order}`;

export class QueryBuilder {
  static addWhereClause(baseQuery, conditions: string[]): string {
    let whereClause = '';
    if (!conditions || conditions.length === 0) {
      return baseQuery;
    }

    const wrappedConditions = conditions
      .map((w) => w ? '(' + w + ')\n' : '')
      .join('  AND ');

    if (wrappedConditions) {
      whereClause += 'WHERE ' + wrappedConditions;
    }

    return `${baseQuery}\n${whereClause}`;
  }

  static buildQueryDynamic(...args: string[]): string {
    let query = '';

    for (const arg of args) {
      if (!query) {
        query = arg;
      } else {
        query += ' ' + arg;
      }
    }

    return query;
  }

  static addOrderBy(query: string, sort: string, descending?: boolean): string {
    if (!sort) {
      return query;
    }

    const order = descending ? 'DESC' : 'ASC';

    return this.buildQueryDynamic(
      query,
      orderByClause(sort, order));
  }

  static addLimitAndSkip(query: string, limit: number, skip: number): string {
    if (!limit) {
      return query;
    }

    return this.buildQueryDynamic(
      query,
      limitClause(limit),
      skipClause(skip));
  }

  static buildUnion(query1: string, query2: string): string {
    if (!query2) {
      return query1;
    }

    return `
      ${query1}
        UNION
      ${query2}`;
  }

  static formatQuery(query: string, ...args: (string | number) []): string {
    let i = 0;
    let regex = new RegExp('\\{' + i.toString() + '\\}', 'g');

    while (regex.test(query)) {
      if (args[i] === undefined) {
        throw new Error('formatQuery: No argument provided for {' + i + '}');
      }

      query = query.replace(regex, args[i].toString());

      i++;
      regex = new RegExp('\\{' + i.toString() + '\\}', 'g');
    }

    return query;
  }
}
