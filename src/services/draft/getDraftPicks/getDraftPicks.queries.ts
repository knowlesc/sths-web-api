export class GetDraftPicksQueries {
  // SELECT
  static allFieldsQuery = `SELECT *`;

  // FROM
  static fromQuery = `FROM DraftPick`;

  // WHERE
  static fromTeam = (teamId: number) => `TeamNumber = ${teamId}`;
}
