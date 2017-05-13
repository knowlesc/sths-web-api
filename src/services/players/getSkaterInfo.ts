import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { SkaterInfoParams } from '../../models/players/skaterInfoParams';
import { GetSkaterInfoQueries as Queries } from './getSkaterInfo.queries';
import { SortHelper } from '../sortHelper';

const allowedSortFields = ['Name', 'Position', 'TeamAbbre', 'Condition', 'CK',
  'FG', 'DI', 'SK', 'ST', 'EN', 'DU', 'PH', 'FO', 'PA', 'SC', 'DF', 'PS', 'EX',
  'LD', 'PO', 'MO', 'Overall', 'AvailableForTrade', 'StarPower', 'Age',
  'Rookie', 'Weight', 'Height', 'NoTrade', 'ForceWaiver', 'Contract',
  'FreeAgentStatus', 'Salary1', 'Salary2', 'Salary3'];

const getWhereConditions = (params: SkaterInfoParams) => {
  const conditions = [];
  const league = params.league === 'farm' ? 'farm' : 'pro';

  if (!isNaN(params.team)) { conditions.push(Queries.fromTeam(params.team)); }
  if (params.league) { conditions.push(Queries.fromLeague(league)); }
  if (params.hasTeam === 'true') { conditions.push(Queries.hasTeam); }

  return conditions;
};

export function getSkaterInfo(params: SkaterInfoParams) {
  const conditions = getWhereConditions(params);
  const sort = SortHelper.validateAndConvertSort(params.sort, allowedSortFields);

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending);

  return QueryRunner.runQuery(query);
}

export function getSkaterInfoCount(params: SkaterInfoParams) {
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query);
}
