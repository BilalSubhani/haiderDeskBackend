import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Email, EmailSchema } from './Schema/email.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
    ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
