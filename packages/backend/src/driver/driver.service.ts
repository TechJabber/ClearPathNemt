import { Injectable } from '@nestjs/common';

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  vehicleId: string;
}

@Injectable()
export class DriverService {
  private drivers: Map<string, Driver> = new Map([
    [
      'driver_001',
      {
        id: 'driver_001',
        name: 'John Smith',
        email: 'driver@clearpath.com',
        phone: '(617) 555-0100',
        licenseNumber: 'MA123456',
        vehicleId: 'vehicle_001',
      },
    ],
  ]);

  getDriver(driverId: string): Driver | undefined {
    return this.drivers.get(driverId);
  }

  getAllDrivers(): Driver[] {
    return Array.from(this.drivers.values());
  }

  createDriver(driver: Driver): Driver {
    this.drivers.set(driver.id, driver);
    return driver;
  }

  updateDriver(driverId: string, updates: Partial<Driver>): Driver | undefined {
    const driver = this.drivers.get(driverId);
    if (!driver) return undefined;

    const updated = { ...driver, ...updates };
    this.drivers.set(driverId, updated);
    return updated;
  }
}
