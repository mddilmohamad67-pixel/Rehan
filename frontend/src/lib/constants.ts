// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  // Users
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    SETTINGS: '/users/settings',
  },
  // Tools
  TOOLS: {
    CHAT: '/tools/chat',
    IMAGE_GENERATION: '/tools/image-generation',
    IMAGE_EDITING: '/tools/image-editing',
    SPEECH_TO_TEXT: '/tools/speech-to-text',
    TEXT_TO_SPEECH: '/tools/text-to-speech',
    VIDEO_GENERATION: '/tools/video-generation',
    CODE_ASSISTANT: '/tools/code-assistant',
  },
  // Credits
  CREDITS: {
    BALANCE: '/credits/balance',
    HISTORY: '/credits/history',
  },
  // Payments
  PAYMENTS: {
    SUBSCRIBE: '/payments/subscribe',
    CANCEL_SUBSCRIPTION: '/payments/cancel-subscription',
    PAYMENT_HISTORY: '/payments/history',
  },
  // Admin
  ADMIN: {
    USERS: '/admin/users',
    ANALYTICS: '/admin/analytics',
  },
};

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    credits: 10,
    monthlyRequests: 100,
    features: ['Basic AI Tools', 'Limited Credits', 'Email Support'],
  },
  BASIC: {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    credits: 100,
    monthlyRequests: 1000,
    features: ['All Basic Tools', '100 Credits/Month', 'Priority Support'],
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    credits: 500,
    monthlyRequests: 5000,
    features: ['All Pro Tools', '500 Credits/Month', 'Priority Support', 'API Access'],
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    credits: 2000,
    monthlyRequests: 50000,
    features: [
      'All Features',
      'Unlimited Credits',
      'Dedicated Support',
      'Custom Integrations',
    ],
  },
};

// AI Models
export const AI_MODELS = {
  CHAT: ['gpt-4', 'gpt-3.5-turbo', 'gemini-pro', 'claude-3-opus'],
  IMAGE: ['dall-e-3', 'dall-e-2', 'stable-diffusion-xl', 'flux'],
  VOICE: ['elevenlabs', 'google-tts', 'azure-tts'],
  SPEECH: ['whisper', 'google-speech', 'deepgram'],
  VIDEO: ['runway', 'synthesia', 'heygen'],
};

// File Upload Config
export const FILE_CONFIG = {
  MAX_SIZE: 52428800, // 50MB
  ALLOWED_TYPES: {
    image: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    video: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    document: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
  },
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'An error occurred',
  LOADING: 'Loading...',
  UNAUTHORIZED: 'You are not authorized',
};
