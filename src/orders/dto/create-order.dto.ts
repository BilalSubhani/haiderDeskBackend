import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  userPhone: string;

  @IsNotEmpty()
  @IsEmail()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsString()
  totalPrice: number;

  @IsArray()
  @IsNotEmpty()
  logos: Types.ObjectId[];
}
