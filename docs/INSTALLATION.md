# Installation Guide

## Prerequisites

- **Node.js:** v18.0.0 or higher
- **npm/yarn:** Latest version
- **Git:** v2.0.0 or higher
- **Firebase Account:** Create at https://firebase.google.com/
- **API Keys:** OpenAI, Gemini, Stripe/Razorpay

## Step 1: Firebase Setup

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create Project"
3. Name: "REHAN"
4. Enable Google Analytics (optional)
5. Create project

### Enable Required Services

#### Authentication
1. Go to Authentication
2. Enable:
   - Email/Password
   - Google
   - Phone Number

#### Firestore Database
1. Go to Firestore Database
2. Create Database
3. Start in Production mode
4. Select region closest to you

#### Storage
1. Go to Storage
2. Create bucket
3. Accept default settings

#### Cloud Functions
1. Go to Functions
2. Set up deployment

#### Cloud Messaging
1. Go to Cloud Messaging
2. Generate credentials

### Get Firebase Credentials

1. Go to Project Settings ⚙️
2. Copy Web Config:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

3. Generate Service Account Key:
   - Go to Service Accounts tab
   - Click "Generate New Private Key"
   - Save JSON file securely

## Step 2: Clone Repository

```bash
git clone https://github.com/mddilmohamad67-pixel/Rehan.git
cd Rehan
```

## Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Configure Frontend .env.local

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_NAME=REHAN
```

### Start Frontend

```bash
npm run dev
# Frontend runs at http://localhost:3000
```

## Step 4: Backend Setup

```bash
cd ../backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Configure Backend .env

```env
NODE_ENV=development
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=7d

# AI Provider Keys
OPENAI_API_KEY=sk_test_...
GEMINI_API_KEY=...

# Payment Keys
STRIPE_SECRET_KEY=sk_test_...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...

APP_URL=http://localhost:3000
API_URL=http://localhost:5000
MAX_FILE_SIZE=52428800
```

### Get AI Provider Keys

#### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and save

#### Google Gemini
1. Go to https://aistudio.google.com/app/apikey
2. Create new API key
3. Copy and save

#### Stripe
1. Go to https://dashboard.stripe.com/apikeys
2. Copy Secret Key (starts with sk_test_)

#### Razorpay
1. Go to Dashboard → Settings → API Keys
2. Copy Key ID and Key Secret

### Start Backend

```bash
npm run dev
# Backend runs at http://localhost:5000
```

## Step 5: Verify Installation

```bash
# Frontend
Open http://localhost:3000 in browser

# Backend
curl http://localhost:5000/api/health
```

## Step 6: Database Initialization

The database is automatically initialized on first run. Collections created:

- users
- chats
- images
- videos
- credits
- subscriptions
- payments
- apiUsage
- activityLog
- notifications

## Troubleshooting

### Firebase Connection Error
- Verify Firebase credentials
- Check firebaserc configuration
- Ensure Firestore is enabled

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Configure Firebase Security Rules (see SECURITY.md)
2. Set up payment webhooks
3. Deploy to production
4. Configure custom domain
5. Set up monitoring and alerts

## Support

For issues, check:
- [Firebase Docs](https://firebase.google.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Express Docs](https://expressjs.com/)
