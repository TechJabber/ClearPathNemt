import { Injectable, Logger } from '@nestjs/common';
import { SupabaseService } from '../database/supabase.service';
import { RideBooking, CreateBookingRequest, BookingConfirmation } from '@clear-path/shared';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BookingsService {
  private logger = new Logger(BookingsService.name);

  constructor(private readonly supabase: SupabaseService) {}

  async createBooking(patientId: string, input: CreateBookingRequest): Promise<BookingConfirmation> {
    const bookingId = uuidv4();
    const confirmationNumber = `CP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const now = new Date().toISOString();

    try {
      await this.supabase.insert('rides', {
        id: bookingId,
        patient_id: patientId,
        pickup_address: input.pickupAddress,
        pickup_city: input.pickupCity,
        pickup_state: input.pickupState,
        pickup_zip: input.pickupZipCode,
        dropoff_address: input.dropoffAddress,
        dropoff_city: input.dropoffCity,
        dropoff_state: input.dropoffState,
        dropoff_zip: input.dropoffZipCode,
        scheduled_time: input.scheduledTime,
        ride_type: input.rideType,
        notes: input.notes,
        membership_id: input.membershipId,
        insurance_type: input.insuranceType,
        status: 'pending',
        confirmation_number: confirmationNumber,
        created_at: now,
        updated_at: now,
      });

      this.logger.log(`Ride created: ${bookingId} (${confirmationNumber})`);

      return {
        id: bookingId,
        confirmationNumber,
        pickupTime: new Date(input.scheduledTime),
        estimatedDuration: 45,
        status: 'pending',
      };
    } catch (error) {
      this.logger.error('Failed to create booking', error);
      throw error;
    }
  }

  async getRideByConfirmationNumber(confirmationNumber: string): Promise<RideBooking | null> {
    try {
      const rides = await this.supabase.select('rides', {
        confirmation_number: confirmationNumber,
      });

      if (rides.length === 0) return null;

      return this.mapRideRow(rides[0]);
    } catch (error) {
      this.logger.error('Failed to get ride', error);
      return null;
    }
  }

  async getPatientRides(patientId: string): Promise<RideBooking[]> {
    try {
      const rides = await this.supabase.select('rides', {
        patient_id: patientId,
      });

      return rides.map((ride) => this.mapRideRow(ride));
    } catch (error) {
      this.logger.error('Failed to get patient rides', error);
      return [];
    }
  }

  private mapRideRow(row: any): RideBooking {
    return {
      id: row.id,
      patientId: row.patient_id,
      providerId: row.provider_id,
      driverId: row.driver_id,
      pickupLocation: {
        address: row.pickup_address,
        city: row.pickup_city,
        state: row.pickup_state,
        zipCode: row.pickup_zip,
      },
      dropoffLocation: {
        address: row.dropoff_address,
        city: row.dropoff_city,
        state: row.dropoff_state,
        zipCode: row.dropoff_zip,
      },
      scheduledTime: new Date(row.scheduled_time),
      rideType: row.ride_type,
      notes: row.notes,
      status: row.status,
      membershipId: row.membership_id,
      insuranceType: row.insurance_type,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
