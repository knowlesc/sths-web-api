import * as dotenv from 'dotenv';
process.env.NODE_ENV = 'test';
dotenv.config();

import { leagueRoutes } from './league';
import * as request from 'supertest';
import { expect } from 'chai';

const totalRowsInTable = 6; // See test/scripts/generate-test-data.sql

let app: Express.Application;

describe('league', () => {

  beforeEach(() => {
    app = leagueRoutes();
  });

  describe('log route', () => {
    it('should succeed with no query params', () => {
      return request(app)
        .get('/league/log')
        .expect(200);
    });

    it('should retrieve number of rows specified by limit', () => {
      const limit = 2;

      return request(app)
        .get('/league/log')
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
        .get('/league/log')
        .query({ limit: limit, skip: skip })
        .expect(200)
        .then((response) => {
          expect(response.body.length).to.eq(expectedNumberOfRows);
        });
    });
  });
});
