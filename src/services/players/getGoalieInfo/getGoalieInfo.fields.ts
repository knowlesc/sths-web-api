import { GetGoalieInfoQueries } from './getGoalieInfo.queries';

export class GetGoalieInfoFields {
  static customColumns = {
    'TeamAbbre': `${GetGoalieInfoQueries.teamAbbreFormula} as TeamAbbre`,
    'TeamName': `${GetGoalieInfoQueries.teamNameFormula} as TeamName`,
    'FreeAgentStatus': `${GetGoalieInfoQueries.freeAgentStatusFormula} as FreeAgentStatus`,
    'InjuryLength': `${GetGoalieInfoQueries.injuryLengthFormula} as InjuryLength`
  };

  static allowedFields = ['Name', 'TeamAbbre', 'AgeDate', 'Condition', 'SK', 'DU', 'Injury',
  'EN', 'SZ', 'AG', 'RB', 'SC', 'HS', 'RT', 'PH', 'PS', 'EX', 'LD', 'PO', 'MO', 'Overall',
  'AvailableforTrade', 'StarPower', 'Age', 'Rookie', 'Weight', 'Height', 'NoTrade', 'TeamName',
  'ForceWaiver', 'Contract', 'FreeAgentStatus', 'Salary1', 'Salary2', 'Salary3', 'UniqueID',
  'Status1', 'Contract', 'InjuryLength'];

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
