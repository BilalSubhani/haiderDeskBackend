import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  create(@Body('email') email: string) {
    return this.emailService.create(email);
  }

  @Get()
  findAll() {
    return this.emailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body('email') newEmail: string) {
    return this.emailService.update(id, newEmail);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailService.remove(id);
  }
}
