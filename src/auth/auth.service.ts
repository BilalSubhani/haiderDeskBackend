import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from '../admin/Schema/admin.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private jwtService: JwtService,
  ) {}

  // Login function
  async login(email: string, password: string) {
    const admin = await this.adminModel.findOne({ email });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');

    // Generate JWT Token
    const payload = { sub: admin._id, email: admin.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
