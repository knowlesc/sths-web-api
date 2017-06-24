import * as express from 'express';
import { Logger } from '../common/logger';
import { ScheduleParams } from '../models/schedule/scheduleParams';
import { getSchedule, getScheduleCount } from '../services/schedule/getSchedule';

const log = new Logger('scheduleRoutes');

export function scheduleRoutes() {
  const app = express();

  app.get('/schedule', (req: express.Request, res: express.Response) => {
    const params: ScheduleParams = {
      limit: req.query.limit,
      skip: req.query.skip,
      sort: req.query.sort,
      startDay: req.query.startDay,
      endDay: req.query.endDay,
      nextSimOnly: req.query.nextSimOnly,
      league: req.query.league,
      team: req.query.team
    };

    try {
      Promise.all([getSchedule(params), getScheduleCount(params)])
        .then(([results, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving schedule.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving schedule.');
    }
  });

  return app;
}
