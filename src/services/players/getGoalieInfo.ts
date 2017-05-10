import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { GoalieInfoParams } from '../../models/players/goalieInfoParams';
import { GetGoalieInfoQueries as Queries } from './getGoalieInfo.queries';
import { SortHelper } from '../sortHelper';

const allowedSortFields = ['Name', 'TeamAbbre', 'Condition', 'SK', 'DU', 'EN', 'SZ',
  'AG', 'RB', 'SC', 'HS', 'RT', 'PH', 'PS', 'EX', 'LD', 'PO', 'MO', 'Overall',
  'AvailableforTrade', 'StarPower'];

const getWhereConditions = (params: GoalieInfoParams) => {
  const conditions = [];
  const league = params.league === 'farm' ? 'farm' : 'pro';

  if (!isNaN(params.team)) { conditions.push(Queries.fromTeam(params.team)); }
  if (params.league) { conditions.push(Queries.fromLeague(league)); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }

  return conditions;
};

export function getGoalieInfo(params: GoalieInfoParams) {
  const conditions = getWhereConditions(params);
  const sort = SortHelper.validateAndConvertSort(params.sort, allowedSortFields);

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending);

  return QueryRunner.runQuery(query);
}

export function getGoalieInfoCount(params: GoalieInfoParams) {
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query);
}
