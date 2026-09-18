import { Controller, Post, Get, Body, UseGuards, Request, HttpStatus, HttpCode, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CreateBookingRequest, BookingConfirmation, RideBooking } from '@clear-path/shared';

@ApiTags('bookings')
@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new ride booking' })
  @ApiResponse({ status: 201, description: 'Booking created' })
  async createBooking(
    @Request() req: any,
    @Body() input: CreateBookingRequest,
  ): Promise<BookingConfirmation> {
    return this.bookingsService.createBooking(req.user.id, input);
  }

  @Get('my-rides')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user rides' })
  async getMyRides(@Request() req: any): Promise<RideBooking[]> {
    return this.bookingsService.getPatientRides(req.user.id);
  }

  @Get(':confirmationNumber')
  @ApiOperation({ summary: 'Get ride by confirmation number' })
  async getRideByConfirmation(@Param('confirmationNumber') confirmationNumber: string) {
    return this.bookingsService.getRideByConfirmationNumber(confirmationNumber);
  }
}
