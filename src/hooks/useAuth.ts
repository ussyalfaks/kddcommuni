import { create } from 'zustand';
import { adminApi } from '../lib/api';

interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'moderator';
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (email: string, password: string) => {
    try {
      const { token, user } = await adminApi.login(email, password);
      localStorage.setItem('adminToken', token);
      set({ isAuthenticated: true, user });
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  },
  register: async (email: string, password: string) => {
    try {
      const { token, user } = await adminApi.register(email, password);
      localStorage.setItem('adminToken', token);
      set({ isAuthenticated: true, user });
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
  logout: () => {
    localStorage.removeItem('adminToken');
    set({ isAuthenticated: false, user: null });
  },
}));