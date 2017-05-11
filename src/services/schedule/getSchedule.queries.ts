export class ScheduleQueries {

  // TODO move this to a different service
  static recentGamesQuery = `
    SELECT *
    FROM SchedulePro
    WHERE Day = (
      (SELECT ScheduleNextDay FROM LeagueGeneral) -
      (SELECT DefaultSimulationPerDay FROM LeagueGeneral))
    ORDER BY GameNumber
  `;

  // SELECT
  static totalHomeWinsFormula = `
    (TeamProStatHome.W + TeamProStatHome.OTW + TeamProStatHome.SOW)
  `;

  static totalVisitorWinsFormula = `
    (TeamProStatVisitor.W + TeamProStatVisitor.OTW + TeamProStatVisitor.SOW)
  `;

  static totalHomeLossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN (TeamProStatHome.L)
      ELSE (TeamProStatHome.L + TeamProStatHome.OTL + TeamProStatHome.SOL)
    END
  `;

  static totalVisitorLossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN (TeamProStatVisitor.L)
      ELSE (TeamProStatVisitor.L + TeamProStatVisitor.OTL + TeamProStatVisitor.SOL)
    END
  `;

  static totalHomeOther = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN (TeamProStatHome.OTL + TeamProStatHome.SOL)
      ELSE (TeamProStatHome.T)
    END
  `;

  static totalVisitorOther = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN (TeamProStatVisitor.OTL + TeamProStatVisitor.SOL)
      ELSE (TeamProStatVisitor.T)
    END
  `;

  static upcomingGamesQuery = `
    SELECT SchedulePro.*,
      ${ScheduleQueries.totalHomeWinsFormula} as HTotalWins,
      ${ScheduleQueries.totalVisitorWinsFormula} as VTotalWins,
      ${ScheduleQueries.totalHomeLossesFormula} as HTotalLosses,
      ${ScheduleQueries.totalVisitorLossesFormula} as VTotalLosses,
      ${ScheduleQueries.totalHomeOther} as HTotalOther,
      ${ScheduleQueries.totalVisitorOther} as VTotalOther,
      'Pro' AS Type,
      TeamProStatVisitor.Last10W AS VLast10W,
      TeamProStatVisitor.Last10L AS VLast10L,
      TeamProStatVisitor.Last10T AS VLast10T,
      TeamProStatVisitor.Last10OTW AS VLast10OTW,
      TeamProStatVisitor.Last10OTL AS VLast10OTL,
      TeamProStatVisitor.Last10SOW AS VLast10SOW,
      TeamProStatVisitor.Last10SOL AS VLast10SOL,
      TeamProStatVisitor.GP AS VGP,
      TeamProStatVisitor.W AS VW,
      TeamProStatVisitor.L AS VL,
      TeamProStatVisitor.T AS VT,
      TeamProStatVisitor.OTW AS VOTW,
      TeamProStatVisitor.OTL AS VOTL,
      TeamProStatVisitor.SOW AS VSOW,
      TeamProStatVisitor.SOL AS VSOL,
      TeamProStatVisitor.Points AS VPoints,
      TeamProStatVisitor.Streak AS VStreak,
      TeamProStatHome.Last10W AS HLast10W,
      TeamProStatHome.Last10L AS HLast10L,
      TeamProStatHome.Last10T AS HLast10T,
      TeamProStatHome.Last10OTW AS HLast10OTW,
      TeamProStatHome.Last10OTL AS HLast10OTL,
      TeamProStatHome.Last10SOW AS HLast10SOW,
      TeamProStatHome.Last10SOL AS HLast10SOL,
      TeamProStatHome.GP AS HGP,
      TeamProStatHome.W AS HW,
      TeamProStatHome.L AS HL,
      TeamProStatHome.T AS HT,
      TeamProStatHome.OTW AS HOTW,
      TeamProStatHome.OTL AS HOTL,
      TeamProStatHome.SOW AS HSOW,
      TeamProStatHome.SOL AS HSOL,
      TeamProStatHome.Points AS HPoints,
      TeamProStatHome.Streak AS HStreak
  `;

  static totalResultsQuery = `SELECT count(*) as count`;

  // FROM
  static fromQuery = `
    FROM SchedulePRO
      LEFT JOIN TeamProStat AS TeamProStatHome ON SchedulePRO.HomeTeam = TeamProStatHome.Number
      LEFT JOIN TeamProStat AS TeamProStatVisitor ON SchedulePRO.VisitorTeam = TeamProStatVisitor.Number
  `;

  // WHERE
  static nextSimOnly = `
    DAY >= (SELECT ScheduleNextDay FROM LeagueGeneral) AND
    DAY <= (
      (SELECT ScheduleNextDay FROM LeagueGeneral) +
      (SELECT DefaultSimulationPerDay FROM LeagueGeneral) - 1)
  `;
}
