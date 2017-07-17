import { GetSkaterInfoQueries } from './getSkaterInfo.queries';

export class GetSkaterInfoFields {
  static customColumns = {
    'TeamAbbre': `${GetSkaterInfoQueries.teamAbbreFormula} as TeamAbbre`,
    'TeamName': `${GetSkaterInfoQueries.teamNameFormula} as TeamName`,
    'FreeAgentStatus': `${GetSkaterInfoQueries.freeAgentStatusFormula} as FreeAgentStatus`,
    'Position': `${GetSkaterInfoQueries.positionFormula} as Position`
  };

  static allowedFields = ['Name', 'Position', 'TeamAbbre', 'Condition', 'CK', 'Status1',
    'FG', 'DI', 'SK', 'ST', 'EN', 'DU', 'PH', 'FO', 'PA', 'SC', 'DF', 'PS', 'EX',
    'LD', 'PO', 'MO', 'Overall', 'AvailableForTrade', 'StarPower', 'Age', 'Injury',
    'Rookie', 'Weight', 'Height', 'NoTrade', 'ForceWaiver', 'Contract', 'TeamName',
    'FreeAgentStatus', 'AgeDate', 'UniqueID', 'Salary1', 'Salary2', 'Salary3', 'Contract'];

  static getFullColumnDescriptor(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetSkaterInfoFields.customColumns).indexOf(field) >= 0) {
      return GetSkaterInfoFields.customColumns[field];
    } else if (GetSkaterInfoFields.allowedFields.indexOf(field) >= 0) {
      return `PlayerInfo.${field}`;
    } else {
      return null;
    }
  }

  static getFullColumnName(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetSkaterInfoFields.customColumns).indexOf(field) >= 0) {
      return field;
    } else if (GetSkaterInfoFields.allowedFields.indexOf(field) >= 0) {
      return `PlayerInfo.${field}`;
    } else {
      return null;
    }
  }
}
