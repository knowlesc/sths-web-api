export class GetSkaterStatsQueries {
  private static shotPctFormula = `ROUND((CAST({0}.G AS REAL) / ({0}.Shots)) * 100, 2)`;
  private static toiPerGameFormula = `ROUND((CAST({0}.SecondPlay AS REAL) / ({0}.GP)), 2)`;
  private static faceoffPctFormula = `ROUND((CAST({0}.FaceOffWon AS REAL) / ({0}.FaceOffTotal)) * 100, 2)`;
  private static pointsPer60Formula = `ROUND((CAST({0}.P AS REAL) / ({0}.SecondPlay) * 60 * 60),2)`;
  private static positionFormula = `CASE
    WHEN PlayerInfo.PosC = 'True' THEN 'C'
    WHEN PlayerInfo.PosLW = 'True' THEN 'LW'
    WHEN PlayerInfo.PosRW = 'True' THEN 'RW'
    WHEN PlayerInfo.PosD = 'True' THEN 'D'
  END`;

  // SELECT
  static allFieldsQuery = `
    SELECT {0}.*, PlayerInfo.TeamName,
      ${GetSkaterStatsQueries.positionFormula} as Position,
      ${GetSkaterStatsQueries.shotPctFormula} AS ShotsPCT,
      ${GetSkaterStatsQueries.toiPerGameFormula} AS AvgTOI,
      ${GetSkaterStatsQueries.faceoffPctFormula} as FaceoffPCT,
      ${GetSkaterStatsQueries.pointsPer60Formula} AS P60
  `;

  static totalResultsQuery = `
    SELECT count(*) as count
  `;

  // FROM
  static fromQuery = `
    FROM PlayerInfo INNER JOIN {0} ON PlayerInfo.Number = {0}.Number
  `;

  // WHERE
  static fromTeam = (teamId: number) => `PlayerInfo.Team = ${teamId}`;
  static hasPoints = `{0}.P > 0`;
  static hasTeam = `PlayerInfo.Team > 0`;
  static hasPlayedMinimumGames = `{0}.GP >= (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)`;
}
