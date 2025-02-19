import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Logo } from '../../logo/Schema/logo.schema';

export enum OrderStatus {
  Processing = 'Processing',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  userPhone: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true, enum: OrderStatus, default: OrderStatus.Processing })
  status: OrderStatus;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Logo' }], required: true })
  logos: Types.ObjectId[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
