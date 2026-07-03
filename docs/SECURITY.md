# Security Best Practices & Configuration

## Firebase Security Rules

### Firestore Rules (firestore.rules)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users Collection
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
      allow read: if request.auth.uid != null && resource.data.public == true;
    }

    // Chat History
    match /chats/{document=**} {
      allow read, write: if request.auth.uid != null;
      allow delete: if request.auth.uid == resource.data.userId;
    }

    // Images
    match /images/{document=**} {
      allow read, write: if request.auth.uid != null;
    }

    // Admin Collection
    match /admin/{document=**} {
      allow read, write: if isAdmin();
    }

    // Helper functions
    function isAdmin() {
      return request.auth.uid != null &&
             get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    function isOwner(uid) {
      return request.auth.uid == uid;
    }
  }
}
```

### Storage Rules (storage.rules)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User uploads
    match /users/{uid}/{allPaths=**} {
      allow read, write: if request.auth.uid == uid;
      allow write: if request.resource.size < 52428800; // 50MB
      allow write: if request.resource.contentType in [
        'image/jpeg',
        'image/png',
        'image/webp',
        'video/mp4',
        'audio/mpeg',
        'application/pdf'
      ];
    }

    // Public assets
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid != null;
    }
  }
}
```

## Authentication Security

### Email Verification
```typescript
// Force email verification
await user.sendEmailVerification();
```

### Password Requirements
- Minimum 8 characters
- Mix of uppercase, lowercase, numbers, symbols
- No common passwords
- Password history

### JWT Tokens
```typescript
const token = jwt.sign(
  { uid, email, role },
  process.env.JWT_SECRET,
  { expiresIn: '7d', algorithm: 'HS256' }
);
```

## API Security

### Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use(limiter);
```

### CORS Configuration
```typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.NEXT_PUBLIC_API_URL,
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### Helmet Middleware
```typescript
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
  }
}));
```

## Input Validation

### Zod Schema Example
```typescript
import { z } from 'zod';

const createChatSchema = z.object({
  message: z.string().min(1).max(5000),
  model: z.enum(['gpt-4', 'gpt-3.5-turbo']),
  temperature: z.number().min(0).max(2),
});

app.post('/api/chat', (req, res) => {
  const validated = createChatSchema.parse(req.body);
  // Process validated data
});
```

## File Upload Security

### Validation
```typescript
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'video/mp4',
  'audio/mpeg',
  'application/pdf'
];

const MAX_FILE_SIZE = 52428800; // 50MB

function validateFile(file: Express.Multer.File) {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new Error('Invalid file type');
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File too large');
  }
}
```

### Virus Scanning
```typescript
// Integrate with ClamAV or VirusTotal
import NodeClam from 'clamscan';

const clamscan = new NodeClam().init({});
const { isInfected } = await clamscan.scanFile(filePath);
```

## Data Protection

### Encryption at Rest
- Firebase encrypts data by default
- Use Cloud KMS for additional protection

### Encryption in Transit
- HTTPS only
- TLS 1.2 minimum
- Certificate pinning (optional)

### PII Protection
```typescript
// Hash sensitive data
import bcrypt from 'bcryptjs';

const hashedEmail = await bcrypt.hash(email, 10);
```

## Environment Variables

### Never Commit Secrets
```bash
# .gitignore
.env
.env.local
.env.*.local
```

### Vault for Secrets
- Use Firebase Secret Manager
- GitHub Secrets for CI/CD
- HashiCorp Vault for production

## Logging & Monitoring

### Security Logging
```typescript
logger.info('User login', {
  uid: user.uid,
  timestamp: new Date(),
  ip: req.ip,
  userAgent: req.get('user-agent')
});

logger.warn('Failed login attempt', {
  email: req.body.email,
  attempts: attempts + 1
});
```

### Alert Rules
- Multiple failed login attempts
- Unusual API usage
- Large data exports
- Permission changes
- Admin actions

## DDoS Protection

### Cloudflare Integration
1. Add DNS records to Cloudflare
2. Enable DDoS protection
3. Set up rate limiting rules
4. Enable WAF

### Application Level
- Rate limiting
- Request throttling
- IP whitelisting
- Geographic blocking

## Regular Security Audits

### Weekly
- [ ] Review security logs
- [ ] Check for failed authentications
- [ ] Monitor API usage

### Monthly
- [ ] Security dependency updates
- [ ] Access review
- [ ] Firewall rule audit

### Quarterly
- [ ] Full security audit
- [ ] Penetration testing
- [ ] Compliance review

### Annually
- [ ] Third-party security audit
- [ ] Policy update
- [ ] Training refresh

## Incident Response

### Breach Procedure
1. Identify scope
2. Contain breach
3. Notify users
4. Investigate cause
5. Implement fixes
6. Monitor for recurrence

## Compliance

### GDPR
- User consent for data collection
- Right to access data
- Right to deletion
- Data portability

### Privacy Policy
- Clear data usage
- Third-party services
- Cookie policy
- Contact information

## Security Checklist

- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] XSS protection enabled
- [ ] CSRF tokens used
- [ ] SQL injection prevention
- [ ] Secure file upload
- [ ] Audit logging enabled
- [ ] Regular backups
- [ ] Incident response plan
- [ ] Privacy policy current
- [ ] Security training done
- [ ] Dependencies updated
