import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { LogoService } from './logo.service';
import { CreateLogoDto } from './dto/create-logo.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Controller('logo')
export class LogoController {
  constructor(private readonly logoService: LogoService) {}

  @Post()
  async create(@Body() createLogoDto: CreateLogoDto) {
    return this.logoService.create(createLogoDto);
  }

  @Get()
  async findAll() {
    return this.logoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.logoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLogoDto: UpdateLogoDto) {
    return this.logoService.update(id, updateLogoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.logoService.remove(id);
  }
}
