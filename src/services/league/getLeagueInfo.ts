import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { LeagueInfo } from '../../models/league/leagueInfo';

const selectQuery = `
  SELECT ScheduleNextDay, DefaultSimulationPerDay
`;

const fromQuery = `FROM LeagueGeneral`;

export function getLeagueInfo(): Promise<LeagueInfo> {
  const query = new Query(selectQuery, fromQuery);

  return QueryRunner.runQuerySingle(query);
}
