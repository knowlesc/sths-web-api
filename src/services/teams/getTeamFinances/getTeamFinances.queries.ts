export class TeamFinancesQueries {
  // SELECT
  static selectProFinanceQuery = `SELECT TeamProFinance.*, TeamProStat.HomeGP,
    TeamFarmFinance.EstimatedSeasonExpense as FarmEstimatedSeasonExpense
    `;
  static selectFarmFinanceQuery = `SELECT TeamFarmFinance.*, TeamFarmStat.HomeGP`;

  // FROM
  static fromQuery = `
    FROM TeamProFinance
      INNER JOIN TeamFarmFinance ON TeamProFinance.Number = TeamFarmFinance.Number
      INNER JOIN TeamProStat ON TeamProFinance.Number = TeamProStat.Number
      INNER JOIN TeamFarmStat ON TeamProFinance.Number = TeamFarmStat.Number
  `;

  // WHERE
  static hasId = (id: number) => `TeamProFinance.Number = '${id}'`;
}
