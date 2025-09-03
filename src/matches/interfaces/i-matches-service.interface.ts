import { Match } from '../entities/match.entity';

export interface IMatchesService {
  rebuildMatchesForProject(projectId: number): Promise<Match[]>;
  findAllByProject(projectId: number): Promise<Match[]>;
  markAsNotified(matchId: number): Promise<void>;
  refreshDailyMatches(): Promise<void>;
}
