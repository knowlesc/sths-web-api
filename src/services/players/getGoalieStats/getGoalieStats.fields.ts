import { GetGoalieStatsQueries } from './getGoalieStats.queries';

export class GetGoalieStatsFields {
  static customColumns = {
    'TeamAbbre': `${GetGoalieStatsQueries.teamAbbreFormula} AS TeamAbbre`,
    'GAA': `${GetGoalieStatsQueries.gaaFormula} AS GAA`,
    'PCT': `${GetGoalieStatsQueries.pctFormula} AS PCT`,
    'PenaltyShotsPCT': `${GetGoalieStatsQueries.psPctFormula} AS PenaltyShotsPCT`
  };

  static allowedFields = ['Name', 'TeamAbbre', 'GP', 'W', 'L', 'OTL', 'PCT', 'GAA',
  'SecondPlay', 'Pim', 'Shootout', 'GA', 'SA', 'A', 'EmptyNetGoal', 'PenaltyShotsPCT',
  'PenalityShotsShots', 'UniqueID'];

  static getFullColumnDescriptor(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetGoalieStatsFields.customColumns).indexOf(field) >= 0) {
      return GetGoalieStatsFields.customColumns[field];
    } else if (GetGoalieStatsFields.allowedFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else {
      return null;
    }
  }

  static getFullColumnName(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetGoalieStatsFields.customColumns).indexOf(field) >= 0) {
      return field;
    } else if (GetGoalieStatsFields.allowedFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else {
      return null;
    }
  }
}
