import { GetSkaterStatsQueries } from './getSkaterStats.queries';

export class GetSkaterStatsFields {
  static customColumns = {
    'Position': `${GetSkaterStatsQueries.positionFormula} as Position`,
    'ShotsPCT': `${GetSkaterStatsQueries.shotPctFormula} AS ShotsPCT`,
    'AvgTOI': `${GetSkaterStatsQueries.toiPerGameFormula} as AvgTOI`,
    'FaceoffPCT': `${GetSkaterStatsQueries.faceoffPctFormula} as FaceoffPCT`,
    'P60': `${GetSkaterStatsQueries.pointsPer60Formula} as P60`,
    'TeamAbbre': `{1}.Abbre as TeamAbbre`
  };

  static allowedFields = ['UniqueID', 'Name', 'GP', 'G', 'A', 'P', 'PlusMinus', 'Pim',
    'Hits', 'Shots', 'ShotsBlock', 'PKG', 'PPG', 'PPA', 'PPP', 'TeamAbbre', 'Position',
    'ShotsPCT', 'AvgTOI', 'FaceoffPCT', 'P60'];

  static getFullColumnDescriptor(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetSkaterStatsFields.customColumns).indexOf(field) >= 0) {
      return GetSkaterStatsFields.customColumns[field];
    } else if (GetSkaterStatsFields.allowedFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else {
      return null;
    }
  }

  static getFullColumnName(field: string): string {
    if (!field) {
      return null;
    }

    if (Object.keys(GetSkaterStatsFields.customColumns).indexOf(field) >= 0) {
      return field;
    } else if (GetSkaterStatsFields.allowedFields.indexOf(field) >= 0) {
      return `{0}.${field}`;
    } else {
      return null;
    }
  }
}
