export class TeamStatsQueries {
  // SELECT
  static totalWinsFormula = `({0}.W + {0}.OTW + {0}.SOW)`;

  static totalL10WinsFormula = `({0}.Last10W + {0}.Last10OTW + {0}.Last10SOW)`;

  static totalLossesFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.L)
      ELSE ({0}.L + {0}.OTL + {0}.SOL)
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

  static totalL10OtherFormula = `
    CASE
      WHEN (SELECT PointSystemSO FROM LeagueGeneral) = 'True'
        THEN ({0}.Last10OTL + {0}.Last10SOL)
      ELSE ({0}.Last10T)
    END`;

  static ppPctFormujla = `
    CASE
      WHEN {0}.PPAttemp = 0 THEN null
      ELSE printf("%.1f", ({0}.PPGoal * 100.0 / {0}.PPAttemp))
    END`;

  static pkPctFormujla = `
    CASE
      WHEN {0}.PKAttemp = 0 THEN null
      ELSE printf("%.1f", ({0}.PKGoalGA * 100.0 / {0}.PKAttemp))
    END`;

  // FROM
  static fromQuery = `FROM {0}`;

  // WHERE
  static fromTeam = (teamId: number) => `{0}.Number = ${teamId}`;
}
