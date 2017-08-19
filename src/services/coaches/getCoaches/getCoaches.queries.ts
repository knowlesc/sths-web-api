export class GetCoachesQueries {
  // SELECT
  static teamFormula = `
    CASE
      WHEN TeamProInfo.Name IS NOT NULL then TeamProInfo.Name
      ELSE TeamFarmInfo.Name
    END`;

  // FROM
  static fromQuery = `
    FROM CoachInfo
      LEFT JOIN TeamProInfo ON CoachInfo.Number = TeamProInfo.CoachID
      LEFT JOIN TeamFarmInfo ON CoachInfo.Number = TeamFarmInfo.CoachID`;
}
