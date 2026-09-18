import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { SupabaseService } from '../database/supabase.service';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, SupabaseService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
