import { DB } from '../../db/sqliteDb';
import { Logger } from '../../common/logger';

const log = new Logger('getLeagueOutputOptions');

const baseQuery = `
  SELECT ProMinimumGamePlayerLeader, ShowFarmScoreinPHPHomePage,
    NumberofNewsinPHPHomePage, NumberofLatestScoreinPHPHomePage
  FROM LeagueOutputOption
`;

export interface LeagueOutputOptions {
  ProMinimumGamePlayerLeader: number;
  ShowFarmScoreinPHPHomePage: boolean;
  NumberofNewsinPHPHomePage: number;
  NumberofLatestScoreinPHPHomePage: number;
}

export function getLeagueOutputOptions(): Promise<LeagueOutputOptions> {
  const query = baseQuery;

  log.debug(query);

  return DB.get(query);
}