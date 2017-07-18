import * as express from 'express';
import { getDraftPicks } from '../services/draft/getDraftPicks/getDraftPicks';
import { DraftParams } from '../models/draft/draftParams';
import { Logger } from '../common/logger';

const log = new Logger('draftRoutes');

export function draftRoutes() {
  const app = express();

  app.get('/draftPicks', (req: express.Request, res: express.Response) => {
    const params: DraftParams = {
      team: req.query.team
    };

    try {
      getDraftPicks(params)
        .then((results) => {
            res.send(results);
          },
          (err) => {
            log.error(err);
            res.status(500).send('Error retrieving draft picks.');
          });
    } catch (err) {
      log.error(err);
      res.status(500).send('Error retrieving draft picks.');
    }
  });

  return app;
}
