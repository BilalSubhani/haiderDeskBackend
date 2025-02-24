import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../category/schema/category.schema';
export type LogoDocument = Logo & Document;

@Schema({ timestamps: true })
export class Logo {
  @Prop({ required: true })
  name: string;

  @Prop()
  originalPrice?: number;

  @Prop({ required: true })
  salePrice: number;

  @Prop()
  description?: string;

  @Prop({ required: true })
  imageSrc: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category;
}

export const LogoSchema = SchemaFactory.createForClass(Logo);
