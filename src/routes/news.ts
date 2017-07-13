import * as express from 'express';
import { Logger } from '../common/logger';
import { getNews } from '../services/league/getNews/getNews';

const log = new Logger('newsRoutes');

export function newsRoutes() {
  const app = express();

  app.get('/news', (req: express.Request, res: express.Response) => {
    try {
      getNews()
        .then((results) => {
          res.send(results);
        }, (err) => {
          log.error(err);
          res.status(500).send('Error retrieving news.');
        });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving news.');
    }
  });

  return app;
}
