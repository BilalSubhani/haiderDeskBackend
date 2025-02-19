import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './Schema/visit.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Visit.name) private visitModel: Model<VisitDocument>,
  ) {}

  async getVisitCount(): Promise<number> {
    const visit = await this.visitModel.findOne();
    return visit ? visit.count : 0;
  }

  async incrementVisitCount(): Promise<number> {
    const visit = await this.visitModel.findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { new: true, upsert: true },
    );
    return visit.count;
  }
}
