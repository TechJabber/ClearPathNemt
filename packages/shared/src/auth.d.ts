export type UserRole = 'admin' | 'provider' | 'patient' | 'driver';
export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    firstName?: string;
    lastName?: string;
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
    user: AuthUser;
}
export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}
export interface RegisterResponse {
    user: AuthUser;
    accessToken: string;
}
//# sourceMappingURL=auth.d.ts.map