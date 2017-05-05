import * as express from 'express';
import { Logger } from '../common/logger';
import { getTeamList, TeamListParams } from '../services/teams/getTeamList';

const log = new Logger('teamsRoutes');

export function teamsRoutes() {
  const app = express();

  app.get('/teams', (req: express.Request, res: express.Response) => {

    const params: TeamListParams = {
      league: req.query.league
    };

    try {
      getTeamList(params)
        .then((results) => {
            res.send(results);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving teams.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving teams.');
    }
  });

  return app;
}
