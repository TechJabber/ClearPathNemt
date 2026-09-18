/**
 * Insurance & Benefits Types
 * For eligibility verification and benefit information
 */

export type InsuranceType = 'masshealth' | 'medicare' | 'medicaid' | 'private';
export type EligibilityStatus = 'eligible' | 'ineligible' | 'pending' | 'error';
export type USState = 'MA' | 'CT' | 'RI' | 'VT' | 'NH';

export interface InsuranceInfo {
  id: string;
  patientId: string;
  type: InsuranceType;
  memberId: string;
  groupNumber?: string;
  effectiveDate: Date;
  terminationDate?: Date;
  state: USState;
  verified: boolean;
  verificationDate?: Date;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EligibilityCheck {
  id: string;
  patientId: string;
  memberId: string;
  insuranceType: InsuranceType;
  status: EligibilityStatus;
  eligible: boolean;
  coverageType?: string;
  copay?: number;
  coinsurance?: number;
  deductible?: number;
  deductibleMet?: number;
  authorizations?: {
    required: boolean;
    status?: 'pending' | 'approved' | 'denied';
    referralNumber?: string;
  };
  checkedAt: Date;
  expiresAt: Date;
  errorMessage?: string;
}

export interface BenefitInfo {
  id: string;
  insuranceType: InsuranceType;
  state: USState;
  coverageType: string;
  maxRidesPerMonth?: number;
  ridesCovered?: string[];
  restrictions?: string[];
  copay?: number;
  coinsurance?: number;
  requiresAuthorization: boolean;
  documentationRequired: string[];
  lastUpdated: Date;
}

export interface MassHealthBenefit extends BenefitInfo {
  planType: 'managed_care' | 'primary_care' | 'fee_for_service';
  carePlanRequired: boolean;
}

export interface MedicareBenefit extends BenefitInfo {
  planType: 'original_medicare' | 'advantage_plan';
  requiresPartB: boolean;
}

export interface MedicaidBenefit extends BenefitInfo {
  programType: 'nemt' | 'ride_program' | 'other';
  stateSpecific: boolean;
}

export interface VerifyEligibilityRequest {
  memberId: string;
  insuranceType: InsuranceType;
  state: USState;
  dateOfService?: string; // ISO 8601
}

export interface VerifyEligibilityResponse {
  success: boolean;
  eligibility: EligibilityCheck;
  benefits?: BenefitInfo;
  message?: string;
}

export interface Claim {
  id: string;
  rideId: string;
  patientId: string;
  providerId: string;
  insuranceType: InsuranceType;
  memberId: string;
  status: 'draft' | 'submitted' | 'accepted' | 'paid' | 'denied';
  amountClaimed: number;
  amountAllowed?: number;
  amountPaid?: number;
  denialReason?: string;
  submittedDate?: Date;
  paidDate?: Date;
  documents: string[]; // S3 URLs
  createdAt: Date;
  updatedAt: Date;
}

export interface ClaimSubmissionRequest {
  rideId: string;
  providerId: string;
  insuranceType: InsuranceType;
  memberId: string;
  amountClaimed: number;
  documents?: string[];
}

export interface BenefitEligibilityPage {
  state: USState;
  insuranceType: InsuranceType;
  title: string;
  description: string;
  coverage: string[];
  requirements: string[];
  process: string[];
  faqItems: {
    question: string;
    answer: string;
  }[];
  contactInfo: {
    phone: string;
    website: string;
  };
}
