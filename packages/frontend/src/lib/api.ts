import {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ProviderApplication,
  RideBooking,
  CreateBookingRequest,
  BookingConfirmation,
  VerifyEligibilityRequest,
  VerifyEligibilityResponse,
  BenefitInfo
} from '@clear-path/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class APIClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('access_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('access_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${API_URL}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(response.accessToken);
    return response;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.request<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    this.setToken(response.accessToken);
    return response;
  }

  async logout() {
    this.clearToken();
  }

  // Provider endpoints
  async createProviderApplication(data: any): Promise<ProviderApplication> {
    return this.request('/api/providers/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProviderApplications(): Promise<ProviderApplication[]> {
    return this.request('/api/providers/applications', {
      method: 'GET',
    });
  }

  async submitProviderApplication(applicationId: string): Promise<ProviderApplication> {
    return this.request(`/api/providers/applications/${applicationId}/submit`, {
      method: 'POST',
    });
  }

  async getProvider(providerId: string) {
    return this.request(`/api/providers/${providerId}`, {
      method: 'GET',
    });
  }

  // Booking endpoints
  async createBooking(data: CreateBookingRequest): Promise<BookingConfirmation> {
    return this.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyRides(): Promise<RideBooking[]> {
    return this.request('/api/bookings/my-rides', {
      method: 'GET',
    });
  }

  async getRideByConfirmation(confirmationNumber: string): Promise<RideBooking> {
    return this.request(`/api/bookings/${confirmationNumber}`, {
      method: 'GET',
    });
  }

  // Insurance endpoints
  async verifyEligibility(data: VerifyEligibilityRequest): Promise<VerifyEligibilityResponse> {
    return this.request('/api/insurance/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBenefits(insuranceType: string, state: string): Promise<BenefitInfo | null> {
    return this.request(`/api/insurance/benefits/${insuranceType}/${state}`, {
      method: 'GET',
    });
  }

  // Admin endpoints
  async getAdminDashboard() {
    return this.request('/api/admin/dashboard', {
      method: 'GET',
    });
  }

  async getPendingApplications(): Promise<ProviderApplication[]> {
    return this.request('/api/admin/applications/pending', {
      method: 'GET',
    });
  }

  async approveApplication(applicationId: string): Promise<ProviderApplication> {
    return this.request(`/api/admin/applications/${applicationId}/approve`, {
      method: 'POST',
    });
  }

  async rejectApplication(applicationId: string, reason: string): Promise<ProviderApplication> {
    return this.request(`/api/admin/applications/${applicationId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/api/health', {
      method: 'GET',
    });
  }
}

export const apiClient = new APIClient();
