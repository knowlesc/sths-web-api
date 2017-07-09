import { QueryBuilder } from './queryBuilder';

export class Query {
  query: string;
  from: string;
  conditions: string[];
  sort: string;
  sortDescending: boolean;
  _union: Query;
  _limit: number;
  _skip: number;

  constructor(base: string, from: string) {
    this.query = base;
    this.from = from;
    this.conditions = [];
  }

  toString(): string {
    let queryString = QueryBuilder.buildQueryDynamic(this.query, this.from);
    queryString = QueryBuilder.addWhereClause(queryString, this.conditions);
    queryString = QueryBuilder.addOrderBy(queryString, this.sort, this.sortDescending);
    queryString = QueryBuilder.addLimitAndSkip(queryString, this._limit, this._skip);

    if (this._union) {
      queryString = QueryBuilder.buildUnion(queryString, this._union.toString());
    }

    return queryString;
  }

  toFormattedString(...items: string[]) {
    let queryString = this.toString();
    queryString = QueryBuilder.formatQuery(queryString, ...items);

    return queryString;
  }

  where(conditions: string[]): Query {
    const copy = this.copy();
    copy.conditions = conditions;

    return copy;
  }

  limit(limit: number): Query {
    if (limit && isNaN(limit)) {
      throw new Error('Invalid value for limit');
    }

    const copy = this.copy();
    copy._limit = limit;

    return copy;
  }

  skip(skip: number): Query {
    if (skip && isNaN(skip)) {
      throw new Error('Invalid value for skip');
    }

    const copy = this.copy();
    copy._skip = skip;

    return copy;
  }

  orderBy(sort: string, descending?: boolean): Query {
    const copy = this.copy();
    copy.sort = sort;
    copy.sortDescending = !!descending;

    return copy;
  }

  union(query: Query): Query {
    const copy = this.copy();
    copy._union = query;

    return copy;
  }

  private copy() {
    const other = new Query(this.query, this.from);
    other.conditions = this.conditions;
    other._limit = this._limit;
    other._skip = this._skip;

    return other;
  }
}
