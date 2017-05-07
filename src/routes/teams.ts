import * as express from 'express';
import { Logger } from '../common/logger';
import { getTeamInfo, getTeamList } from '../services/teams/getTeamInfo';
import { TeamInfoParams } from '../models/teams/teamInfoParams';

const log = new Logger('teamsRoutes');

export function teamsRoutes() {
  const app = express();

  app.get('/teams', (req: express.Request, res: express.Response) => {

    const params: TeamInfoParams = {
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

  app.get('/teams/pro/:id', (req: express.Request, res: express.Response) => {
    const params: TeamInfoParams = {
      league: 'pro',
      id: req.params.id
    };

    try {
      getTeamInfo(params)
        .then((results) => {
            if (results) {
              res.send(results);
            } else {
              res.status(404).send();
            }
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving team info.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving team info.');
    }
  });

  app.get('/teams/farm/:id', (req: express.Request, res: express.Response) => {
    const params: TeamInfoParams = {
      league: 'farm',
      id: req.params.id
    };

    try {
      getTeamInfo(params)
        .then((results) => {
            if (results) {
              res.send(results);
            } else {
              res.status(404).send();
            }
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving team info.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving team info.');
    }
  });

  return app;
}
