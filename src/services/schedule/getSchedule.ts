import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { ScheduleParams } from '../../models/schedule/scheduleParams';
import { ScheduleQueries as Queries } from './getSchedule.queries';
import { SortHelper } from '../sortHelper';

const allowedSortFields = [];

const getWhereConditions = (params: ScheduleParams) => {
  const conditions = [];

  if (params.nextSimOnly === 'true') { conditions.push(Queries.nextSimOnly); }
  if (!isNaN(params.team)) { conditions.push(Queries.fromTeam(params.team)); }

  return conditions;
};

export function getSchedule(params: ScheduleParams) {
  const tablesToUse = params.league === 'farm'
    ? ['TeamFarmStat', 'ScheduleFarm', 'TeamFarmInfo']
    : ['TeamProStat', 'SchedulePro', 'TeamProInfo'];

  const conditions = getWhereConditions(params);
  const sort = SortHelper.validateAndConvertSort(params.sort, allowedSortFields);

  const query = new Query(Queries.upcomingGamesQuery, Queries.fromQuery)
    .where(conditions)
    .limit(params.limit)
    .skip(params.skip)
    .orderBy(sort.field, sort.descending);

  return QueryRunner.runQuery(query, ...tablesToUse);
}

export function getScheduleCount(params: ScheduleParams) {
  const tablesToUse = params.league === 'farm'
    ? ['TeamFarmStat', 'ScheduleFarm', 'TeamFarmInfo']
    : ['TeamProStat', 'SchedulePro', 'TeamProInfo'];

  const conditions = getWhereConditions(params);

  const query = new Query(Queries.totalResultsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuery(query, ...tablesToUse);
}
