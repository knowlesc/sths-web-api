import { GetGoalieInfoQueries } from './getGoalieInfo.queries';

export class GetGoalieInfoFields {
  static customColumns = {
    'TeamAbbre': `${GetGoalieInfoQueries.teamAbbreFormula} as TeamAbbre`,
    'FreeAgentStatus': `${GetGoalieInfoQueries.freeAgentStatusFormula} as FreeAgentStatus`
  };

  static allowedFields = ['Name', 'TeamAbbre', 'AgeDate', 'Condition', 'SK', 'DU',
  'EN', 'SZ', 'AG', 'RB', 'SC', 'HS', 'RT', 'PH', 'PS', 'EX', 'LD', 'PO', 'MO', 'Overall',
  'AvailableforTrade', 'StarPower', 'Age', 'Rookie', 'Weight', 'Height', 'NoTrade',
  'ForceWaiver', 'Contract', 'FreeAgentStatus', 'Salary1', 'Salary2', 'Salary3'];

  static getFullColumnDescriptor(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetGoalieInfoFields.customColumns).indexOf(field) >= 0) {
      return GetGoalieInfoFields.customColumns[field];
    } else if (GetGoalieInfoFields.allowedFields.indexOf(field) >= 0) {
      return `GoalerInfo.${field}`;
    } else {
      return null;
    }
  }

  static getFullColumnName(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetGoalieInfoFields.customColumns).indexOf(field) >= 0) {
      return field;
    } else if (GetGoalieInfoFields.allowedFields.indexOf(field) >= 0) {
      return `GoalerInfo.${field}`;
    } else {
      return null;
    }
  }
}
