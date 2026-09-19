export type InsuranceType = 'MassHealth' | 'Medicare' | 'Medicaid' | 'Private';
export interface VerifyEligibilityRequest {
    memberId: string;
    insuranceType: InsuranceType;
    dateOfBirth?: string;
}
export interface VerifyEligibilityResponse {
    eligible: boolean;
    memberId: string;
    memberName?: string;
    insuranceType: InsuranceType;
    coverageStatus: 'active' | 'inactive' | 'suspended';
    effectiveDate?: Date;
    terminationDate?: Date;
    verifiedAt: Date;
}
export interface BenefitInfo {
    type: InsuranceType;
    state: string;
    rides_per_month: number;
    coverage_area: string[];
    copay?: number;
    restrictions?: string[];
    contact_number: string;
}
export interface InsuranceEligibility {
    id: string;
    userId: string;
    memberId: string;
    insuranceType: InsuranceType;
    eligible: boolean;
    verifiedAt: Date;
    expiresAt?: Date;
}
//# sourceMappingURL=insurance.d.ts.map