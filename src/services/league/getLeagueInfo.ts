import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { LeagueInfo } from '../../models/league/leagueInfo';

const selectQuery = `
  SELECT ScheduleNextDay, DefaultSimulationPerDay, PlayOffStarted, PlayOffRound
`;

const fromQuery = `FROM LeagueGeneral`;

export function getLeagueInfo() {
  const query = new Query(selectQuery, fromQuery);

  return QueryRunner.runQuerySingle(query);
}
