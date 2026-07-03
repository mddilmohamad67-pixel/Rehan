export interface User {
  uid: string;
  email: string;
  fullName: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  subscription: Subscription;
  credits: Credits;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  autoRenew: boolean;
}

export interface Credits {
  available: number;
  used: number;
  total: number;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailUpdates: boolean;
  twoFactorEnabled: boolean;
}

export interface Chat {
  id: string;
  userId: string;
  title: string;
  model: string;
  messages: ChatMessage[];
  tokensUsed: number;
  creditsDeducted: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokensUsed?: number;
}

export interface GeneratedImage {
  id: string;
  userId: string;
  title: string;
  prompt: string;
  model: string;
  url: string;
  thumbnailUrl: string;
  size: string;
  creditsDeducted: number;
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
}

export interface VideoGeneration {
  id: string;
  userId: string;
  title: string;
  prompt: string;
  model: string;
  url?: string;
  duration: number;
  resolution: string;
  fps: number;
  creditsDeducted: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending' | 'refunded';
  method: 'stripe' | 'razorpay' | 'paypal';
  purpose: 'subscription' | 'credits' | 'refund';
  createdAt: Date;
  completedAt?: Date;
}

export interface ApiUsage {
  id: string;
  userId: string;
  endpoint: string;
  method: string;
  status: number;
  responseTime: number;
  provider: string;
  model: string;
  tokensUsed: number;
  creditsDeducted: number;
  timestamp: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  category: string;
  description: string;
  metadata: Record<string, any>;
  timestamp: Date;
}
