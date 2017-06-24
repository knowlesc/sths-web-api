import * as express from 'express';
import { getSkaterStats, getSkaterStatsCount } from '../services/players/getSkaterStats/getSkaterStats';
import { getSingleSkaterInfo, getSkaterInfo, getSkaterInfoCount }
  from '../services/players/getSkaterInfo/getSkaterInfo';
import { getGoalieStats, getGoalieStatsCount } from '../services/players/getGoalieStats/getGoalieStats';
import { getGoalieInfo, getGoalieInfoCount } from '../services/players/getGoalieInfo/getGoalieInfo';
import { SkaterStatsParams } from '../models/players/skaterStatsParams';
import { SkaterInfoParams } from '../models/players/skaterInfoParams';
import { GoalieStatsParams } from '../models/players/goalieStatsParams';
import { GoalieInfoParams } from '../models/players/goalieInfoParams';
import { Logger } from '../common/logger';

const log = new Logger('playersRoutes');

export function playersRoutes() {
  const app = express();

  app.get('/players/skaters/:id', (req: express.Request, res: express.Response) => {
    const params: SkaterInfoParams = {
      fields: req.query.fields,
      id: req.params.id
    };

    try {
      getSingleSkaterInfo(params)
        .then((results) => {
            if (results) {
              res.send(results);
            } else {
              res.status(404).send();
            }
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving skater info.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving skater info.');
    }
  });

  app.get('/players/skaters', (req: express.Request, res: express.Response) => {

    const params: SkaterInfoParams = {
      hasPlayedMinimumGames: req.query.hasPlayedMinimumGames,
      hasTeam: req.query.hasTeam,
      league: req.query.league,
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort,
      team: req.query.team,
      fields: req.query.fields
    };

    try {
      Promise.all([getSkaterInfo(params), getSkaterInfoCount(params)])
        .then(([skaters, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(skaters);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving players.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving players.');
    }
  });

  app.get('/players/goalies', (req: express.Request, res: express.Response) => {

    const params: GoalieInfoParams = {
      hasPlayedMinimumGames: req.query.hasPlayedMinimumGames,
      hasTeam: req.query.hasTeam,
      league: req.query.league,
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort,
      team: req.query.team,
      fields: req.query.fields
    };

    try {
      Promise.all([getGoalieInfo(params), getGoalieInfoCount(params)])
        .then(([goalies, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(goalies);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving players.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving players.');
    }
  });

  app.get('/stats/skaters', (req: express.Request, res: express.Response) => {

    const params: SkaterStatsParams = {
      hasPlayedMinimumGames: req.query.hasPlayedMinimumGames,
      hasPoints: req.query.hasPoints,
      hasTeam: req.query.hasTeam,
      league: req.query.league,
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort,
      team: req.query.team
    };

    try {
      Promise.all([getSkaterStats(params), getSkaterStatsCount(params)])
        .then(([skaters, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(skaters);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving players.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving players.');
    }
  });

  app.get('/stats/goalies', (req: express.Request, res: express.Response) => {

    const params: GoalieStatsParams = {
      hasPlayedMinimumGames: req.query.hasPlayedMinimumGames,
      hasSavePercentage: req.query.hasSavePercentage,
      hasTeam: req.query.hasTeam,
      league: req.query.league,
      limit: req.query.limit,
      skip: req.query.skip,
      team: req.query.team,
      sort: req.query.sort
    };

    try {
      Promise.all([getGoalieStats(params), getGoalieStatsCount(params)])
        .then(([goalies, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(goalies);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving players.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving players.');
    }
  });

  return app;
}
