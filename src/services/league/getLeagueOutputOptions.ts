import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';

const selectQuery = `
  SELECT ProMinimumGamePlayerLeader, ShowFarmScoreinPHPHomePage,
    NumberofNewsinPHPHomePage, NumberofLatestScoreinPHPHomePage
`;

const fromQuery = `FROM LeagueOutputOption`;

export interface LeagueOutputParams {
  ProMinimumGamePlayerLeader: number;
  ShowFarmScoreinPHPHomePage: boolean;
  NumberofNewsinPHPHomePage: number;
  NumberofLatestScoreinPHPHomePage: number;
}

export function getLeagueOutputOptions(): Promise<LeagueOutputParams> {
  const query = new Query(selectQuery, fromQuery);

  return QueryRunner.runQuerySingle(query);
}
