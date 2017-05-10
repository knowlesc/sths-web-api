export class GetGoalieInfoQueries {
  private static teamAbbreFormula = `CASE
    WHEN GoalerInfo.Status1 <= 1 THEN TeamFarmInfo.Abbre
    WHEN GoalerInfo.Status1 >= 2 THEN TeamProInfo.Abbre
  END`;

  // SELECT
  static allFieldsQuery = `
  SELECT GoalerInfo.*,
    ${GetGoalieInfoQueries.teamAbbreFormula} as TeamAbbre
  `;

  static totalResultsQuery = `SELECT count(*) as count`;

  // FROM
  static fromQuery = `
    FROM GoalerInfo
    LEFT JOIN TeamFarmInfo ON GoalerInfo.Team = TeamFarmInfo.UniqueID
    LEFT JOIN TeamProInfo ON GoalerInfo.Team = TeamProInfo.UniqueID
  `;

  // WHERE
  static fromTeam = (teamId: number) => `GoalerInfo.Team = ${teamId}`;
  static fromLeague = (league: string) => league === 'farm' ?
    `GoalerInfo.Status1 <= 1` : // 0 = Farm (scratched), 1 = Farm
    `GoalerInfo.Status1 >= 2` // 2 = Pro (scratched), 3 = Pro
  static hasTeam = `GoalerInfo.Team > 0`;
}
