-- Clear Path NEMT - Database Schema (Supabase PostgreSQL)
-- Phase 1-4 Complete Implementation

-- ============================================================================
-- PHASE 1: Authentication & Provider Management
-- ============================================================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('admin', 'provider', 'patient', 'driver')),
  first_name VARCHAR,
  last_name VARCHAR,
  company_name VARCHAR,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  email_verification_token VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- Providers table
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR NOT NULL,
  business_license VARCHAR NOT NULL,
  ein VARCHAR NOT NULL,
  state VARCHAR NOT NULL CHECK (state IN ('MA', 'CT', 'RI', 'VT', 'NH')),
  address VARCHAR NOT NULL,
  city VARCHAR NOT NULL,
  zip_code VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  website VARCHAR,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_providers_user_id ON providers(user_id);
CREATE INDEX idx_providers_state ON providers(state);
CREATE INDEX idx_providers_status ON providers(status);

-- Provider Applications table
CREATE TABLE IF NOT EXISTS provider_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'approved', 'rejected')),
  company_name VARCHAR NOT NULL,
  business_license VARCHAR NOT NULL,
  ein VARCHAR NOT NULL,
  state_of_operation VARCHAR NOT NULL,
  primary_contact_name VARCHAR NOT NULL,
  primary_contact_email VARCHAR NOT NULL,
  primary_contact_phone VARCHAR NOT NULL,
  general_liability_insurance BOOLEAN DEFAULT false,
  commercial_auto_insurance BOOLEAN DEFAULT false,
  workers_comp_insurance BOOLEAN DEFAULT false,
  insurance_documents TEXT[],
  number_of_drivers INTEGER,
  average_vehicle_age INTEGER,
  documents JSONB,
  submitted_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES users(id),
  rejection_reason TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_provider_applications_provider_id ON provider_applications(provider_id);
CREATE INDEX idx_provider_applications_status ON provider_applications(status);

-- ============================================================================
-- PHASE 2: Patient Portal & Ride Booking
-- ============================================================================

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE,
  phone VARCHAR,
  emergency_contact_name VARCHAR,
  emergency_contact_phone VARCHAR,
  mobility_assistance_needed BOOLEAN DEFAULT false,
  accessibility_notes TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_patients_user_id ON patients(user_id);

-- Drivers table
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  license_number VARCHAR,
  license_state VARCHAR,
  license_expiration DATE,
  background_check_status VARCHAR DEFAULT 'pending' CHECK (background_check_status IN ('pending', 'passed', 'failed')),
  background_check_date TIMESTAMP,
  status VARCHAR DEFAULT 'pending_approval' CHECK (status IN ('active', 'inactive', 'pending_approval', 'suspended')),
  rating NUMERIC(3,2),
  total_rides INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_drivers_user_id ON drivers(user_id);
CREATE INDEX idx_drivers_provider_id ON drivers(provider_id);
CREATE INDEX idx_drivers_status ON drivers(status);

-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL REFERENCES drivers(id) ON DELETE CASCADE,
  vin VARCHAR UNIQUE,
  make VARCHAR,
  model VARCHAR,
  year INTEGER,
  license_plate VARCHAR,
  mileage INTEGER,
  condition VARCHAR,
  wheelchair_accessible BOOLEAN DEFAULT false,
  lift_equipped BOOLEAN DEFAULT false,
  last_inspection_date DATE,
  insurance_expiration DATE,
  status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_vehicles_driver_id ON vehicles(driver_id);
CREATE INDEX idx_vehicles_status ON vehicles(status);

-- Rides/Bookings table
CREATE TABLE IF NOT EXISTS rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES providers(id),
  driver_id UUID REFERENCES drivers(id),
  vehicle_id UUID REFERENCES vehicles(id),

  -- Pickup details
  pickup_address VARCHAR NOT NULL,
  pickup_city VARCHAR NOT NULL,
  pickup_state VARCHAR NOT NULL,
  pickup_zip VARCHAR NOT NULL,
  pickup_latitude NUMERIC(10, 8),
  pickup_longitude NUMERIC(11, 8),

  -- Dropoff details
  dropoff_address VARCHAR NOT NULL,
  dropoff_city VARCHAR NOT NULL,
  dropoff_state VARCHAR NOT NULL,
  dropoff_zip VARCHAR NOT NULL,
  dropoff_latitude NUMERIC(10, 8),
  dropoff_longitude NUMERIC(11, 8),

  -- Scheduling
  scheduled_time TIMESTAMP NOT NULL,
  actual_pickup_time TIMESTAMP,
  actual_dropoff_time TIMESTAMP,
  estimated_duration INTEGER,
  actual_duration INTEGER,
  estimated_distance NUMERIC(6, 2),
  actual_distance NUMERIC(6, 2),

  -- Ride details
  ride_type VARCHAR NOT NULL CHECK (ride_type IN ('medical_appointment', 'dialysis', 'physical_therapy', 'specialist_visit', 'other')),
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  notes TEXT,
  cancellation_reason TEXT,
  cancelled_by UUID REFERENCES users(id),

  -- Insurance
  membership_id VARCHAR,
  insurance_type VARCHAR CHECK (insurance_type IN ('masshealth', 'medicare', 'medicaid', 'private')),

  -- Confirmation
  confirmation_number VARCHAR UNIQUE,

  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_rides_patient_id ON rides(patient_id);
