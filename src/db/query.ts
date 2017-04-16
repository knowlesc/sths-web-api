import { QueryBuilder } from './queryBuilder';

export class Query {
  query: string;
  conditions: string[];
  _limit: number;
  _skip: number;

  constructor(base: string) {
    this.query = base;
    this.conditions = [];
  }

  toString(): string {
    let queryString = QueryBuilder.addWhereClause(this.query, this.conditions);
    queryString = QueryBuilder.addLimitAndSkip(queryString, this._limit, this._skip);

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
    const copy = this.copy();
    copy._limit = limit;

    return copy;
  }

  skip(skip: number): Query {
    const copy = this.copy();
    copy._skip = skip;

    return copy;
  }

  private copy() {
    const other = new Query(this.query);
    other.conditions = this.conditions;
    other._limit = this._limit;
    other._skip = this._skip;

    return other;
  }
}
