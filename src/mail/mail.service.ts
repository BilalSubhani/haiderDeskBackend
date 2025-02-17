import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

interface EmailData {
  to: string[];
  subject: string;
  emailBody: string;
}

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendEmails({ to, subject, emailBody }: EmailData) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to.join(','),
      subject: subject,
      html: emailBody,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { message: 'Emails sent successfully' };
    } catch (error) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
}
