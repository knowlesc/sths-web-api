import * as express from 'express';
import * as dotenv from 'dotenv';
import { leagueRoutes } from './routes/league';
import { playersRoutes } from './routes/players';
import { Logger } from './common/logger';

dotenv.config();

const log = new Logger('App');

const app = express();

app.use(leagueRoutes());
app.use(playersRoutes());

app.listen(3000, () => {
  log.info('Listening on port 3000.');
});