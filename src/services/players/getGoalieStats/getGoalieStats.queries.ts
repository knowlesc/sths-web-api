export class GetGoalieStatsQueries {
  // SELECT
  static gaaFormula = `ROUND((CAST({0}.GA AS REAL) / ({0}.SecondPlay / 60)) * 60, 3)`;
  static pctFormula = `ROUND((CAST({0}.SA - {0}.GA AS REAL) / ({0}.SA)), 3)`;
  static psPctFormula = `
    ROUND((CAST({0}.PenalityShotsShots - {0}.PenalityShotsGoals AS REAL) /
    ({0}.PenalityShotsShots)), 3)
  `;

  static teamAbbreFormula = `CASE
    WHEN GoalerInfo.Status1 <= 1 THEN TeamFarmInfo.Abbre
    WHEN GoalerInfo.Status1 >= 2 THEN TeamProInfo.Abbre
  END`;

  // FROM
  static fromQuery = `
    FROM GoalerInfo
      INNER JOIN {0} ON GoalerInfo.Number = {0}.Number
      LEFT JOIN TeamFarmInfo ON GoalerInfo.Team = TeamFarmInfo.UniqueID
      LEFT JOIN TeamProInfo ON GoalerInfo.Team = TeamProInfo.UniqueID
  `;

  // WHERE
  static fromTeam = (teamId: number) => `GoalerInfo.Team = ${teamId}`;
  static fromLeague = (league: string) => {
    const currentlyOnTeam = league === 'farm' ?
    `GoalerInfo.Status1 <= 1` : // 0 = Farm (scratched), 1 = Farm
    `GoalerInfo.Status1 >= 2`; // 2 = Pro (scratched), 3 = Pro
    const hasPlayedForTeam = `{0}.GP > 0`;

    return `${currentlyOnTeam} OR ${hasPlayedForTeam}`;
  }

  static hasTeam = `(GoalerInfo.Team > 0)`;
  static hasSavePercentage = `(PCT > 0)`;
  static hasPlayedMinimumGames = `
    {0}.GP >= (SELECT ProMinimumGamePlayerLeader FROM LeagueOutputOption LIMIT 1)
  `;
}
