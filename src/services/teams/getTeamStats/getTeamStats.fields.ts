import { TeamStatsQueries } from './getTeamStats.queries';

export class TeamStatsFields {
  static customColumns = {
    'TotalWins': `${TeamStatsQueries.totalWinsFormula} as TotalWins`,
    'TotalLosses': `${TeamStatsQueries.totalLossesFormula} as TotalLosses`,
    'TotalOther': `${TeamStatsQueries.totalOtherFormula} as TotalOther`,
    'TotalL10Wins': `${TeamStatsQueries.totalL10WinsFormula} as TotalL10Wins`,
    'TotalL10Losses': `${TeamStatsQueries.totalL10LossesFormula} as TotalL10Losses`,
    'TotalL10Other': `${TeamStatsQueries.totalL10OtherFormula} as TotalL10Other`,
    'PPPCT': `${TeamStatsQueries.ppPctFormujla} as PPPCT`,
    'PKPCT': `${TeamStatsQueries.pkPctFormujla} as PKPCT`
  };

  static allowedFields = ['Name', 'TotalWins', 'TotalLosses', 'TotalOther', 'TotalL10Wins',
    'TotalL10Losses', 'TotalL10Other', 'GP', 'Points', 'GF', 'GA', 'Streak', 'PPGoal',
    'PPAttemp', 'PKAttemp', 'PKGoalGA', 'PKGoalGF', 'Pim', 'Hits', 'PPPCT', 'PKPCT',
    'ShotsFor', 'ShotsAga', 'ShotsBlock'];

  static getFullColumnDescriptor(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(TeamStatsFields.customColumns).indexOf(field) >= 0) {
      return TeamStatsFields.customColumns[field];
    } else if (TeamStatsFields.allowedFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else {
      return null;
    }
  }

  static getFullColumnName(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(TeamStatsFields.customColumns).indexOf(field) >= 0) {
      return field;
    } else if (TeamStatsFields.allowedFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else {
      return null;
    }
  }
}
