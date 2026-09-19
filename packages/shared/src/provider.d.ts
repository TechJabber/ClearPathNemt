export type USState = 'MA' | 'CT' | 'RI' | 'VT' | 'NH';
export type ProviderStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export interface ProviderProfile {
    id: string;
    userId: string;
    companyName: string;
    businessLicense: string;
    ein: string;
    status: ProviderStatus;
    address: string;
    city: string;
    state: USState;
    zipCode: string;
    phone: string;
    email: string;
    generalLiabilityInsurance: boolean;
    commercialAutoInsurance: boolean;
    workersCompInsurance: boolean;
    numberOfDrivers: number;
    averageVehicleAge: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface ProviderApplication {
    id: string;
    providerId?: string;
    companyName: string;
    businessLicense: string;
    ein: string;
    stateOfOperation: USState;
    primaryContactName: string;
    primaryContactEmail: string;
    primaryContactPhone: string;
    generalLiabilityInsurance: boolean;
    commercialAutoInsurance: boolean;
    workersCompInsurance: boolean;
    numberOfDrivers: number;
    averageVehicleAge: number;
    status: 'draft' | 'submitted' | 'approved' | 'rejected';
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Driver {
    id: string;
    providerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    licenseNumber: string;
    licenseExpiry: Date;
    backgroundCheckPassed: boolean;
    trainingCompleted: boolean;
    status: 'active' | 'inactive' | 'suspended';
}
export interface Vehicle {
    id: string;
    providerId: string;
    year: number;
    make: string;
    model: string;
    licensePlate: string;
    vin: string;
    inspectionExpiry: Date;
    insuranceExpiry: Date;
    wheelchairAccessible: boolean;
    status: 'active' | 'maintenance' | 'retired';
}
//# sourceMappingURL=provider.d.ts.map