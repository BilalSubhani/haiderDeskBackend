import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Logo } from './Schema/logo.schema';
import { CreateLogoDto } from './dto/create-logo.dto';
import { UpdateLogoDto } from './dto/update-logo.dto';

@Injectable()
export class LogoService {
  constructor(@InjectModel('Logo') private logoModel: Model<Logo>) {}

  async create(createLogoDto: CreateLogoDto): Promise<Logo> {
    const newLogo = new this.logoModel(createLogoDto);
    return newLogo.save();
  }

  async findAll(): Promise<Logo[]> {
    return this.logoModel.find().exec();
  }

  async findOne(id: string): Promise<Logo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const logo = await this.logoModel.findById(id).exec();
    if (!logo) throw new NotFoundException('Logo not found');
    return logo;
  }

  async update(id: string, updateLogoDto: UpdateLogoDto): Promise<Logo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    return this.logoModel
      .findByIdAndUpdate(id, updateLogoDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const deletedLogo = await this.logoModel.findByIdAndDelete(id).exec();

    if (!deletedLogo) {
      throw new NotFoundException('Logo not found');
    }

    return { message: 'Logo deleted successfully' };
  }
}
