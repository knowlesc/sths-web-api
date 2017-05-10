import * as express from 'express';
import { getLeagueLog, getLeagueLogCount, LeagueLogParams } from '../services/league/getLeagueLog';
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
      Promise.all([getLeagueLog(params), getLeagueLogCount(params)])
        .then(([results, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
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
