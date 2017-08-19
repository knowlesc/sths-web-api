import * as express from 'express';
import { Logger } from '../common/logger';
import { getCoaches, getCoachesCount } from '../services/coaches/getCoaches/getCoaches';
import { CoachParams } from '../models/coaches/coachParams';

const log = new Logger('coachesRoutes');

export function coachesRoutes() {
  const app = express();

  app.get('/coaches', (req: express.Request, res: express.Response) => {

    const params: CoachParams = {
      sort: req.query.sort,
      limit: req.query.limit,
      skip: req.query.skip
    };

    try {
      Promise.all([getCoaches(params), getCoachesCount(params)])
        .then(([skaters, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(skaters);
          }, (err) => {
            log.error(err);
            res.status(500).send('Error retrieving coaches.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving coaches.');
    }
  });

  return app;
}
