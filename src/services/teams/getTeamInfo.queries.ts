export class TeamInfoQueries {
  // SELECT
  static selectListFieldsQuery = `SELECT {0}.UniqueID, {0}.Abbre, {0}.Name`;
  static selectAllFieldsQuery = `SELECT {0}.*, {1}.Abbre as AssociatedTeamAbbre, CoachInfo.Name as CoachName`;

  // FROM
  static fromQuery = `
    FROM TeamFarmInfo
      INNER JOIN TeamProInfo ON TeamFarmInfo.UniqueID = TeamProInfo.UniqueID
      LEFT JOIN CoachInfo on CoachInfo.Number = {0}.CoachID
  `;

  // WHERE
  static hasId = (id: string) => `{0}.UniqueID = '${parseInt(id)}'`;
}
