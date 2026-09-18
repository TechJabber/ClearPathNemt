/**
 * @clear-path/shared - Public API
 * Export all shared types
 */

// Auth types
export type { AuthUser, JWTPayload, LoginRequest, LoginResponse, RegisterRequest, AuthError, UserRole } from './auth';

// Booking types
export type {
  RideBooking,
  CreateBookingRequest,
  BookingConfirmation,
  RideUpdate,
  Location,
  RideStatus,
  RideType,
} from './booking';

// Provider types
export type {
  ProviderProfile,
  ProviderApplication,
  ProviderDocument,
  DriverProfile,
  DriverApplication,
  DriverDocument,
  Vehicle,
  ProviderStats,
  ProviderStatus,
  DriverStatus,
  USState,
} from './provider';

// Insurance types
export type {
  InsuranceInfo,
  EligibilityCheck,
  BenefitInfo,
  MassHealthBenefit,
  MedicareBenefit,
  MedicaidBenefit,
  VerifyEligibilityRequest,
  VerifyEligibilityResponse,
  Claim,
  ClaimSubmissionRequest,
  BenefitEligibilityPage,
  InsuranceType,
  EligibilityStatus,
} from './insurance';
