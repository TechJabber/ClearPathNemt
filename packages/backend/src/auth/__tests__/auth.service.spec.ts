import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { SupabaseService } from '../../database/supabase.service';

describe('AuthService', () => {
  let service: AuthService;
  let supabaseService: jest.Mocked<SupabaseService>;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    // Mock dependencies
    supabaseService = {
      select: jest.fn(),
      insert: jest.fn(),
      findOne: jest.fn(),
    } as any;

    jwtService = {
      sign: jest.fn().mockReturnValue('mock_token'),
    } as any;

    configService = {} as any;

    service = new AuthService(supabaseService, jwtService, configService);
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      supabaseService.select.mockResolvedValue([]);
      supabaseService.insert.mockResolvedValue({
        id: 'user_123',
        email: 'test@example.com',
        role: 'patient',
      });

      const result = await service.register({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'patient',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe('test@example.com');
      expect(result.user.role).toBe('patient');
    });

    it('should throw ConflictException if user already exists', async () => {
      supabaseService.select.mockResolvedValue([{ id: 'user_123', email: 'test@example.com' }]);

      await expect(
        service.register({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'Test',
          lastName: 'User',
          role: 'patient',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should login successfully with correct credentials', async () => {
      const hashedPassword = await require('bcrypt').hash('password123', 10);

      supabaseService.select.mockResolvedValue([
        {
          id: 'user_123',
          email: 'test@example.com',
          password_hash: hashedPassword,
          role: 'patient',
          first_name: 'Test',
          last_name: 'User',
        },
      ]);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      supabaseService.select.mockResolvedValue([]);

      await expect(
        service.login({
          email: 'nonexistent@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with wrong password', async () => {
      supabaseService.select.mockResolvedValue([
        {
          id: 'user_123',
          email: 'test@example.com',
          password_hash: await require('bcrypt').hash('correctPassword', 10),
          role: 'patient',
        },
      ]);

      await expect(
        service.login({
          email: 'test@example.com',
          password: 'wrongPassword',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('validateUser', () => {
    it('should return user if found and active', async () => {
      supabaseService.findOne.mockResolvedValue({
        id: 'user_123',
        email: 'test@example.com',
        role: 'patient',
        is_active: true,
      });

      const result = await service.validateUser('user_123');

      expect(result).toBeDefined();
      expect(result?.email).toBe('test@example.com');
    });

    it('should return null if user not found', async () => {
      supabaseService.findOne.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent_123');

      expect(result).toBeNull();
    });

    it('should return null if user is inactive', async () => {
      supabaseService.findOne.mockResolvedValue({
        id: 'user_123',
        email: 'test@example.com',
        role: 'patient',
        is_active: false,
      });

      const result = await service.validateUser('user_123');

      expect(result).toBeNull();
    });
  });
});
