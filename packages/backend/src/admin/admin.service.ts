import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { SupabaseService } from '../database/supabase.service';
import { ProvidersService } from '../providers/providers.service';
import { AuthUser } from '@clear-path/shared';

@Injectable()
export class AdminService {
  private logger = new Logger(AdminService.name);

  constructor(
    private readonly supabase: SupabaseService,
    private readonly providersService: ProvidersService,
  ) {}

  validateAdminAccess(user: AuthUser): void {
    if (user.role !== 'admin') {
      this.logger.warn(`Unauthorized admin access attempt by ${user.email}`);
      throw new ForbiddenException('Admin access required');
    }
  }

  async getDashboardStats(adminUser: AuthUser) {
    this.validateAdminAccess(adminUser);

    try {
      // Get provider statistics
      const providers = await this.supabase.select('providers');
      const applications = await this.supabase.select('provider_applications');
      const rides = await this.supabase.select('rides');
      const users = await this.supabase.select('users');

      const approvedProviders = providers.filter((p: any) => p.status === 'approved');
      const pendingApplications = applications.filter((a: any) => a.status === 'draft');
      const submittedApplications = applications.filter((a: any) => a.status === 'submitted');
      const completedRides = rides.filter((r: any) => r.status === 'completed');

      return {
        totalProviders: providers.length,
        approvedProviders: approvedProviders.length,
        totalApplications: applications.length,
        pendingApplications: pendingApplications.length,
        submittedApplications: submittedApplications.length,
        totalUsers: users.length,
        totalRides: rides.length,
        completedRides: completedRides.length,
        timestamp: new Date(),
      };
    } catch (error) {
      this.logger.error('Failed to get dashboard stats', error);
      throw error;
    }
  }

  async getPendingApplications(adminUser: AuthUser) {
    this.validateAdminAccess(adminUser);

    try {
      return await this.providersService.getApplications();
    } catch (error) {
      this.logger.error('Failed to get pending applications', error);
      throw error;
    }
  }

  async approveProvider(adminUser: AuthUser, applicationId: string) {
    this.validateAdminAccess(adminUser);

    try {
      return await this.providersService.approveApplication(applicationId, adminUser.id);
    } catch (error) {
      this.logger.error('Failed to approve provider', error);
      throw error;
    }
  }

  async rejectProvider(adminUser: AuthUser, applicationId: string, reason: string) {
    this.validateAdminAccess(adminUser);

    try {
      return await this.providersService.rejectApplication(
        applicationId,
        adminUser.id,
        reason,
      );
    } catch (error) {
      this.logger.error('Failed to reject provider', error);
      throw error;
    }
  }

  async getAllRides(adminUser: AuthUser, filters?: any) {
    this.validateAdminAccess(adminUser);

    try {
      let rides = await this.supabase.select('rides');

      if (filters?.status) {
        rides = rides.filter((r: any) => r.status === filters.status);
      }

      if (filters?.state) {
        rides = rides.filter((r: any) => r.pickup_state === filters.state);
      }

      return rides;
    } catch (error) {
      this.logger.error('Failed to get rides', error);
      throw error;
    }
  }
}
