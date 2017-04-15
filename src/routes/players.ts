import * as express from 'express';
import { SkaterParams, getSkaters } from '../services/players/getSkaters';
import { GoalieParams, getGoalies } from '../services/players/getGoalies';
import { Logger } from '../common/logger';

const log = new Logger('playersRoutes');

export function playersRoutes() {
  const app = express();

  app.get('/players/skaters', (req: express.Request, res: express.Response) => {

    const params: SkaterParams = {
      hasPlayedMinimumGames: req.query.hasPlayedMinimumGames,
      hasPoints: req.query.hasPoints,
      hasTeam: req.query.hasTeam
    };

    try {
      getSkaters(params)
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

  app.get('/players/goalies', (req: express.Request, res: express.Response) => {

    const params: GoalieParams = {
      hasPlayedMinimumGames: req.query.hasPlayedMinimumGames,
      hasSavePercentage: req.query.hasSavePercentage,
      hasTeam: req.query.hasTeam
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