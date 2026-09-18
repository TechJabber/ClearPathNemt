/**
 * Provider & Driver Management Types
 * For transportation providers and independent drivers
 */

export type ProviderStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type DriverStatus = 'active' | 'inactive' | 'pending_approval' | 'suspended';
export type USState = 'MA' | 'CT' | 'RI' | 'VT' | 'NH';

export interface ProviderProfile {
  id: string;
  userId: string;
  companyName: string;
  businessLicense: string;
  ein: string; // Employer ID Number
  state: USState;
  address: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  status: ProviderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderApplication {
  id: string;
  providerId: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';

  // Company info
  companyName: string;
  businessLicense: string;
  ein: string;
  stateOfOperation: USState;

  // Contact
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;

  // Insurance
  generalLiabilityInsurance: boolean;
  commercialAutoInsurance: boolean;
  workersCompInsurance: boolean;
  insuranceDocuments?: string[]; // S3 URLs

  // Drivers
  numberOfDrivers: number;
  averageVehicleAge: number;

  // Documents
  documents: ProviderDocument[];
  submittedAt?: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ProviderDocument {
  id: string;
  type: 'business_license' | 'insurance' | 'ein_letter' | 'other';
  name: string;
  url: string;
  uploadedAt: Date;
}

export interface DriverProfile {
  id: string;
  userId: string;
  providerId: string;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseState: USState;
  dateOfBirth: Date;
  phone: string;
  email: string;
  status: DriverStatus;
  backgroundCheckStatus?: 'pending' | 'passed' | 'failed';
  backgroundCheckDate?: Date;
  vehicleId?: string;
  rating?: number; // 1-5 stars
  totalRides?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DriverApplication {
  id: string;
  driverId: string;
  providerId: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';

  // Personal info
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO 8601
  licenseNumber: string;
  licenseState: USState;
  licenseExpiration: string; // ISO 8601

  // Contact
  email: string;
  phone: string;
  address: string;
  city: string;
  state: USState;
  zipCode: string;

  // Background check
  backgroundCheckConsent: boolean;
  backgroundCheckUrl?: string;

  // Vehicle
  vehicleVin: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: number;
  vehicleInsuranceUrl?: string;

  // Documents
  documents: DriverDocument[];
  submittedAt?: Date;
  reviewedAt?: Date;
  rejectionReason?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface DriverDocument {
  id: string;
  type: 'license' | 'insurance' | 'registration' | 'inspection' | 'other';
  name: string;
  url: string;
  expirationDate?: Date;
  uploadedAt: Date;
}

export interface Vehicle {
  id: string;
  driverId: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  lastInspectionDate: Date;
  insuranceExpiration: Date;
  status: 'active' | 'inactive' | 'maintenance';
}

export interface ProviderStats {
  totalDrivers: number;
  totalRidesThisMonth: number;
  averageRating: number;
  cancellationRate: number;
  onTimePercentage: number;
}
