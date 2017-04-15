import * as express from 'express';
import { getLeagueLog, LeagueLogParams } from '../services/league/getLeagueLog';
import { getLeagueOutputOptions } from '../services/league/getLeagueOutputOptions';
import { Logger } from '../common/logger';

const log = new Logger('leagueRoutes');

export function leagueRoutes() {
  const app = express();

  app.get('/league/log', (req: express.Request, res: express.Response) => {
    const params: LeagueLogParams = {
      limit: req.query.limit,
      skip: req.query.skip
    };

    try {
      getLeagueLog(params)
        .then((results) => {
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving league log.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving league log.');
    }
  });

  app.get('/league/outputOptions', (req: express.Request, res: express.Response) => {
    try {
      getLeagueOutputOptions()
        .then((results) => {
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving output options.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving output options.');
    }
  });

  return app;
}