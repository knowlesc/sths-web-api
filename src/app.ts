import * as dotenv from 'dotenv';
dotenv.config();

import * as express from 'express';
import { leagueRoutes } from './routes/league';
import { playersRoutes } from './routes/players';
import { Logger } from './common/logger';

const log = new Logger('App');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running.');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.use(leagueRoutes());
app.use(playersRoutes());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log.info(`Listening on port ${port}.`);
});
