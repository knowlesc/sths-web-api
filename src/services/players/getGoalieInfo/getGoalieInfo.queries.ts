export class GetGoalieInfoQueries {
  // SELECT
  static teamAbbreFormula = `CASE
    WHEN GoalerInfo.Status1 <= 1 THEN TeamFarmInfo.Abbre
    WHEN GoalerInfo.Status1 >= 2 THEN TeamProInfo.Abbre
  END`;

  static teamNameFormula = `CASE
    WHEN GoalerInfo.Status1 <= 1 THEN TeamFarmInfo.Name
    WHEN GoalerInfo.Status1 >= 2 THEN TeamProInfo.Name
  END`;

  static freeAgentStatusFormula = `CASE
    WHEN GoalerInfo.Age >= (SELECT UFAAge FROM LeagueGeneral) THEN 'UFA'
    WHEN GoalerInfo.Age >= (SELECT RFAAge FROM LeagueGeneral) THEN 'RFA'
    ELSE 'ELC'
  END`;

  // FROM
  static fromQuery = `
    FROM GoalerInfo
    LEFT JOIN TeamFarmInfo ON GoalerInfo.Team = TeamFarmInfo.UniqueID
    LEFT JOIN TeamProInfo ON GoalerInfo.Team = TeamProInfo.UniqueID
  `;

  // WHERE
  static hasId = (id: number) => `GoalerInfo.UniqueID = '${id}'`;
  static fromTeam = (teamId: number) => `GoalerInfo.Team = ${teamId}`;
  static fromLeague = (league: string) => league === 'farm' ?
    `GoalerInfo.Status1 <= 1` : // 0 = Farm (scratched), 1 = Farm
    `GoalerInfo.Status1 >= 2` // 2 = Pro (scratched), 3 = Pro
  static hasTeam = `GoalerInfo.Team > 0`;
}
