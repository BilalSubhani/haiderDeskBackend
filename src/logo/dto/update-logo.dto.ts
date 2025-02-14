import { PartialType } from '@nestjs/mapped-types';
import { CreateLogoDto } from './create-logo.dto';

export class UpdateLogoDto extends PartialType(CreateLogoDto) {}
