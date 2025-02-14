import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { LogoService } from './logo.service';
import { CreateLogoDto } from './dto/create-logo.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller('logo')
export class LogoController {
  constructor(private readonly logoService: LogoService) {}

  @Post()
  create(@Body() createLogoDto: CreateLogoDto) {
    return this.logoService.create(createLogoDto);
  }

  @Get()
  findAll() {
    return this.logoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLogoDto: UpdateLogoDto) {
    return this.logoService.update(id, updateLogoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logoService.remove(id);
  }
}
