import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../database/supabase.service';
import { ProviderProfile, ProviderApplication, USState } from '@clear-path/shared';
import { v4 as uuidv4 } from 'uuid';

interface ProviderRow {
  id: string;
  user_id: string;
  company_name: string;
  business_license: string;
  ein: string;
  state: string;
  address: string;
  city: string;
  zip_code: string;
  phone: string;
  email: string;
  website?: string;
  status: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

interface ProviderApplicationRow {
  id: string;
  provider_id: string;
  status: string;
  company_name: string;
  business_license: string;
  ein: string;
  state_of_operation: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  general_liability_insurance: boolean;
  commercial_auto_insurance: boolean;
  workers_comp_insurance: boolean;
  insurance_documents?: string[];
  number_of_drivers: number;
  average_vehicle_age: number;
  documents?: any[];
  submitted_at?: string;
  reviewed_at?: string;
  reviewed_by?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

@Injectable()
export class ProvidersService {
  constructor(private readonly supabase: SupabaseService) {}

  async createApplication(userId: string, input: any): Promise<ProviderApplication> {
    // Check if provider already exists
    const existingProviders = await this.supabase.select<ProviderRow>('providers', {
      user_id: userId,
    });

    if (existingProviders.length > 0) {
      throw new BadRequestException('Provider already exists for this user');
    }

    const providerId = uuidv4();
    const now = new Date().toISOString();

    // Create provider
    const provider = await this.supabase.insert<ProviderRow>('providers', {
      id: providerId,
      user_id: userId,
      company_name: input.companyName,
      business_license: input.businessLicense,
      ein: input.ein,
      state: input.state,
      address: input.address,
      city: input.city,
      zip_code: input.zipCode,
      phone: input.phone,
      email: input.email,
      website: input.website,
      status: 'pending',
      created_at: now,
      updated_at: now,
    });

    // Create application
    const application = await this.supabase.insert<ProviderApplicationRow>(
      'provider_applications',
      {
        id: uuidv4(),
        provider_id: provider.id,
        company_name: input.companyName,
        business_license: input.businessLicense,
        ein: input.ein,
        state_of_operation: input.state,
        primary_contact_name: input.primaryContactName,
        primary_contact_email: input.primaryContactEmail,
        primary_contact_phone: input.primaryContactPhone,
        general_liability_insurance: input.generalLiabilityInsurance || false,
        commercial_auto_insurance: input.commercialAutoInsurance || false,
        workers_comp_insurance: input.workersCompInsurance || false,
        number_of_drivers: input.numberOfDrivers,
        average_vehicle_age: input.averageVehicleAge,
        status: 'draft',
        created_at: now,
        updated_at: now,
      },
    );

    return this.mapApplicationRow(application);
  }

  async submitApplication(applicationId: string): Promise<ProviderApplication> {
    const applications = await this.supabase.select<ProviderApplicationRow>(
      'provider_applications',
      { id: applicationId },
    );

    if (applications.length === 0) {
      throw new NotFoundException('Application not found');
    }

    const updated = await this.supabase.update<ProviderApplicationRow>(
      'provider_applications',
      applicationId,
      {
        status: 'submitted',
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    );

    return this.mapApplicationRow(updated);
  }

  async getApplications(providerId?: string): Promise<ProviderApplication[]> {
    let applications: ProviderApplicationRow[];

    if (providerId) {
      applications = await this.supabase.select<ProviderApplicationRow>(
        'provider_applications',
        { provider_id: providerId },
      );
    } else {
      applications = await this.supabase.select<ProviderApplicationRow>(
        'provider_applications',
      );
    }

    return applications.map((app) => this.mapApplicationRow(app));
  }

  async approveApplication(applicationId: string, reviewedBy: string): Promise<ProviderApplication> {
    const applications = await this.supabase.select<ProviderApplicationRow>(
      'provider_applications',
      { id: applicationId },
    );

    if (applications.length === 0) {
      throw new NotFoundException('Application not found');
    }

    const app = applications[0];
    const now = new Date().toISOString();

    // Update application
    const updated = await this.supabase.update<ProviderApplicationRow>(
      'provider_applications',
      applicationId,
      {
        status: 'approved',
        reviewed_at: now,
        reviewed_by: reviewedBy,
        updated_at: now,
      },
    );

    // Update provider status
    const providers = await this.supabase.select<ProviderRow>('providers', {
      id: app.provider_id,
    });

    if (providers.length > 0) {
      await this.supabase.update<ProviderRow>('providers', providers[0].id, {
        status: 'approved',
        updated_at: now,
      });
    }

    return this.mapApplicationRow(updated);
  }

  async rejectApplication(
    applicationId: string,
    reviewedBy: string,
    rejectionReason: string,
  ): Promise<ProviderApplication> {
    const applications = await this.supabase.select<ProviderApplicationRow>(
      'provider_applications',
      { id: applicationId },
    );

    if (applications.length === 0) {
      throw new NotFoundException('Application not found');
    }

    const app = applications[0];
    const now = new Date().toISOString();

    // Update application
    const updated = await this.supabase.update<ProviderApplicationRow>(
      'provider_applications',
      applicationId,
      {
        status: 'rejected',
        reviewed_at: now,
        reviewed_by: reviewedBy,
        rejection_reason: rejectionReason,
        updated_at: now,
      },
    );

    // Update provider status
    const providers = await this.supabase.select<ProviderRow>('providers', {
      id: app.provider_id,
    });

    if (providers.length > 0) {
      await this.supabase.update<ProviderRow>('providers', providers[0].id, {
        status: 'rejected',
        rejection_reason: rejectionReason,
        updated_at: now,
      });
    }

    return this.mapApplicationRow(updated);
  }

  async getProvider(providerId: string): Promise<ProviderProfile | null> {
    const provider = await this.supabase.findOne<ProviderRow>('providers', providerId);
    return provider ? this.mapProviderRow(provider) : null;
  }

  private mapProviderRow(row: ProviderRow): ProviderProfile {
    return {
      id: row.id,
      userId: row.user_id,
      companyName: row.company_name,
      businessLicense: row.business_license,
      ein: row.ein,
      state: row.state as USState,
      address: row.address,
      city: row.city,
      phone: row.phone,
      email: row.email,
      website: row.website,
      status: row.status as any,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    } as any;
  }

  private mapApplicationRow(row: ProviderApplicationRow): ProviderApplication {
    return {
      id: row.id,
      providerId: row.provider_id,
      status: row.status as any,
      companyName: row.company_name,
      businessLicense: row.business_license,
      ein: row.ein,
      stateOfOperation: row.state_of_operation as any,
      primaryContactName: row.primary_contact_name,
      primaryContactEmail: row.primary_contact_email,
      primaryContactPhone: row.primary_contact_phone,
      generalLiabilityInsurance: row.general_liability_insurance,
      commercialAutoInsurance: row.commercial_auto_insurance,
      workersCompInsurance: row.workers_comp_insurance,
      insuranceDocuments: row.insurance_documents,
      numberOfDrivers: row.number_of_drivers,
      averageVehicleAge: row.average_vehicle_age,
      documents: row.documents,
      submittedAt: row.submitted_at ? new Date(row.submitted_at) : undefined,
      reviewedAt: row.reviewed_at ? new Date(row.reviewed_at) : undefined,
      reviewedBy: row.reviewed_by,
      rejectionReason: row.rejection_reason,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }
}
