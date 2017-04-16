import { QueryBuilder } from './queryBuilder';
import { expect } from 'chai';

describe('queryBuilder', () => {

  describe('addWhereClause', () => {

    const collapseSpaces = (str: string) => str.replace(/\s+/g, ' ').trim();

    it('should work with null conditions', () => {
      const base = 'QUERY';
      const conditions = null;

      const result = QueryBuilder.addWhereClause(base, conditions);

      expect(collapseSpaces(result)).to.eq(base);
    });

    it('should work with zero conditions', () => {
      const base = 'QUERY';
      const conditions = [];

      const result = QueryBuilder.addWhereClause(base, conditions);

      expect(collapseSpaces(result)).to.eq(base);
    });

    it('should work with a single condition', () => {
      const base = 'QUERY';
      const conditions = ['a'];
      const expected = 'QUERY WHERE (a)';

      const result = QueryBuilder.addWhereClause(base, conditions);

      expect(collapseSpaces(result)).to.eq(expected);
    });
  });
});
