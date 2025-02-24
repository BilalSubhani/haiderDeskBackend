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
import { Category } from '../category/schema/category.schema';

@Injectable()
export class LogoService {
  constructor(
    @InjectModel(Logo.name) private logoModel: Model<Logo>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createLogoDto: CreateLogoDto): Promise<Logo> {
    const { category } = createLogoDto;

    if (!Types.ObjectId.isValid(category)) {
      throw new BadRequestException('Invalid category ID format');
    }

    const existingCategory = await this.categoryModel.findById(category);
    if (!existingCategory) {
      throw new NotFoundException('Category not found');
    }

    const newLogo = new this.logoModel(createLogoDto);
    return newLogo.save();
  }

  async findAll(): Promise<Logo[]> {
    return this.logoModel
      .find()
      .populate('category', 'name width height')
      .exec();
  }

  async findOne(id: string): Promise<Logo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const logo = await this.logoModel
      .findById(id)
      .populate('category', 'name width height')
      .exec();
    if (!logo) throw new NotFoundException('Logo not found');

    return logo;
  }

  async update(id: string, updateLogoDto: UpdateLogoDto): Promise<Logo> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    if (updateLogoDto.category) {
      if (!Types.ObjectId.isValid(updateLogoDto.category)) {
        throw new BadRequestException('Invalid category ID format');
      }

      const categoryExists = await this.categoryModel.findById(
        updateLogoDto.category,
      );
      if (!categoryExists) {
        throw new NotFoundException('Category not found');
      }
    }

    const updatedLogo = await this.logoModel
      .findByIdAndUpdate(id, updateLogoDto, { new: true })
      .exec();
    if (!updatedLogo) {
      throw new NotFoundException('Logo not found');
    }

    return updatedLogo;
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
