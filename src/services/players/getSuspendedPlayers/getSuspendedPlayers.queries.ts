export class GetSuspendedPlayersQueries {
  // SELECT
  static playersFieldsQuery = `
    SELECT PlayerInfo.Name,
      PlayerInfo.UniqueID,
      Suspension,
      CASE
        WHEN PlayerInfo.Status1 >= 2 THEN TeamProInfo.Name
        ELSE TeamFarmInfo.Name
      END as Team,
      'skaters' as Type,
      CASE
        WHEN PlayerInfo.Status1 >= 2 THEN 'pro'
        ELSE 'farm'
      END as League`;
  static goaliesFieldsQuery = `
    SELECT GoalerInfo.Name,
      GoalerInfo.UniqueID,
      Suspension,
      CASE
        WHEN GoalerInfo.Status1 >= 2 THEN TeamProInfo.Name
        ELSE TeamFarmInfo.Name
      END as Team,
      'goalies' as Type,
      CASE
        WHEN GoalerInfo.Status1 >= 2 THEN 'pro'
        ELSE 'farm'
      END as League`;

  // FROM
  static fromPlayersQuery = `
    FROM PlayerInfo
      INNER JOIN TeamProInfo on PlayerInfo.Team = TeamProInfo.Number
      INNER JOIN TeamFarmInfo on PlayerInfo.Team = TeamFarmInfo.Number`;
  static fromGoaliesQuery = `
    FROM GoalerInfo
      INNER JOIN TeamProInfo on GoalerInfo.Team = TeamProInfo.Number
      INNER JOIN TeamFarmInfo on GoalerInfo.Team = TeamFarmInfo.Number`;

  // WHERE
  static hasSuspension = `Suspension IS NOT NULL AND Suspension > 0`;
}
