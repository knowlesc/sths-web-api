import * as express from 'express';
import { Logger } from '../common/logger';
import { TeamLinesParams } from './../models/teams/teamLinesParams';
import { getTeamFinances } from '../services/teams/getTeamFinances/getTeamFinances';
import { getTeamLines } from '../services/teams/getTeamLines/getTeamLines';
import { getTeamInfo, getTeamList } from '../services/teams/getTeamInfo/getTeamInfo';
import { getTeamStats, getTeamStatsCount } from '../services/teams/getTeamStats/getTeamStats';
import { TeamInfoParams } from '../models/teams/teamInfoParams';
import { TeamStatsParams } from '../models/teams/teamStatsParams';

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

  app.get('/teams/:league/:id', (req: express.Request, res: express.Response) => {
    const params: TeamInfoParams = {
      league: req.params.league,
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

  app.get('/teams/:league/:id/finances', (req: express.Request, res: express.Response) => {
    const params: TeamInfoParams = {
      league: req.params.league,
      id: req.params.id
    };

    try {
      getTeamFinances(params)
        .then((results) => {
            res.send(results);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving team finances.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving team finances.');
    }
  });

  app.get('/teams/:league/:id/lines', (req: express.Request, res: express.Response) => {
    const params: TeamLinesParams = {
      league: req.params.league,
      id: req.params.id
    };

    try {
      getTeamLines(params)
        .then((results) => {
            res.send(results);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving team lines.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving team lines.');
    }
  });

  app.get('/stats/teams', (req: express.Request, res: express.Response) => {
    const params: TeamStatsParams = {
      league: req.query.league,
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort,
      team: req.query.team,
      fields: req.query.fields
    };

    try {
      Promise.all([getTeamStats(params), getTeamStatsCount(params)])
        .then(([teams, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(teams);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving team stats.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving team stats.');
    }
  });

  return app;
}
