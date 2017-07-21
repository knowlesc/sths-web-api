export class TeamFinancesQueries {
  // SELECT
  static selectProFinanceQuery = `SELECT TeamProFinance.*, TeamProStat.HomeGP,
    TeamFarmFinance.EstimatedSeasonExpense as FarmEstimatedSeasonExpense,
    CoachInfo.Salary as CoachSalary
    `;
  static selectFarmFinanceQuery = `SELECT TeamFarmFinance.*, TeamFarmStat.HomeGP,
    CoachInfo.Salary as CoachSalary`;

  // FROM
  static fromQuery = `
    FROM TeamProFinance
      INNER JOIN TeamFarmFinance ON TeamProFinance.Number = TeamFarmFinance.Number
      INNER JOIN {0} ON TeamProFinance.Number = {0}.Number
      INNER JOIN {1} ON TeamProFinance.Number = {1}.Number
      LEFT JOIN CoachInfo ON {1}.CoachID = CoachInfo.Number
  `;

  // WHERE
  static hasId = (id: number) => `TeamProFinance.Number = '${id}'`;
}
