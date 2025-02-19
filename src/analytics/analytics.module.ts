import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Visit, VisitSchema } from './Schema/visit.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Visit.name, schema: VisitSchema }]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
