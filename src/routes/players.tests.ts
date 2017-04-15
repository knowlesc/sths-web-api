import * as dotenv from 'dotenv';
process.env.NODE_ENV = 'test';
dotenv.config();

import { playersRoutes } from './players';
import { GoalieParams } from '../services/players/getGoalies';
import { SkaterParams } from '../services/players/getSkaters';
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
        .get('/players/skaters')
        .expect(200);
    });

    it('should succeed with query params', () => {
      const params: SkaterParams = {
        hasPlayedMinimumGames: true,
        hasPoints: true,
        hasTeam: true
      };

      return request(app)
        .get('/players/skaters')
        .query(params)
        .expect(200);
    });
  });

  describe('goalies route', () => {
    it('should succeed', () => {
      return request(app)
        .get('/players/goalies')
        .expect(200);
    });

    it('should succeed with query params', () => {
      const params: GoalieParams = {
        hasPlayedMinimumGames: true,
        hasSavePercentage: true,
        hasTeam: true
      };

      return request(app)
        .get('/players/goalies')
        .query(params)
        .expect(200);
    });
  });
});