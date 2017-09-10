import * as express from 'express';
import { getLeagueLog, getLeagueLogCount } from '../services/league/getLeagueLog/getLeagueLog';
import { LeagueLogParams } from '../models/league/leagueLogParams';
import { getLeagueInfo } from '../services/league/getLeagueInfo';
import { getPlayoffStandings } from '../services/playoffs/getPlayoffStandings';
import { PlayoffStandingsParams } from './../models/playoffs/PlayoffStandingsParams';
import { Logger } from '../common/logger';

const log = new Logger('leagueRoutes');

export function leagueRoutes() {
  const app = express();

  app.get('/league/log', (req: express.Request, res: express.Response) => {
    const params: LeagueLogParams = {
      limit: req.query.limit,
      skip: req.query.skip,
      type: req.query.type
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

  app.get('/league/info', (req: express.Request, res: express.Response) => {
    try {
      getLeagueInfo()
        .then((results) => {
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving league info.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving league info.');
    }
  });

  app.get('/league/playoffStandings', (req: express.Request, res: express.Response) => {
    const params: PlayoffStandingsParams = {
      league: req.query.league
    };

    try {
      getPlayoffStandings(params)
        .then((results) => {
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving playoff standings.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving playoff standings.');
    }
  });

  return app;
}
