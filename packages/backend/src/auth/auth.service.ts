import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseService } from '../database/supabase.service';
import { AuthUser, LoginRequest, LoginResponse, RegisterRequest } from '@clear-path/shared';

interface UserRow {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  first_name?: string;
  last_name?: string;
  company_name?: string;
  is_active: boolean;
  created_at: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(input: RegisterRequest): Promise<LoginResponse> {
    // Check if user exists
    const existingUsers = await this.supabase.select<UserRow>('users', {
      email: input.email,
    });

    if (existingUsers.length > 0) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(input.password, 10);

    // Create user
    const userId = uuidv4();
    const user = await this.supabase.insert<UserRow>('users', {
      id: userId,
      email: input.email,
      password_hash: passwordHash,
      role: input.role || 'patient',
      first_name: input.firstName,
      last_name: input.lastName,
      company_name: input.companyName,
      is_active: true,
      created_at: new Date().toISOString(),
    });

    // Generate tokens
    const tokens = this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role as any,
        firstName: user.first_name,
        lastName: user.last_name,
        companyName: user.company_name,
      },
    };
  }

  async login(input: LoginRequest): Promise<LoginResponse> {
    const users = await this.supabase.select<UserRow>('users', {
      email: input.email,
    });

    if (users.length === 0) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const user = users[0];
    const passwordValid = await bcrypt.compare(input.password, user.password_hash);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role as any,
        firstName: user.first_name,
        lastName: user.last_name,
        companyName: user.company_name,
      },
    };
  }

  async validateUser(userId: string): Promise<AuthUser | null> {
    const user = await this.supabase.findOne<UserRow>('users', userId);

    if (!user || !user.is_active) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role as any,
      firstName: user.first_name,
      lastName: user.last_name,
      companyName: user.company_name,
    };
  }

  private generateTokens(user: UserRow): { accessToken: string; refreshToken: string } {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: '24h',
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
