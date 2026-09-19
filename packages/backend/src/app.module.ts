import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProvidersModule } from './providers/providers.module';
import { BookingsModule } from './bookings/bookings.module';
import { InsuranceModule } from './insurance/insurance.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';
import { DriverModule } from './driver/driver.module';
import { SupabaseService } from './database/supabase.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    HealthModule,
    AuthModule,
    DriverModule,
    ProvidersModule,
    BookingsModule,
    InsuranceModule,
    AdminModule,
  ],
  providers: [SupabaseService],
})
export class AppModule {}
