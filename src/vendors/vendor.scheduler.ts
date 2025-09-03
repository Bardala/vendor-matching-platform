import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { VendorsService } from './vendors.service';

@Injectable()
export class VendorsScheduler {
  private readonly logger = new Logger(VendorsScheduler.name);

  constructor(private readonly vendorsService: VendorsService) {}

  @Cron('0 1 * * *')
  async handleExpiredSlaVendors() {
    this.logger.log('⏳ Checking for vendors with expired SLA...');
    const flaggedCount = await this.vendorsService.flagExpiredSlaVendors();
    if (flaggedCount > 0) {
      this.logger.warn(
        `⚠️ ${flaggedCount} vendors flagged as inactive due to expired SLA`,
      );
    }
  }
}
