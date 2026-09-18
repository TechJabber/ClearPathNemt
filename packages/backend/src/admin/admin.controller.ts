import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiTags('admin')
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard stats retrieved' })
  async getDashboard(@Request() req: any) {
    return this.adminService.getDashboardStats(req.user);
  }

  @Get('applications/pending')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get pending provider applications' })
  async getPendingApplications(@Request() req: any) {
    return this.adminService.getPendingApplications(req.user);
  }

  @Post('applications/:id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve a provider application' })
  async approveApplication(@Param('id') id: string, @Request() req: any) {
    return this.adminService.approveProvider(req.user, id);
  }

  @Post('applications/:id/reject')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject a provider application' })
  async rejectApplication(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Request() req: any,
  ) {
    return this.adminService.rejectProvider(req.user, id, reason);
  }

  @Get('rides')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all rides (filtered)' })
  async getRides(@Request() req: any, @Body() filters?: any) {
    return this.adminService.getAllRides(req.user, filters);
  }
}
