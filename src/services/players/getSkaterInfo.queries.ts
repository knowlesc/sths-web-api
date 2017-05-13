export class GetSkaterInfoQueries {
  // SELECT
  static positionFormula = `CASE
    WHEN PlayerInfo.PosC = 'False'  AND PlayerInfo.PosLW = 'False'  AND PlayerInfo.PosRW = 'False'  THEN 'D'
    WHEN PlayerInfo.PosC = 'False'  AND PlayerInfo.PosLW = 'False'  AND PlayerInfo.PosRW = 'True'   THEN 'RW'
    WHEN PlayerInfo.PosC = 'False'  AND PlayerInfo.PosLW = 'True'   AND PlayerInfo.PosRW = 'False'  THEN 'LW'
    WHEN PlayerInfo.PosC = 'False'  AND PlayerInfo.PosLW = 'True'   AND PlayerInfo.PosRW = 'True'   THEN 'LW/RW'
    WHEN PlayerInfo.PosC = 'True'   AND PlayerInfo.PosLW = 'False'  AND PlayerInfo.PosRW = 'False'  THEN 'C'
    WHEN PlayerInfo.PosC = 'True'   AND PlayerInfo.PosLW = 'False'  AND PlayerInfo.PosRW = 'True'   THEN 'C/RW'
    WHEN PlayerInfo.PosC = 'True'   AND PlayerInfo.PosLW = 'True'   AND PlayerInfo.PosRW = 'False'  THEN 'C/LW'
    WHEN PlayerInfo.PosC = 'True'   AND PlayerInfo.PosLW = 'True'   AND PlayerInfo.PosRW = 'True'   THEN 'C/LW/RW'
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
