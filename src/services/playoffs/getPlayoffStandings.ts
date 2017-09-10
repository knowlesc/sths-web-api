import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { PlayoffStandingsParams } from '../../models/playoffs/playoffStandingsParams';
import { PlayoffStandingsQueries as Queries } from './getPlayoffStandings.queries';

export function getPlayoffStandings(params: PlayoffStandingsParams) {
  const tablesToUse = params.league === 'farm'
    ? ['PlayoffFarm', 'TeamFarmInfo']
    : ['PlayoffPro', 'TeamProInfo'];

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery);

  return QueryRunner.runQuery(query, ...tablesToUse);
}
