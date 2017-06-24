import { QueryRunner } from '../../db/queryRunner';
import { Query } from '../../db/query';
import { ScheduleParams } from '../../models/schedule/scheduleParams';
import { ScheduleQueries as Queries } from './getSchedule.queries';
import { SortHelper } from '../sortHelper';
import { ParamHelper } from '../paramHelper';

const allowedSortFields = [];

const getWhereConditions = (params: ScheduleParams) => {
  const conditions = [];
  const startDay = ParamHelper.parseNumberParam(params.startDay);
  const endDay = ParamHelper.parseNumberParam(params.endDay);
  const team = ParamHelper.parseNumberParam(params.team);

  if (startDay >= 0 && endDay >= 0 && endDay > startDay) { conditions.push(Queries.fromDays(startDay, endDay)); }
  if (params.nextSimOnly === 'true') { conditions.push(Queries.nextSimOnly); }
  if (team >= 0) { conditions.push(Queries.fromTeam(team)); }

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
