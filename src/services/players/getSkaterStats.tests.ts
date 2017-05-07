import { Query } from '../../db/query';
import { QueryRunner } from '../../db/queryRunner';
import { getSkaters, getSkatersCount } from './getSkaterStats';
import { GetSkaterStatsQueries } from './getSkaterStats.queries';
import { SkaterStatsParams } from '../../models/players/skaterStatsParams';

import * as sinon from 'sinon';
import { expect } from 'chai';
import 'sinon-chai';

const totalRowsInTable = 10; // See test/scripts/generate-test-data.sql

let skaterParams: SkaterStatsParams;

describe('getSkaterStats', () => {
  let spy: sinon.SinonStub;

  beforeEach(() => {
    spy = sinon.stub(QueryRunner, 'runQuery');
    spy.returns(Promise.resolve());
    skaterParams = {};
  });

  afterEach(() => {
    spy.restore();
  });

  describe('main query', () => {

    it('should succeed', () => {
      getSkaters(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query._limit).not.to.exist;
      expect(query._skip).not.to.exist;
      expect(query.sort).not.to.exist;
      expect(query.query).to.equal(GetSkaterStatsQueries.allFieldsQuery);
      expect(query.from).to.equal(GetSkaterStatsQueries.fromQuery);
      expect(query.conditions.length).to.equal(0);
    });

    it('should apply the limit param', () => {
      skaterParams.limit = 5;

      getSkaters(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query._limit).to.equal(5);
    });

    it('should apply the skip param', () => {
      skaterParams.skip = 5;

      getSkaters(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query._skip).to.equal(5);
    });

    it('should apply the hasPlayedMinimumGames param', () => {
      skaterParams.hasPlayedMinimumGames = 'true';

      getSkaters(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.hasPlayedMinimumGames);
    });

    it('should apply the hasPoints param', () => {
      skaterParams.hasPoints = 'true';

      getSkaters(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.hasPoints);
    });

    it('should apply the hasTeam param', () => {
      skaterParams.hasTeam = 'true';

      getSkaters(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.hasTeam);
    });

    it('should apply the team param', () => {
      skaterParams.team = 5;

      getSkaters(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.fromTeam(5));
    });

    describe('sort', () => {

      const testData: { sort: string; expectedSort: string; shouldBeDescending: boolean; }[] =
        [
          { sort: 'TeamAbbre', expectedSort: 'TeamAbbre', shouldBeDescending: false },
          { sort: '-Position', expectedSort: 'Position', shouldBeDescending: true },
          { sort: '-Number', expectedSort: 'PlayerProStat.Number', shouldBeDescending: true }
        ];

      testData.forEach((testCase, index) => {
        it(`should apply sort param (case ${index})`, () => {
          skaterParams.sort = testCase.sort;

          getSkaters(skaterParams);

          const query = spy.getCalls()[0].args[0] as Query;
          expect(query.sort).to.equal(testCase.expectedSort);
          expect(query.sortDescending).to.equal(testCase.shouldBeDescending);
        });
      });
    });
  });

  describe('count query', () => {

    it('should succeed', () => {
      getSkatersCount(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query._limit).not.to.exist;
      expect(query._skip).not.to.exist;
      expect(query.sort).not.to.exist;
      expect(query.query).to.equal(GetSkaterStatsQueries.totalResultsQuery);
      expect(query.from).to.equal(GetSkaterStatsQueries.fromQuery);
      expect(query.conditions.length).to.equal(0);
    });

    it('should apply the hasPlayedMinimumGames param', () => {
      skaterParams.hasPlayedMinimumGames = 'true';

      getSkatersCount(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.hasPlayedMinimumGames);
    });

    it('should apply the hasPoints param', () => {
      skaterParams.hasPoints = 'true';

      getSkatersCount(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.hasPoints);
    });

    it('should apply the hasTeam param', () => {
      skaterParams.hasTeam = 'true';

      getSkatersCount(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.hasTeam);
    });

    it('should apply the team param', () => {
      skaterParams.team = 5;

      getSkatersCount(skaterParams);

      const query = spy.getCalls()[0].args[0] as Query;
      expect(query.conditions).to.contain(GetSkaterStatsQueries.fromTeam(5));
    });
  });
});
