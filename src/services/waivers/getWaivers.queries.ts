export class WaiversQueries {
  static selectWaiversQuery = `
    SELECT Waiver.*,
      TeamProInfo.Name As FromTeamName,
      TeamProInfo_ToTeam.Name AS ToTeamName
  `;

  static fromWaiversQuery = `
    FROM Waiver
      LEFT JOIN TeamProInfo ON Waiver.FromTeam = TeamProInfo.Number
      LEFT JOIN TeamProInfo AS TeamProInfo_ToTeam ON Waiver.ToTeam = TeamProInfo_ToTeam.Number
    ORDER BY Waiver.Player
  `;

  static selectWaiversOrderQuery = `
    SELECT WaiverOrder.*,
      TeamProInfo.Name
  `;

  static fromWaiversOrderQuery = `
    FROM WaiverOrder
      LEFT JOIN TeamProInfo ON WaiverOrder.TeamProNumber = TeamProInfo.Number
    ORDER BY WaiverOrder.Number
  `;
}
