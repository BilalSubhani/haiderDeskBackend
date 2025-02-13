import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './Schema/admin.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  // Create Admin
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

  // Get All Admins
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminModel.find().select('-password').exec();
  }

  // Get Admin by ID
  async getAdminById(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).select('-password');
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  // Update Admin
  async updateAdmin(id: string, name?: string, email?: string): Promise<Admin> {
    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true },
    );
    if (!updatedAdmin) throw new NotFoundException('Admin not found');
    return updatedAdmin;
  }

  // Delete Admin
  async deleteAdmin(id: string): Promise<{ message: string }> {
    const deletedAdmin = await this.adminModel.findByIdAndDelete(id);
    if (!deletedAdmin) throw new NotFoundException('Admin not found');
    return { message: 'Admin deleted successfully' };
  }
}
