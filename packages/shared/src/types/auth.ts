/**
 * Authentication & Authorization Types
 * Used across backend (JWT verification) and frontend (auth context)
 */

export type UserRole = 'admin' | 'provider' | 'patient' | 'driver';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  iat?: number;
  exp?: number;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  companyName?: string;
}

export interface AuthError {
  statusCode: number;
  message: string;
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'TOKEN_EXPIRED';
}
