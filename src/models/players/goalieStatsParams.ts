export interface GoalieStatsParams {
  hasPlayedMinimumGames?: number;
  hasTeam?: string;
  hasSavePercentage?: string;
  team?: number;
  league?: string;
  limit?: number;
  skip?: number;
  sort?: string;
  fields?: string;
}
