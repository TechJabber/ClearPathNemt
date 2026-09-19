import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../database/supabase.service';
import {
  VerifyEligibilityRequest,
  VerifyEligibilityResponse,
  BenefitInfo,
} from '@clear-path/shared';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InsuranceService {
  private logger = new Logger(InsuranceService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async verifyEligibility(
    patientId: string,
    request: VerifyEligibilityRequest,
  ): Promise<VerifyEligibilityResponse> {
    try {
      // Mock eligibility verification (Phase 3 will integrate with real APIs)
      const eligibilityId = uuidv4();
      const now = new Date().toISOString();
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 90);

      const eligibility: any = {
        id: eligibilityId,
        patientId,
        memberId: request.memberId,
        insuranceType: request.insuranceType,
        status: 'eligible',
        eligible: true,
        coverageType: this.getCoverageType(request.insuranceType),
        copay: this.getCopay(request.insuranceType),
        checkedAt: new Date(),
        expiresAt: expiryDate,
      };

      // Store in database
      await this.supabase.insert('eligibility_checks', {
        id: eligibilityId,
        patient_id: patientId,
        member_id: request.memberId,
        insurance_type: request.insuranceType,
        eligibility_status: 'eligible',
        coverage_type: eligibility.coverageType,
        copay: eligibility.copay,
        checked_at: now,
        expires_at: expiryDate.toISOString(),
      });

      const benefits = this.getBenefits(request.insuranceType, (request as any).state);

      return {
        success: true,
        eligibility,
        benefits,
      } as any;
    } catch (error) {
      this.logger.error('Eligibility verification failed', error);
      return {
        success: false,
        eligibility: {
          id: uuidv4(),
          patientId,
          memberId: request.memberId,
          insuranceType: request.insuranceType,
          status: 'error',
          eligible: false,
          checkedAt: new Date(),
          expiresAt: new Date(),
        },
        message: 'Failed to verify eligibility',
      } as any;
    }
  }

  async getBenefitInfo(
    insuranceType: string,
    state: string,
  ): Promise<BenefitInfo | null> {
    try {
      const benefits = await this.supabase.select('benefit_info', {
        insurance_type: insuranceType,
        state,
      });

      if (benefits.length === 0) return null;

      return this.mapBenefitRow(benefits[0]);
    } catch (error) {
      this.logger.error('Failed to get benefit info', error);
      return null;
    }
  }

  private getCoverageType(insuranceType: string): string {
    const types: Record<string, string> = {
      masshealth: 'MassHealth Managed Care',
      medicare: 'Medicare Part B',
      medicaid: 'State Medicaid',
      private: 'Private Insurance',
    };
    return types[insuranceType] || 'Unknown Coverage';
  }

  private getCopay(insuranceType: string): number {
    const copays: Record<string, number> = {
      masshealth: 0,
      medicare: 0,
      medicaid: 0,
      private: 5,
    };
    return copays[insuranceType] || 0;
  }

  private getBenefits(insuranceType: string, state: string): BenefitInfo {
    return {
      id: uuidv4(),
      insuranceType: insuranceType as any,
      state: state as any,
      title: `${insuranceType.toUpperCase()} Benefits`,
      description: `Benefits for ${state} residents`,
      coverage: [
        'Rides to medical appointments',
        'Dialysis treatment transport',
        'Physical therapy visits',
        'Specialist appointments',
      ],
      requirements: [
        'Valid membership ID',
        'Pre-authorization may be required',
        '24-hour advance booking recommended',
      ],
      process: [
        '1. Register for Clear Path NEMT',
        '2. Verify your insurance coverage',
        '3. Book your ride online or by phone',
        '4. Receive confirmation and driver details',
      ],
      faqItems: [
        {
          question: 'Is transportation covered?',
          answer: 'Yes, for medically necessary trips covered under your plan.',
        },
        {
          question: 'Do I need pre-authorization?',
          answer: 'Some rides may require prior authorization. Check with your plan.',
        },
      ],
      contactInfo: {
        phone: '1-844-NEMT-123',
        website: 'https://goclearpathemt.com',
      },
      lastUpdated: new Date(),
    } as any;
  }

  private mapBenefitRow(row: any): BenefitInfo {
    return {
      id: row.id,
      insuranceType: row.insurance_type,
      state: row.state,
      title: row.title || `${row.insurance_type} Benefits`,
      description: row.description || '',
      coverage: row.coverage || [],
      requirements: row.requirements || [],
      process: row.process || [],
      faqItems: row.faq_items || [],
      contactInfo: row.contact_info || {
        phone: '1-844-NEMT-123',
        website: 'https://goclearpathemt.com',
      },
      lastUpdated: new Date(row.last_updated),
    } as any;
  }
}
