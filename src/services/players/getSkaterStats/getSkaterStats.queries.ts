export class GetSkaterStatsQueries {
  // SELECT
  static shotPctFormula = `ROUND((CAST({0}.G AS REAL) / ({0}.Shots)) * 100, 2)`;
  static toiPerGameFormula = `ROUND((CAST({0}.SecondPlay AS REAL) / ({0}.GP)), 2)`;
  static faceoffPctFormula = `ROUND((CAST({0}.FaceOffWon AS REAL) / ({0}.FaceOffTotal)) * 100, 2)`;
  static pointsPer60Formula = `ROUND((CAST({0}.P AS REAL) / ({0}.SecondPlay) * 60 * 60),2)`;
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

  // FROM
  static fromQuery = `
    FROM PlayerInfo
      INNER JOIN {0} ON PlayerInfo.Number = {0}.Number
      INNER JOIN {1} ON PlayerInfo.Team = {1}.Number
  `;

  // WHERE
  static fromTeam = (teamId: number) => `PlayerInfo.Team = ${teamId}`;
  static fromLeague = (league: string) => {
    const currentlyOnTeam = league === 'farm' ?
    `PlayerInfo.Status1 <= 1` : // 0 = Farm (scratched), 1 = Farm
    `PlayerInfo.Status1 >= 2`; // 2 = Pro (scratched), 3 = Pro
    const hasPlayedForTeam = `{0}.GP > 0`;

    return `${currentlyOnTeam} OR ${hasPlayedForTeam}`;
  }

  static hasPoints = `{0}.P > 0`;
  static hasTeam = `PlayerInfo.Team > 0`;
  static hasPlayedMinimumGames = `{0}.GP >= (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)`;
  static hasPosition = (position: string) => {
    if (['LW', 'C', 'RW', 'D'].indexOf(position) >= 0) {
      return `PlayerInfo.Pos${position} = 'True'`;
    } else {
      return null;
    }
  }
}
