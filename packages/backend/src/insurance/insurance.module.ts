import { Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { SupabaseService } from '../database/supabase.service';

@Module({
  controllers: [InsuranceController],
  providers: [InsuranceService, SupabaseService],
  exports: [InsuranceService],
})
export class InsuranceModule {}
