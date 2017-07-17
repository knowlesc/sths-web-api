export class GetInjuredPlayersQueries {
  // SELECT
  static playersFieldsQuery = `
    SELECT PlayerInfo.Name,
      PlayerInfo.UniqueID,
      ROUND(((95 - ConditionDecimal) / (SELECT ProInjuryRecoverySpeed FROM LeagueGeneral)) - 0.5) as InjuryLength,
      Injury,
      TeamProInfo.Name as Team,
      'skaters' as Type`;
  static goaliesFieldsQuery = `
    SELECT GoalerInfo.Name,
      GoalerInfo.UniqueID,
      ROUND(((95 - ConditionDecimal) / (SELECT ProInjuryRecoverySpeed FROM LeagueGeneral)) - 0.5) as InjuryLength,
      Injury,
      TeamProInfo.Name as Team,
      'goalies' as Type`;

  // FROM
  static fromPlayersQuery = `
    FROM PlayerInfo
      INNER JOIN TeamProInfo on PlayerInfo.Team = TeamProInfo.Number`;
  static fromGoaliesQuery = `
    FROM GoalerInfo
      INNER JOIN TeamProInfo on GoalerInfo.Team = TeamProInfo.Number`;

  // WHERE
  static hasInjury = `Injury IS NOT NULL AND Injury != ""`;
  static playerHasTeam = `PlayerInfo.Status1 >= 2`;
  static goalieHasTeam = `GoalerInfo.Status1 >= 2`;
}
