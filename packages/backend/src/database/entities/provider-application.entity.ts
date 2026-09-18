import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProviderEntity } from './provider.entity';

@Entity('provider_applications')
export class ProviderApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  providerId: string;

  @ManyToOne(() => ProviderEntity)
  @JoinColumn({ name: 'providerId' })
  provider: ProviderEntity;

  @Column({
    type: 'varchar',
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft',
  })
  status: 'draft' | 'submitted' | 'approved' | 'rejected';

  @Column({ type: 'varchar' })
  companyName: string;

  @Column({ type: 'varchar' })
  businessLicense: string;

  @Column({ type: 'varchar' })
  ein: string;

  @Column({ type: 'varchar' })
  stateOfOperation: string;

  @Column({ type: 'varchar' })
  primaryContactName: string;

  @Column({ type: 'varchar' })
  primaryContactEmail: string;

  @Column({ type: 'varchar' })
  primaryContactPhone: string;

  @Column({ type: 'boolean' })
  generalLiabilityInsurance: boolean;

  @Column({ type: 'boolean' })
  commercialAutoInsurance: boolean;

  @Column({ type: 'boolean' })
  workersCompInsurance: boolean;

  @Column({ type: 'simple-array', nullable: true })
  insuranceDocuments?: string[];

  @Column({ type: 'integer' })
  numberOfDrivers: number;

  @Column({ type: 'integer' })
  averageVehicleAge: number;

  @Column({ type: 'jsonb', nullable: true })
  documents?: any[];

  @Column({ type: 'timestamp', nullable: true })
  submittedAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  reviewedAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  reviewedBy?: string;

  @Column({ type: 'text', nullable: true })
  rejectionReason?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
