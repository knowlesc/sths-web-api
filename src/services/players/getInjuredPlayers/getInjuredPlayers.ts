import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { GetInjuredPlayersQueries as Queries } from './getInjuredPlayers.queries';

export function getInjuredPlayers() {
  const playersQuery = new Query(Queries.playersFieldsQuery, Queries.fromPlayersQuery)
    .where([Queries.hasInjury]);

  const goaliesQuery = new Query(Queries.goaliesFieldsQuery, Queries.fromGoaliesQuery)
    .where([Queries.hasInjury]);

  return QueryRunner.runQuery(playersQuery.union(goaliesQuery));
}
