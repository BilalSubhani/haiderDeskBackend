import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Logo extends Document {
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
}

export const LogoSchema = SchemaFactory.createForClass(Logo);
