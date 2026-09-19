export interface RideBooking {
    id: string;
    confirmationNumber: string;
    userId: string;
    pickupAddress: string;
    pickupCity: string;
    pickupState: string;
    pickupZip: string;
    dropoffAddress: string;
    dropoffCity: string;
    dropoffState: string;
    dropoffZip: string;
    scheduledTime: Date;
    rideType: 'wheelchair' | 'ambulatory' | 'stretcher';
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}
export interface CreateBookingRequest {
    pickupAddress: string;
    pickupCity: string;
    pickupState: string;
    pickupZip: string;
    dropoffAddress: string;
    dropoffCity: string;
    dropoffState: string;
    dropoffZip: string;
    scheduledTime: string;
    rideType: 'wheelchair' | 'ambulatory' | 'stretcher';
    specialRequests?: string;
}
export interface BookingConfirmation {
    confirmationNumber: string;
    scheduledTime: Date;
    estimatedDuration: number;
    pickupAddress: string;
    dropoffAddress: string;
    status: string;
}
//# sourceMappingURL=booking.d.ts.map