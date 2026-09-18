import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AuthUser, LoginRequest, RegisterRequest } from '@clear-path/shared';
import { apiClient } from '../lib/api';

interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from storage on mount
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    if (token && userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (err) {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
      }
    }
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.login(data);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      router.push('/patient/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const register = useCallback(async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.register(data);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect based on role
      const roleRedirects: Record<string, string> = {
        patient: '/patient/dashboard',
        provider: '/provider/dashboard',
        driver: '/driver/dashboard',
        admin: '/admin/dashboard',
      };

      const redirectPath = roleRedirects[response.user.role] || '/';
      router.push(redirectPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    apiClient.logout();
    router.push('/');
  }, [router]);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
}
