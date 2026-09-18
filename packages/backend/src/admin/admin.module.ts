import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ProvidersModule } from '../providers/providers.module';
import { SupabaseService } from '../database/supabase.service';

@Module({
  imports: [ProvidersModule],
  controllers: [AdminController],
  providers: [AdminService, SupabaseService],
})
export class AdminModule {}
