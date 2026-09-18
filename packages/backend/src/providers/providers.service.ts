import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderEntity } from '../database/entities/provider.entity';
import { ProviderApplicationEntity } from '../database/entities/provider-application.entity';
import { ProviderProfile, ProviderApplication } from '@clear-path/shared';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ProviderEntity)
    private readonly providerRepository: Repository<ProviderEntity>,
    @InjectRepository(ProviderApplicationEntity)
    private readonly applicationRepository: Repository<ProviderApplicationEntity>,
  ) {}

  async createApplication(userId: string, input: any): Promise<ProviderApplication> {
    // Check if provider already exists
    const existingProvider = await this.providerRepository.findOne({
      where: { userId },
    });

    if (existingProvider) {
      throw new BadRequestException('Provider already exists for this user');
    }

    // Create provider
    const provider = this.providerRepository.create({
      userId,
      companyName: input.companyName,
      businessLicense: input.businessLicense,
      ein: input.ein,
      state: input.state,
      address: input.address,
      city: input.city,
      zipCode: input.zipCode,
      phone: input.phone,
      email: input.email,
      website: input.website,
      status: 'pending',
    });

    const savedProvider = await this.providerRepository.save(provider);

    // Create application
    const application = this.applicationRepository.create({
      providerId: savedProvider.id,
      companyName: input.companyName,
      businessLicense: input.businessLicense,
      ein: input.ein,
      stateOfOperation: input.state,
      primaryContactName: input.primaryContactName,
      primaryContactEmail: input.primaryContactEmail,
      primaryContactPhone: input.primaryContactPhone,
      generalLiabilityInsurance: input.generalLiabilityInsurance || false,
      commercialAutoInsurance: input.commercialAutoInsurance || false,
      workersCompInsurance: input.workersCompInsurance || false,
      numberOfDrivers: input.numberOfDrivers,
      averageVehicleAge: input.averageVehicleAge,
      status: 'draft',
    });

    return this.applicationRepository.save(application);
  }

  async submitApplication(applicationId: string): Promise<ProviderApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    application.status = 'submitted';
    application.submittedAt = new Date();

    return this.applicationRepository.save(application);
  }

  async getApplications(providerId?: string): Promise<ProviderApplication[]> {
    const query = this.applicationRepository.createQueryBuilder('app');

    if (providerId) {
      query.where('app.providerId = :providerId', { providerId });
    }

    return query.orderBy('app.createdAt', 'DESC').getMany();
  }

  async approveApplication(applicationId: string, reviewedBy: string): Promise<ProviderApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId },
      relations: ['provider'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    application.status = 'approved';
    application.reviewedAt = new Date();
    application.reviewedBy = reviewedBy;

    // Update provider status
    const provider = await this.providerRepository.findOne({
      where: { id: application.providerId },
    });

    if (provider) {
      provider.status = 'approved';
      await this.providerRepository.save(provider);
    }

    return this.applicationRepository.save(application);
  }

  async rejectApplication(
    applicationId: string,
    reviewedBy: string,
    rejectionReason: string,
  ): Promise<ProviderApplication> {
    const application = await this.applicationRepository.findOne({
      where: { id: applicationId },
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    application.status = 'rejected';
    application.reviewedAt = new Date();
    application.reviewedBy = reviewedBy;
    application.rejectionReason = rejectionReason;

    // Update provider status
    const provider = await this.providerRepository.findOne({
      where: { id: application.providerId },
    });

    if (provider) {
      provider.status = 'rejected';
      provider.rejectionReason = rejectionReason;
      await this.providerRepository.save(provider);
    }

    return this.applicationRepository.save(application);
  }

  async getProvider(providerId: string): Promise<ProviderProfile | null> {
    return this.providerRepository.findOne({
      where: { id: providerId },
    });
  }
}
