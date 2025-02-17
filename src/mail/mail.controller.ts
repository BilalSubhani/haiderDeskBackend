import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('send-email')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendEmail(
    @Body() body: { to: string[]; subject: string; emailBody: string },
  ) {
    return this.mailService.sendEmails(body);
  }
}
