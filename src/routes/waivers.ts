import * as express from 'express';
import { getWaivers, getWaiversCount, getWaiversOrder } from '../services/waivers/getWaivers';
import { WaiversParams } from '../models/waivers/waiversParams';
import { Logger } from '../common/logger';

const log = new Logger('waiversRoutes');

export function waiversRoutes() {
  const app = express();

  app.get('/waivers/list', (req: express.Request, res: express.Response) => {
    const params: WaiversParams = {
      limit: req.query.limit,
      skip: req.query.skip
    };

    try {
      Promise.all([getWaivers(params), getWaiversCount(params)])
        .then(([results, count]) => {
            const totalResults = (count as { count: string }[])[0].count;
            res.setHeader('X-Total-Count', totalResults);
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving waivers list.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving waivers list.');
    }
  });

  app.get('/waivers/order', (req: express.Request, res: express.Response) => {
    try {
      getWaiversOrder()
        .then((results) => {
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving waiver order.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving waiver order.');
    }
  });

  return app;
}
