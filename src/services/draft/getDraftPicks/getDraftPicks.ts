import { QueryRunner } from '../../../db/queryRunner';
import { Query } from '../../../db/query';
import { GetDraftPicksQueries as Queries } from './getDraftPicks.queries';
import { DraftParams } from '../../../models/draft/draftParams';
import { ParamHelper } from '../../paramHelper';
import { FieldHelper } from '../../fieldHelper';

const getWhereConditions = (params: DraftParams) => {
  const conditions = [];

  const team = ParamHelper.parseNumberParam(params.team);

  if (team >= 0) { conditions.push(Queries.fromTeam(team)); }

  return conditions;
};

export function getDraftPicks(params: DraftParams) {
  const whereConditions = getWhereConditions(params);

  const query = new Query(Queries.allFieldsQuery, Queries.fromQuery)
    .where(whereConditions);

  return QueryRunner.runQuery(query);
}
