import { Controller, Get, Post } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('visits')
  async getVisitCount() {
    return { visits: await this.analyticsService.getVisitCount() };
  }

  @Post('visit')
  async trackVisit() {
    return { visits: await this.analyticsService.incrementVisitCount() };
  }
}
