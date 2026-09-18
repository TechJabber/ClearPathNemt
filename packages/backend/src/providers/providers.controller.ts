import { Controller, Get, Post, Body, Param, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProvidersService } from './providers.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ProviderApplication } from '@clear-path/shared';

@ApiTags('providers')
@Controller('api/providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post('applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new provider application' })
  @ApiResponse({ status: 201, description: 'Application created' })
  async createApplication(@Request() req: any, @Body() input: any): Promise<ProviderApplication> {
    return this.providersService.createApplication(req.user.id, input);
  }

  @Get('applications')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get provider applications' })
  async getApplications(@Request() req: any): Promise<ProviderApplication[]> {
    return this.providersService.getApplications();
  }

  @Post('applications/:id/submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit a provider application' })
  async submitApplication(@Param('id') id: string): Promise<ProviderApplication> {
    return this.providersService.submitApplication(id);
  }

  @Post('applications/:id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Approve a provider application (admin only)' })
  async approveApplication(@Param('id') id: string, @Request() req: any): Promise<ProviderApplication> {
    return this.providersService.approveApplication(id, req.user.id);
  }

  @Post('applications/:id/reject')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject a provider application (admin only)' })
  async rejectApplication(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Request() req: any,
  ): Promise<ProviderApplication> {
    return this.providersService.rejectApplication(id, req.user.id, reason);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get provider by ID' })
  async getProvider(@Param('id') id: string) {
    return this.providersService.getProvider(id);
  }
}
