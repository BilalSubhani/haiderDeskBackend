import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Email } from './Schema/email.schema';

@Injectable()
export class EmailService {
  constructor(@InjectModel(Email.name) private emailModel: Model<Email>) {}

  async create(email: string): Promise<Email> {
    try {
      return await this.emailModel.create({ email });
    } catch (error) {
      throw new BadRequestException('Email already exists');
    }
  }

  async findAll(): Promise<Email[]> {
    return this.emailModel.find().exec();
  }

  async findOne(id: string): Promise<Email> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const email = await this.emailModel.findById(id).exec();
    if (!email) throw new NotFoundException('Email not found');
    return email;
  }

  async update(id: string, newEmail: string): Promise<Email> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const email = await this.emailModel.findByIdAndUpdate(
      id,
      { email: newEmail },
      { new: true },
    );
    if (!email) throw new NotFoundException('Email not found');
    return email;
  }

  async remove(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const email = await this.emailModel.findByIdAndDelete(id).exec();
    if (!email) throw new NotFoundException('Email not found');
    return { message: 'Email deleted successfully' };
  }
}
