import { Module } from '@nestjs/common';
import { LogoService } from './logo.service';
import { LogoController } from './logo.controller';
import { Logo, LogoSchema } from './Schema/logo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Logo.name, schema: LogoSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [LogoController],
  providers: [LogoService],
})
export class LogoModule {}
