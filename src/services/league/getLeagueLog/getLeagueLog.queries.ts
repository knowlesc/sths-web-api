export class GetLeagueLogQueries {
  // SELECT
  static allFieldsQuery = `SELECT LeagueLog.*`;

  // FROM
  static fromQuery = `FROM LeagueLog`;

  // WHERE
  static tradeFilter = `Text LIKE 'TRADE : %'`;
  static types = (types: number[]) =>
    types.map((type) => `(LeagueLog.TransactionType = ${type})`).join('\n OR ')
}
