import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Admin, AdminDocument } from './Schema/admin.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async createAdmin(
    name: string,
    email: string,
    password: string,
  ): Promise<Admin> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new this.adminModel({
      name,
      email,
      password: hashedPassword,
    });
    return newAdmin.save();
  }

  async getAllAdmins(): Promise<Admin[]> {
    return this.adminModel.find().select('-password').exec();
  }

  async getAdminById(id: string): Promise<Admin> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const admin = await this.adminModel.findById(id).select('-password');
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async updateAdmin(id: string, name?: string, email?: string): Promise<Admin> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!updatedAdmin) throw new NotFoundException('Admin not found');
    return updatedAdmin;
  }

  async deleteAdmin(id: string): Promise<{ message: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
    const deletedAdmin = await this.adminModel.findByIdAndDelete(id);
    if (!deletedAdmin) throw new NotFoundException('Admin not found');
    return { message: 'Admin deleted successfully' };
  }
}
