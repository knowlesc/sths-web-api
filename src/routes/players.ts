import * as express from 'express';
import { getSkaters, getSkatersCount } from '../services/players/getSkaterStats';
import { getGoalies } from '../services/players/getGoalieStats';
import { SkaterParams } from '../models/players/skaterParams';
import { GoalieParams } from '../models/players/goalieParams';
import { Logger } from '../common/logger';

const log = new Logger('playersRoutes');

export function playersRoutes() {
  const app = express();

  app.get('/players/skaters/stats', (req: express.Request, res: express.Response) => {

    const params: SkaterParams = {
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
      Promise.all([getSkaters(params), getSkatersCount(params)])
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

  app.get('/players/goalies/stats', (req: express.Request, res: express.Response) => {

    const params: GoalieParams = {
      hasPlayedMinimumGames: req.query.hasPlayedMinimumGames,
      hasSavePercentage: req.query.hasSavePercentage,
      hasTeam: req.query.hasTeam,
      league: req.query.league,
      limit: req.query.limit,
      skip: req.query.skip,
      team: req.query.team
    };

    try {
      getGoalies(params)
        .then((results) => {
            res.send(results);
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
