import { Module } from '@nestjs/common';
import { LogoService } from './logo.service';
import { LogoController } from './logo.controller';
import { Logo, LogoSchema } from './Schema/logo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logo.name, schema: LogoSchema }]),
  ],
  controllers: [LogoController],
  providers: [LogoService],
})
export class LogoModule {}