CREATE INDEX idx_rides_provider_id ON rides(provider_id);
CREATE INDEX idx_rides_driver_id ON rides(driver_id);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_scheduled_time ON rides(scheduled_time);
CREATE INDEX idx_rides_confirmation_number ON rides(confirmation_number);

-- ============================================================================
-- PHASE 3: Insurance & Benefits
-- ============================================================================

-- Insurance Info table
CREATE TABLE IF NOT EXISTS insurance_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  insurance_type VARCHAR NOT NULL CHECK (insurance_type IN ('masshealth', 'medicare', 'medicaid', 'private')),
  member_id VARCHAR NOT NULL,
  group_number VARCHAR,
  effective_date DATE,
  termination_date DATE,
  state VARCHAR NOT NULL CHECK (state IN ('MA', 'CT', 'RI', 'VT', 'NH')),
  verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP,
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_insurance_info_patient_id ON insurance_info(patient_id);
CREATE INDEX idx_insurance_info_member_id ON insurance_info(member_id);

-- Eligibility Checks table
CREATE TABLE IF NOT EXISTS eligibility_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  member_id VARCHAR NOT NULL,
  insurance_type VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'eligible' CHECK (status IN ('eligible', 'ineligible', 'pending', 'error')),
  eligible BOOLEAN,
  coverage_type VARCHAR,
  copay NUMERIC(6, 2),
  coinsurance NUMERIC(5, 2),
  deductible NUMERIC(8, 2),
  deductible_met NUMERIC(8, 2),
  authorization_required BOOLEAN DEFAULT false,
  authorization_status VARCHAR,
  authorization_referral_number VARCHAR,
  checked_at TIMESTAMP DEFAULT now(),
  expires_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_eligibility_checks_patient_id ON eligibility_checks(patient_id);
CREATE INDEX idx_eligibility_checks_expires_at ON eligibility_checks(expires_at);

-- Benefit Info table
CREATE TABLE IF NOT EXISTS benefit_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  insurance_type VARCHAR NOT NULL CHECK (insurance_type IN ('masshealth', 'medicare', 'medicaid', 'private')),
  state VARCHAR NOT NULL CHECK (state IN ('MA', 'CT', 'RI', 'VT', 'NH')),
  coverage_type VARCHAR NOT NULL,
  max_rides_per_month INTEGER,
  rides_covered TEXT[],
  restrictions TEXT[],
  copay NUMERIC(6, 2),
  coinsurance NUMERIC(5, 2),
  deductible NUMERIC(8, 2),
  requires_authorization BOOLEAN DEFAULT false,
  documentation_required TEXT[],
  title TEXT,
  description TEXT,
  process TEXT[],
  faq_items JSONB,
  contact_info JSONB,
  last_updated TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_benefit_info_insurance_state ON benefit_info(insurance_type, state);

-- Claims table
CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
  patient_id UUID NOT NULL REFERENCES patients(id),
  provider_id UUID REFERENCES providers(id),
  insurance_type VARCHAR NOT NULL,
  member_id VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'accepted', 'paid', 'denied')),
  amount_claimed NUMERIC(10, 2),
  amount_allowed NUMERIC(10, 2),
  amount_paid NUMERIC(10, 2),
  denial_reason TEXT,
  submitted_date TIMESTAMP,
  paid_date TIMESTAMP,
  documents TEXT[],
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_claims_ride_id ON claims(ride_id);
CREATE INDEX idx_claims_patient_id ON claims(patient_id);
CREATE INDEX idx_claims_status ON claims(status);

-- ============================================================================
-- PHASE 4: Admin & System
-- ============================================================================

-- Audit Log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR NOT NULL,
  entity_type VARCHAR NOT NULL,
  entity_id VARCHAR,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR UNIQUE NOT NULL,
  value JSONB,
  updated_by UUID REFERENCES users(id),
  updated_at TIMESTAMP DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL,
  subject VARCHAR,
  message TEXT,
  related_entity_type VARCHAR,
  related_entity_id VARCHAR,
  read BOOLEAN DEFAULT false,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- ============================================================================
-- Row Level Security (RLS) Policies
-- ============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;

-- Patients can only see their own data
CREATE POLICY "Patients view own data" ON patients
  FOR SELECT USING (auth.uid()::uuid = user_id OR auth.jwt() ->> 'role' = 'admin');

-- Patients can only see their own rides
CREATE POLICY "Patients view own rides" ON rides
  FOR SELECT USING (
    auth.uid()::uuid IN (
      SELECT user_id FROM patients WHERE id = patient_id
    ) OR auth.jwt() ->> 'role' = 'admin'
  );

-- ============================================================================
-- Timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON providers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON rides
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON drivers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_insurance_info_updated_at BEFORE UPDATE ON insurance_info
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_claims_updated_at BEFORE UPDATE ON claims
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
