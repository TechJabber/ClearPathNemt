/**
 * Ride Booking & Tracking Types
 * Core domain model for NEMT service
 */

export type RideStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type RideType = 'medical_appointment' | 'dialysis' | 'physical_therapy' | 'specialist_visit' | 'other';

export interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
  city: string;
  state: string;
  zipCode: string;
}

export interface RideBooking {
  id: string;
  patientId: string;
  providerId?: string;
  driverId?: string;

  // Booking details
  pickupLocation: Location;
  dropoffLocation: Location;
  scheduledTime: Date;
  rideType: RideType;
  notes?: string;

  // Status tracking
  status: RideStatus;
  estimatedDuration?: number; // in minutes
  estimatedDistance?: number; // in miles

  // Insurance info
  membershipId?: string;
  insuranceType?: 'masshealth' | 'medicare' | 'medicaid' | 'private';

  // Tracking
  driverLocation?: Location;
  eta?: Date;
  completedTime?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBookingRequest {
  pickupAddress: string;
  dropoffAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupZipCode: string;
  dropoffCity: string;
  dropoffState: string;
  dropoffZipCode: string;
  scheduledTime: string; // ISO 8601
  rideType: RideType;
  notes?: string;
  membershipId?: string;
  insuranceType?: 'masshealth' | 'medicare' | 'medicaid' | 'private';
}

export interface BookingConfirmation {
  id: string;
  confirmationNumber: string;
  pickupTime: Date;
  estimatedDuration: number;
  driverInfo?: {
    name: string;
    phone: string;
    vehicleInfo: string;
  };
  status: RideStatus;
}

export interface RideUpdate {
  id: string;
  status: RideStatus;
  driverLocation?: Location;
  eta?: Date;
  message?: string;
  timestamp: Date;
}
