export class TeamStatsQueries {
  // SELECT
  static totalWinsFormula = `({0}.W + {0}.OTW + {0}.SOW)`;
  static totalHomeWinsFormula = `({0}.HomeW + {0}.HomeOTW + {0}.HomeSOW)`;
  static totalL10WinsFormula = `({0}.Last10W + {0}.Last10OTW + {0}.Last10SOW)`;

  static totalLossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.L)
      ELSE ({0}.L + {0}.OTL + {0}.SOL)
    END`;

    static totalHomeLossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.HomeL)
      ELSE ({0}.HomeL + {0}.HomeOTL + {0}.HomeSOL)
    END`;

  static totalL10LossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.Last10L)
      ELSE ({0}.Last10L + {0}.Last10OTL + {0}.Last10SOL)
    END`;

  static totalOtherFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.OTL + {0}.SOL)
      ELSE ({0}.T)
    END`;

  static totalHomeOtherFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.HomeOTL + {0}.HomeSOL)
      ELSE ({0}.HomeT)
    END`;

  static totalL10OtherFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.Last10OTL + {0}.Last10SOL)
      ELSE ({0}.Last10T)
    END`;

  static pointsPctFormula = `({0}.Points * 1.0) / ({0}.GP * 2)`;

  static ppPctFormula = `
    CASE
      WHEN {0}.PPAttemp = 0 THEN null
      ELSE printf("%.1f", ({0}.PPGoal * 100.0 / {0}.PPAttemp))
    END`;

  static pkPctFormula = `
    CASE
      WHEN {0}.PKAttemp = 0 THEN null
      ELSE printf("%.1f", (100.0 - ({0}.PKGoalGA * 100.0 / {0}.PKAttemp)))
    END`;

  static ROWFormula = `({0}.W + {0}.OTW)`;
  static GAPGFormula = `round({0}.GA * 1.0 / {0}.GP, 1)`;
  static GFPGFormula = `round({0}.GF * 1.0 / {0}.GP, 1)`;

  // FROM
  static fromQuery = `
    FROM {0}
      INNER JOIN {1} ON {0}.Number = {1}.UniqueID
      INNER JOIN RankingOrder LeagueRankingOrder ON {0}.Number = LeagueRankingOrder.{2} AND LeagueRankingOrder.Type = 0
      INNER JOIN RankingOrder ConferenceRankingOrder ON {0}.Number = ConferenceRankingOrder.{2}
        AND (ConferenceRankingOrder.Type = 1 OR ConferenceRankingOrder.Type = 2)
  `;

  // WHERE
  static fromTeam = (teamId: number) => `{0}.Number = ${teamId}`;
}
