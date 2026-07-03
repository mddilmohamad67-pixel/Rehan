# REHAN - AI SaaS Platform

A production-ready, full-stack AI SaaS web application with Firebase integration, modern UI, and 20+ AI tools.

## 🚀 Features

### AI Tools (20+)
- AI Chat (GPT-like)
- Image Generation, Editing & Upscaling
- Video Generation & Editing
- Voice Generation & Speech to Text
- Music Generation
- Coding Assistant with Error Fixing
- Website Generator
- Logo Generator
- Presentation Generator
- PDF Chat & Document Generator
- Translation & Summarizer
- OCR & Resume Builder

### Authentication
- Firebase Authentication
- Google OAuth Login
- Email/Password Authentication
- Phone OTP Login
- Forgot Password Recovery
- User Profile Management
- Session Management

### Dashboard
- Recent Projects Overview
- AI Tools Library
- Credit Usage Analytics
- Real-time Usage Statistics
- Notifications Center
- Advanced Search
- Dark/Light Mode Toggle

### Admin Panel
- User Management (View, Edit, Delete, Ban)
- Credit System (Add/Remove Credits)
- API Key Management
- Analytics & Insights
- Broadcast Notifications
- Subscription Management
- Payment History
- Activity Logs
- Database Backup

### Payment Integration
- Razorpay
- Stripe
- PayPal

**Subscription Plans:**
- Free Tier
- Basic Plan
- Pro Plan
- Enterprise Plan

### Supported AI Providers
- OpenAI
- Google Gemini
- Anthropic Claude
- xAI Grok
- DeepSeek
- OpenRouter
- Stability AI
- Flux
- ElevenLabs
- Whisper API

### File Support
- Images (JPG, PNG, WEBP)
- Videos (MP4, MOV, AVI)
- Audio (MP3, WAV, OGG)
- PDF Documents
- Word Documents (DOCX)
- Text Files (TXT)

### Security Features
- Firebase Security Rules
- JWT Authentication
- Rate Limiting & Throttling
- Input Validation & Sanitization
- XSS Protection
- CSRF Protection
- Secure File Upload with Scanning
- HTTPS Only
- Environment Variable Protection

### Performance
- Image Optimization
- Lazy Loading
- Caching Strategies
- CDN Ready
- SEO Optimized
- Fast Page Load Times

### UI/UX
- Modern Glassmorphism Design
- Fully Responsive (Mobile, Tablet, Desktop)
- Smooth Animations
- Loading Effects
- Toast Notifications
- Dark Mode Support

## 📋 Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **API Client:** Axios + React Query
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Storage:** Firebase Storage
- **Functions:** Firebase Cloud Functions
- **Validation:** Joi/Zod

### Infrastructure
- **Hosting:** Firebase Hosting / Vercel / Netlify
- **Database:** Cloud Firestore
- **Storage:** Firebase Storage
- **Analytics:** Firebase Analytics
- **Monitoring:** Firebase Performance Monitoring
- **Notifications:** Firebase Cloud Messaging

## 📁 Project Structure

See individual README files in `frontend/`, `backend/`, and `database/` directories.

## 🛠️ Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Firebase Project configured
- API Keys for AI providers
- Payment API Keys

### Quick Start

1. **Clone Repository**
```bash
git clone https://github.com/mddilmohamad67-pixel/Rehan.git
cd Rehan
```

2. **Frontend Setup**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

3. **Backend Setup**
```bash
cd ../backend
npm install
cp .env.example .env
npm run dev
```

## 📚 Documentation

- [Installation Guide](./docs/INSTALLATION.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Security Guide](./docs/SECURITY.md)

## 🚀 Deployment

- **Vercel:** `vercel deploy`
- **Firebase:** `firebase deploy`
- **Netlify:** `netlify deploy`

## 📄 License

MIT License - see LICENSE file for details.
