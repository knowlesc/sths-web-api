export class TeamLinesQueries {
  // SELECT
  static selectAllFieldsQuery = `SELECT *`;

  // FROM
  static fromQuery = `
    FROM {0}
  `;

  // WHERE
  static firstDayOnly = `{0}.Day = 1`;
  static hasId = (id: number) => `{0}.TeamNumber = '${id}'`;
}
