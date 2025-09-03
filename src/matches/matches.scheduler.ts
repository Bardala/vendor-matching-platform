import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MatchesService } from './matches.service';

@Injectable()
export class MatchesScheduler {
  constructor(private readonly matchesService: MatchesService) {}

  @Cron('* * * * *') // every minute for testing; change to '0 0 * * *' for daily at midnight
  async handleDailyMatchRefresh() {
    console.log('🔄 Running daily match refresh...');
    await this.matchesService.refreshDailyMatches();
  }
}
