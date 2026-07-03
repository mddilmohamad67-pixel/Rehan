import { create } from 'zustand';
import { User } from 'firebase/auth';

interface UserProfile {
  uid: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  role?: 'user' | 'admin' | 'moderator';
  subscription?: {
    plan: 'free' | 'basic' | 'pro' | 'enterprise';
    status: 'active' | 'cancelled' | 'expired';
  };
  credits?: {
    available: number;
    used: number;
    total: number;
  };
  createdAt?: Date;
}

interface AuthStore {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  userProfile: null,
  isLoading: false,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  setUserProfile: (profile) => set({ userProfile: profile }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () =>
    set({
      user: null,
      userProfile: null,
      isAuthenticated: false,
    }),
}));
