import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.adminService.createAdmin(name, email, password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/email/:email')
  async getAdminByEmail(@Param('email') email: string) {
    const admin = await this.adminService.getAdminByEmail(email);
    if (!admin) {
      return { message: 'Admin not found' };
    }
    return { name: admin.name, email: admin.email };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body('name') name?: string,
    @Body('email') email?: string,
  ) {
    return this.adminService.updateAdmin(id, name, email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
