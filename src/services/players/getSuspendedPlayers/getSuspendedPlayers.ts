import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { GetSuspendedPlayersQueries as Queries } from './getSuspendedPlayers.queries';

export function getSuspendedPlayers() {
  const playersQuery = new Query(Queries.playersFieldsQuery, Queries.fromPlayersQuery)
    .where([Queries.hasSuspension]);

  const goaliesQuery = new Query(Queries.goaliesFieldsQuery, Queries.fromGoaliesQuery)
    .where([Queries.hasSuspension]);

  return QueryRunner.runQuery(playersQuery.union(goaliesQuery));
}
