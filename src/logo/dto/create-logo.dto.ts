import { IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateLogoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  originalPrice?: number;

  @IsNumber()
  salePrice: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  imageSrc: string;
}
