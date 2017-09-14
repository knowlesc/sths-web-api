import { TeamLinesParams } from './../../../models/teams/teamLinesParams';
import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { TeamLinesQueries as Queries } from './getTeamLines.queries';
import { ParamHelper } from '../../paramHelper';

const getWhereConditions = (params: TeamLinesParams) => {
  const conditions = [];

  const id = ParamHelper.parseNumberParam(params.id);
  if (id >= 0) {
    conditions.push(Queries.hasId(id));
  }

  return conditions;
};

export function getTeamLines(params: TeamLinesParams) {
  const id = ParamHelper.parseNumberParam(params.id);
  if (id < 0) {
    throw new Error('Missing or invalid team ID.');
  }

  const tablesToUse = params.league === 'farm' ? ['TeamFarmLines'] : ['TeamProLines'];
  const conditions = getWhereConditions(params);

  const query = new Query(Queries.selectAllFieldsQuery, Queries.fromQuery)
    .where(conditions);

  return QueryRunner.runQuerySingle(query, ...tablesToUse);
}
