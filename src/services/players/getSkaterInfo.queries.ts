export class GetSkaterInfoQueries {
  // SELECT
  static positionFormula = `CASE
    WHEN PlayerInfo.PosC = 'True' THEN 'C'
    WHEN PlayerInfo.PosLW = 'True' THEN 'LW'
    WHEN PlayerInfo.PosRW = 'True' THEN 'RW'
    WHEN PlayerInfo.PosD = 'True' THEN 'D'
  END`;

  static teamAbbreFormula = `CASE
    WHEN PlayerInfo.Status1 <= 1 THEN TeamFarmInfo.Abbre
    WHEN PlayerInfo.Status1 >= 2 THEN TeamProInfo.Abbre
  END`;

  static freeAgentStatusFormula = `CASE
    WHEN PlayerInfo.Age >= (SELECT UFAAge FROM LeagueGeneral) THEN 'UFA'
    WHEN PlayerInfo.Age >= (SELECT RFAAge FROM LeagueGeneral) THEN 'RFA'
    ELSE 'ELC'
  END`;

  // FROM
  static fromQuery = `
    FROM PlayerInfo
    LEFT JOIN TeamFarmInfo ON PlayerInfo.Team = TeamFarmInfo.UniqueID
    LEFT JOIN TeamProInfo ON PlayerInfo.Team = TeamProInfo.UniqueID
  `;

  // WHERE
  static fromTeam = (teamId: number) => `PlayerInfo.Team = ${teamId}`;
  static fromLeague = (league: string) => league === 'farm' ?
    `PlayerInfo.Status1 <= 1` : // 0 = Farm (scratched), 1 = Farm
    `PlayerInfo.Status1 >= 2` // 2 = Pro (scratched), 3 = Pro
  static hasTeam = `PlayerInfo.Team > 0`;
}
