import { TeamStatsQueries } from './getTeamStats.queries';

export class TeamStatsFields {
  static customColumns = {
    'TotalWins': `${TeamStatsQueries.totalWinsFormula} as TotalWins`,
    'TotalHomeWins': `${TeamStatsQueries.totalHomeWinsFormula} as TotalHomeWins`,
    'TotalLosses': `${TeamStatsQueries.totalLossesFormula} as TotalLosses`,
    'TotalHomeLosses': `${TeamStatsQueries.totalHomeLossesFormula} as TotalHomeLosses`,
    'TotalOther': `${TeamStatsQueries.totalOtherFormula} as TotalOther`,
    'TotalHomeOther': `${TeamStatsQueries.totalHomeOtherFormula} as TotalHomeOther`,
    'TotalL10Wins': `${TeamStatsQueries.totalL10WinsFormula} as TotalL10Wins`,
    'TotalL10Losses': `${TeamStatsQueries.totalL10LossesFormula} as TotalL10Losses`,
    'TotalL10Other': `${TeamStatsQueries.totalL10OtherFormula} as TotalL10Other`,
    'GAPG': `${TeamStatsQueries.GAPGFormula} as GAPG`,
    'GFPG': `${TeamStatsQueries.GFPGFormula} as GFPG`,
    'ROW': `${TeamStatsQueries.ROWFormula} as ROW`,
    'PPPCT': `${TeamStatsQueries.ppPctFormujla} as PPPCT`,
    'PKPCT': `${TeamStatsQueries.pkPctFormujla} as PKPCT`,
    'LeagueRank': 'LeagueRankingOrder.TeamOrder as LeagueRank',
    'ConferenceRank': 'ConferenceRankingOrder.TeamOrder as ConferenceRank'
  };

  static allowedTeamStatFields = ['Name', 'TotalWins', 'TotalLosses', 'TotalOther', 'TotalL10Wins',
    'TotalL10Losses', 'TotalL10Other', 'GP', 'Points', 'GF', 'GA', 'Streak', 'PPGoal',
    'PPAttemp', 'PKAttemp', 'PKGoalGA', 'PKGoalGF', 'Pim', 'Hits', 'PPPCT', 'PKPCT',
    'ShotsFor', 'ShotsAga', 'ShotsBlock', 'StandingPlayoffTitle', 'ROW', 'TotalHomeWins',
    'TotalHomeLosses', 'TotalHomeOther', 'Number', 'LeagueRank', 'ConferenceRank', 'GAPG', 'GFPG'];

  static allowedTeamInfoFields = ['Division', 'Conference', 'PlayOffEliminated',
    'DidNotMakePlayoff'];

  static allowedFields = TeamStatsFields.allowedTeamStatFields
    .concat(TeamStatsFields.allowedTeamInfoFields);

  static getFullColumnDescriptor(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(TeamStatsFields.customColumns).indexOf(field) >= 0) {
      return TeamStatsFields.customColumns[field];
    } else if (TeamStatsFields.allowedTeamStatFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else if (TeamStatsFields.allowedTeamInfoFields.indexOf(field) >= 0) {
      return `{1}.${field}`;
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
    } else if (TeamStatsFields.allowedTeamStatFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else if (TeamStatsFields.allowedTeamInfoFields.indexOf(field) >= 0) {
      return `{1}.${field}`;
    } else {
      return null;
    }
  }
}
