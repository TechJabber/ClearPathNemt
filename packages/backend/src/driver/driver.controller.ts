import { Controller, Post, Get, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { DriverService } from './driver.service';

interface LocationUpdateDto {
  driverId: string;
  rideId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface DriverLocationResponse {
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
    eta?: number; // minutes until arrival
  };
}

@Controller('api/driver')
export class DriverController {
  // In-memory storage for demo (use Supabase in production)
  private driverLocations: Map<string, any> = new Map();

  constructor(private driverService: DriverService) {}

  /**
   * Driver sends location update every 60 seconds
   */
  @Post('location')
  async updateLocation(@Body() locationData: LocationUpdateDto) {
    try {
      const { driverId, rideId, latitude, longitude, accuracy } = locationData;

      // Store in memory (replace with Supabase in production)
      this.driverLocations.set(driverId, {
        driverId,
        rideId,
        latitude,
        longitude,
        accuracy,
        timestamp: Date.now(),
      });

      // TODO: Broadcast to patient via Supabase Realtime
      // await this.supabase
      //   .from('driver_locations')
      //   .upsert({ driver_id: driverId, latitude, longitude, accuracy, updated_at: new Date() });

      return {
        success: true,
        message: 'Location updated successfully',
        location: {
          latitude,
          longitude,
          accuracy,
          timestamp: Date.now(),
        },
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update location',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Patient fetches driver location for a specific ride
   */
  @Get('rides/:rideId/driver-location')
  async getDriverLocation(@Param('rideId') rideId: string): Promise<DriverLocationResponse> {
    try {
      // Find driver for this ride
      const location = Array.from(this.driverLocations.values()).find(
        (loc) => loc.rideId === rideId,
      );

      if (!location) {
        throw new HttpException(
          'Driver location not available',
          HttpStatus.NOT_FOUND,
        );
      }

      // Calculate ETA (mock calculation)
      const eta = Math.ceil(Math.random() * 15); // 0-15 minutes

      return {
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
          timestamp: location.timestamp,
          eta,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to fetch driver location',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get all driver locations (admin only)
   */
  @Get('locations')
  getAllDriverLocations() {
    return Array.from(this.driverLocations.values()).map((loc) => ({
      driverId: loc.driverId,
      rideId: loc.rideId,
      latitude: loc.latitude,
      longitude: loc.longitude,
      accuracy: loc.accuracy,
      timestamp: loc.timestamp,
    }));
  }
}
