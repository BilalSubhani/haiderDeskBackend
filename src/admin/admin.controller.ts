import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Create Admin
  @Post()
  async createAdmin(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.adminService.createAdmin(name, email, password);
  }

  // Get All Admins
  @Get()
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  // Get Admin by ID
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  // Update Admin
  @Patch(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('email') email?: string,
  ) {
    return this.adminService.updateAdmin(id, name, email);
  }

  // Delete Admin
  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
