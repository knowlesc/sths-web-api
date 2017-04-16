import * as dotenv from 'dotenv';
process.env.NODE_ENV = 'test';
dotenv.config();

import { playersRoutes } from './players';
import { GoalieParams } from '../services/players/getGoalieStats';
import { SkaterParams } from '../services/players/getSkaterStats';
import * as request from 'supertest';
import { expect } from 'chai';

const totalRowsInTable = 10; // See test/scripts/generate-test-data.sql

let app: Express.Application;

describe('players', () => {

  beforeEach(() => {
    app = playersRoutes();
  });

  describe('skaters route', () => {
    it('should succeed', () => {
      return request(app)
        .get('/players/skaters/stats')
        .expect(200);
    });

    it('should succeed with query params', () => {
      const params: SkaterParams = {
        hasPlayedMinimumGames: 'true',
        hasPoints: 'true',
        hasTeam: 'true',
        team: 1
      };

      return request(app)
        .get('/players/skaters/stats')
        .query(params)
        .expect(200);
    });

    it('should retrieve number of rows specified by limit', () => {
      const limit = 2;

      return request(app)
        .get('/players/skaters/stats')
        .query({ limit: limit })
        .expect(200)
        .then((response) => {
          expect(response.body.length).to.eq(limit);
        });
    });

    it('should skip the number of rows specified by skip', () => {
      // Try to request more rows than remain after skip to ensure skip works
      const expectedNumberOfRows = 3;
      const skip = totalRowsInTable - expectedNumberOfRows;
      const limit = expectedNumberOfRows + 1;

      return request(app)
        .get('/players/skaters/stats')
        .query({ limit: limit, skip: skip })
        .expect(200)
        .then((response) => {
          expect(response.body.length).to.eq(expectedNumberOfRows);
        });
    });
  });

  describe('goalies route', () => {
    it('should succeed', () => {
      return request(app)
        .get('/players/goalies/stats')
        .expect(200);
    });

    it('should succeed with query params', () => {
      const params: GoalieParams = {
        hasPlayedMinimumGames: 'true',
        hasSavePercentage: 'true',
        hasTeam: 'true'
      };

      return request(app)
        .get('/players/goalies/stats')
        .query(params)
        .expect(200);
    });
  });
});
