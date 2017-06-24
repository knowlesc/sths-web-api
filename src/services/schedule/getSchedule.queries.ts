export class ScheduleQueries {
  // SELECT
  static totalHomeWinsFormula = `
    ({0}Home.W + {0}Home.OTW + {0}Home.SOW)
  `;

  static totalVisitorWinsFormula = `
    ({0}Visitor.W + {0}Visitor.OTW + {0}Visitor.SOW)
  `;

  static totalHomeLossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}Home.L)
      ELSE ({0}Home.L + {0}Home.OTL + {0}Home.SOL)
    END
  `;

  static totalVisitorLossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}Visitor.L)
      ELSE ({0}Visitor.L + {0}Visitor.OTL + {0}Visitor.SOL)
    END
  `;

  static totalHomeOther = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}Home.OTL + {0}Home.SOL)
      ELSE ({0}Home.T)
    END
  `;

  static totalVisitorOther = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}Visitor.OTL + {0}Visitor.SOL)
      ELSE ({0}Visitor.T)
    END
  `;

  static upcomingGamesQuery = `
    SELECT {2}Home.Abbre as HAbbre,
      {2}Visitor.Abbre as VAbbre,
      {1}.*,
      ${ScheduleQueries.totalHomeWinsFormula} as HTotalWins,
      ${ScheduleQueries.totalVisitorWinsFormula} as VTotalWins,
      ${ScheduleQueries.totalHomeLossesFormula} as HTotalLosses,
      ${ScheduleQueries.totalVisitorLossesFormula} as VTotalLosses,
      ${ScheduleQueries.totalHomeOther} as HTotalOther,
      ${ScheduleQueries.totalVisitorOther} as VTotalOther,
      {0}Visitor.GP AS VGP,
      {0}Visitor.W AS VW,
      {0}Visitor.L AS VL,
      {0}Visitor.T AS VT,
      {0}Visitor.OTW AS VOTW,
      {0}Visitor.OTL AS VOTL,
      {0}Visitor.SOW AS VSOW,
      {0}Visitor.SOL AS VSOL,
      {0}Visitor.Streak AS VStreak,
      {0}Home.GP AS HGP,
      {0}Home.W AS HW,
      {0}Home.L AS HL,
      {0}Home.T AS HT,
      {0}Home.OTW AS HOTW,
      {0}Home.OTL AS HOTL,
      {0}Home.SOW AS HSOW,
      {0}Home.SOL AS HSOL,
      {0}Home.Streak AS HStreak
  `;

  static totalResultsQuery = `SELECT count(*) as count`;

  // FROM
  static fromQuery = `
    FROM {1}
      LEFT JOIN {0} AS {0}Home ON {1}.HomeTeam = {0}Home.Number
      LEFT JOIN {0} AS {0}Visitor ON {1}.VisitorTeam = {0}Visitor.Number
      LEFT JOIN {2} AS {2}Home ON {0}Home.Number = {2}Home.UniqueID
      LEFT JOIN {2} AS {2}Visitor ON {0}Visitor.Number = {2}Visitor.UniqueID
  `;

  // WHERE
  static nextSimOnly = `
    DAY >= (SELECT ScheduleNextDay FROM LeagueGeneral) AND
    DAY <= (
      (SELECT ScheduleNextDay FROM LeagueGeneral) +
      (SELECT DefaultSimulationPerDay FROM LeagueGeneral) - 1)
  `;

  static fromTeam = (teamId: number) => `
    {1}.HomeTeam = ${teamId} OR {1}.VisitorTeam = ${teamId}`
}
