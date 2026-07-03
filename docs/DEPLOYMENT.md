# Deployment Guide

Guides for deploying REHAN to production on Vercel, Firebase, and Netlify.

## Prerequisites

- Production Firebase project configured
- All API keys configured
- SSL certificate ready
- Domain name

## Option 1: Vercel + Firebase

### Frontend Deployment (Vercel)

1. **Push code to GitHub**
```bash
git add .
git commit -m "Production build"
git push origin main
```

2. **Connect to Vercel**
- Go to vercel.com
- Click "New Project"
- Import GitHub repository
- Select "Rehan" repository

3. **Configure Environment Variables**
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

4. **Deploy**
- Click "Deploy"
- Vercel auto-deploys on push

### Backend Deployment (Firebase Functions)

1. **Initialize Firebase Functions**
```bash
cd backend
firebase init functions
```

2. **Configure functions**
```bash
cp .env.production .env
```

3. **Deploy**
```bash
firebase deploy --only functions
```

### Database Rules Deployment

1. **Deploy Firestore rules**
```bash
firebase deploy --only firestore:rules
```

2. **Deploy Storage rules**
```bash
firebase deploy --only storage
```

## Option 2: Firebase Hosting

### Build Frontend

```bash
cd frontend
npm run build
firebase init hosting
```

### Configure firebase.json

```json
{
  "hosting": {
    "public": ".next",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### Deploy

```bash
firebase deploy --only hosting
```

## Option 3: Netlify

### Frontend Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Production build"
git push origin main
```

2. **Connect to Netlify**
- Go to netlify.com
- Click "New site from Git"
- Select GitHub repository

3. **Configure Build**
- Build command: `npm run build`
- Publish directory: `.next`

4. **Set Environment Variables**
- Add all NEXT_PUBLIC_* variables

5. **Deploy**
- Netlify auto-deploys on push

### Configure Netlify Functions

Create `netlify/functions/api.ts` for backend routes.

## Custom Domain Setup

### Vercel

1. Go to Project Settings
2. Domains section
3. Add custom domain
4. Update DNS records

### Firebase Hosting

1. Go to Hosting settings
2. Connect domain
3. Follow DNS setup

### Netlify

1. Domain settings
2. Add custom domain
3. Update nameservers

## SSL/HTTPS

All platforms provide free SSL:
- Vercel: Automatic
- Firebase: Automatic
- Netlify: Automatic

## Environment Variables

### Production

```env
NODE_ENV=production
FIREBASE_PROJECT_ID=prod_project_id
JWT_SECRET=your_production_secret_key
OPENAI_API_KEY=sk_live_...
STRIPE_SECRET_KEY=sk_live_...
RAZORPAY_KEY_ID=production_key
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Database Backup

### Firebase Automated Backups

1. Go to Firestore
2. Backups & Restore
3. Create backup schedule

### Manual Backup

```bash
gcloud firestore export gs://your-bucket/backup-$(date +%Y%m%d-%H%M%S)
```

## Monitoring & Logging

### Firebase Console
- Performance Monitoring
- Cloud Logging
- Error Reporting
- Analytics

### Vercel Analytics
- Web Vitals
- Performance
- Error tracking

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
```

## Performance Optimization

### Frontend
- Image optimization
- Code splitting
- Lazy loading
- Caching headers

### Backend
- Database indexing
- API rate limiting
- Response compression
- Caching strategies

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set CSP headers
- [ ] Configure CORS
- [ ] Enable CSRF protection
- [ ] Update security rules
- [ ] Rotate API keys
- [ ] Enable audit logging
- [ ] Set up DDoS protection
- [ ] Enable backup
- [ ] Configure monitoring

## Rollback Plan

### Vercel
```bash
# Redeploy previous version
vercel --prod
```

### Firebase
```bash
# Redeploy from previous build
firebase deploy --force
```

## Support

For deployment issues:
- [Vercel Docs](https://vercel.com/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
- [Netlify Docs](https://docs.netlify.com/)
