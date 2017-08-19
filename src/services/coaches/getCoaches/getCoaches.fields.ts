import { GetCoachesQueries } from './getCoaches.queries';

export class GetCoachesFields {
  static customColumns = {
    'Team': `${GetCoachesQueries.teamFormula} as Team`
  };

  static allowedFields = ['Name', 'Team', 'Country', 'PH', 'DF', 'OF', 'PD', 'EX', 'LD',
    'PO', 'Age', 'Contract', 'Salary'];

  static getFullColumnDescriptor(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetCoachesFields.customColumns).indexOf(field) >= 0) {
      return GetCoachesFields.customColumns[field];
    } else if (GetCoachesFields.allowedFields.indexOf(field) >= 0) {
      return `CoachInfo.${field}`;
    } else {
      return null;
    }
  }

  static getFullColumnName(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetCoachesFields.customColumns).indexOf(field) >= 0) {
      return field;
    } else if (GetCoachesFields.allowedFields.indexOf(field) >= 0) {
      return `CoachInfo.${field}`;
    } else {
      return null;
    }
  }
}
