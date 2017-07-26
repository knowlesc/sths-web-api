export class GetPlayersByNameQueries {
  static resultsUnionQuery = `
    WITH Results AS (
      SELECT PlayerInfo.Name,
        PlayerInfo.UniqueID,
        TeamProInfo.Name as Team,
        CASE
          WHEN PlayerInfo.PosC = 'True' OR PlayerInfo.PosLW = 'True' OR PlayerInfo.PosRW = 'True' THEN 'F'
          WHEN PlayerInfo.PosD = 'True' THEN 'D'
        END as Position,
        'skaters' as Type
      FROM PlayerInfo
        INNER JOIN TeamProInfo on PlayerInfo.Team = TeamProInfo.Number
        WHERE (PlayerInfo.Name LIKE '%{0}%')

          UNION

      SELECT GoalerInfo.Name,
        GoalerInfo.UniqueID,
        TeamProInfo.Name as Team,
        'G' as Position,
        'goalies' as Type
      FROM GoalerInfo
        INNER JOIN TeamProInfo on GoalerInfo.Team = TeamProInfo.Number
        WHERE (GoalerInfo.Name LIKE '%{0}%')
    )
  `;

  static allFieldsQuery = ` SELECT *`;
  static fromQuery = `FROM Results`;
}
