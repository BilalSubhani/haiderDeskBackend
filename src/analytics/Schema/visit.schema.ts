import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

@Schema()
export class Visit {
  @Prop({ required: true, default: 0 })
  count: number;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
