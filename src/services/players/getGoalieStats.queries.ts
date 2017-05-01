export class GetGoalieStatsQueries {
  private static gaaFormula = `ROUND((CAST({0}.GA AS REAL) / ({0}.SecondPlay / 60)) * 60, 3)`;
  private static pctFormula = `ROUND((CAST({0}.SA - {0}.GA AS REAL) / ({0}.SA)), 3)`;
  private static psPctFormula = `
    ROUND((CAST({0}.PenalityShotsShots - {0}.PenalityShotsGoals AS REAL) /
    ({0}.PenalityShotsShots)), 3)
  `;

  // SELECT
  static baseQuery = `
    SELECT GoalerInfo.TeamName, {0}.*,
      ${GetGoalieStatsQueries.gaaFormula} AS GAA,
      ${GetGoalieStatsQueries.pctFormula} AS PCT,
      ${GetGoalieStatsQueries.psPctFormula} AS PenaltyShotsPCT
  `;

  // FROM
  static fromQuery = `
    FROM GoalerInfo
      INNER JOIN {0} ON GoalerInfo.Number = {0}.Number
  `;

  // WHERE
  static fromTeam = (teamId: number) => `GoalerInfo.Team = ${teamId}`;
  static hasTeam = `(GoalerInfo.Team > 0)`;
  static hasSavePercentage = `(PCT > 0)`;
  static hasPlayedMinimumGames = `
    ({0}.SecondPlay >= (
      (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)*3600)
    )
  `;
}
