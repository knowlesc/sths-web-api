import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { GoalieParams } from '../../models/players/goalieParams';
import { GetGoalieStatsQueries as Queries } from './getGoalieStats.queries';

const proStatTable = 'GoalerProStat';
const farmStatTable = 'GoalerFarmStat';

const getWhereConditions = (params: GoalieParams) => {
  const conditions = [];

  if (params.hasPlayedMinimumGames === 'true') { conditions.push(Queries.hasPlayedMinimumGames); }
  if (params.hasSavePercentage === 'true') { conditions.push(Queries.hasSavePercentage); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }
  if (params.team) { conditions.push(Queries.fromTeam(params.team)); }

  return conditions;
};

export function getGoalies(params: GoalieParams) {
  const statTableToUse = params.league === 'farm' ? farmStatTable : proStatTable;
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.baseQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip);

  return QueryRunner.runQuery(query, statTableToUse);
}
