import { Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { InsuranceService } from './insurance.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { VerifyEligibilityRequest, VerifyEligibilityResponse, BenefitInfo } from '@clear-path/shared';

@ApiTags('insurance')
@Controller('api/insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Post('verify')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify insurance eligibility' })
  @ApiResponse({ status: 200, description: 'Eligibility verified' })
  async verifyEligibility(
    @Request() req: any,
    @Body() input: VerifyEligibilityRequest,
  ): Promise<VerifyEligibilityResponse> {
    return this.insuranceService.verifyEligibility(req.user.id, input);
  }

  @Get('benefits/:insuranceType/:state')
  @ApiOperation({ summary: 'Get benefit information' })
  @ApiResponse({ status: 200, description: 'Benefits retrieved' })
  async getBenefits(
    @Param('insuranceType') insuranceType: string,
    @Param('state') state: string,
  ): Promise<BenefitInfo | null> {
    return this.insuranceService.getBenefitInfo(insuranceType, state);
  }
}
