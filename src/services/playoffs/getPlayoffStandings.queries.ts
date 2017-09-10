export class PlayoffStandingsQueries {
  // SELECT
  static allFieldsQuery = `
    SELECT {0}.*,
      HTeamInfo.Abbre as HomeAbbre,
      HTeamInfo.Name as HomeName,
      VTeamInfo.Abbre as VisitorAbbre,
      VTeamInfo.Name as VisitorName
  `;

  // FROM
  static fromQuery = `
    FROM {0}
      INNER JOIN {1} HTeamInfo ON {0}.HomeTeam = HTeamInfo.UniqueID
      INNER JOIN {1} VTeamInfo ON {0}.VisitorTeam = VTeamInfo.UniqueID
    `;
}
