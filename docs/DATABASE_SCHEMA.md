# Database Schema

## Collections Overview

### Users
```json
{
  "uid": "user_123",
  "email": "user@example.com",
  "fullName": "John Doe",
  "avatar": "https://storage.googleapis.com/...",
  "phone": "+1234567890",
  "role": "user", // user, admin, moderator
  "subscription": {
    "plan": "pro", // free, basic, pro, enterprise
    "status": "active", // active, cancelled, expired
    "startDate": "2024-01-01",
    "endDate": "2024-02-01",
    "autoRenew": true
  },
  "credits": {
    "available": 100,
    "used": 50,
    "total": 150
  },
  "settings": {
    "theme": "dark",
    "notifications": true,
    "emailUpdates": false,
    "twoFactorEnabled": false
  },
  "status": "active", // active, banned, suspended
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "lastLoginAt": "2024-01-01T00:00:00Z",
  "loginHistory": [
    {
      "timestamp": "2024-01-01T00:00:00Z",
      "ipAddress": "192.168.1.1",
      "device": "Chrome on Windows"
    }
  ]
}
```

### Chats
```json
{
  "id": "chat_123",
  "userId": "user_123",
  "title": "My First Chat",
  "model": "gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "What is AI?",
      "timestamp": "2024-01-01T00:00:00Z"
    },
    {
      "role": "assistant",
      "content": "AI stands for...",
      "timestamp": "2024-01-01T00:00:01Z",
      "tokensUsed": 150
    }
  ],
  "tokensUsed": 150,
  "creditsDeducted": 1.5,
  "isArchived": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Images
```json
{
  "id": "img_123",
  "userId": "user_123",
  "title": "Beautiful Sunset",
  "prompt": "A beautiful sunset over the ocean",
  "model": "dall-e-3",
  "url": "https://storage.googleapis.com/...",
  "thumbnailUrl": "https://storage.googleapis.com/...",
  "size": "1024x1024",
  "creditsDeducted": 5,
  "metadata": {
    "prompt": "...",
    "model": "...",
    "seed": 12345,
    "steps": 50
  },
  "isPublic": false,
  "tags": ["sunset", "nature"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Videos
```json
{
  "id": "vid_123",
  "userId": "user_123",
  "title": "My Generated Video",
  "prompt": "A cat dancing",
  "model": "runway",
  "url": "https://storage.googleapis.com/...",
  "duration": 10,
  "resolution": "1920x1080",
  "fps": 30,
  "creditsDeducted": 15,
  "status": "completed", // pending, processing, completed, failed
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

### Credits
```json
{
  "id": "credit_txn_123",
  "userId": "user_123",
  "type": "deduction", // deduction, addition, refund, purchase
  "amount": 5,
  "reason": "Image Generation - DALL-E 3",
  "reference": "img_123",
  "balanceBefore": 100,
  "balanceAfter": 95,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Subscriptions
```json
{
  "id": "sub_123",
  "userId": "user_123",
  "plan": "pro",
  "status": "active", // active, cancelled, expired, paused
  "startDate": "2024-01-01",
  "endDate": "2024-02-01",
  "autoRenew": true,
  "price": 29.99,
  "currency": "USD",
  "paymentMethod": "stripe",
  "stripeSubscriptionId": "sub_123",
  "features": {
    "monthlyRequests": 5000,
    "maxFileSize": 52428800,
    "prioritySupport": true,
    "apiAccess": true
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "cancelledAt": null,
  "cancellationReason": null
}
```

### Payments
```json
{
  "id": "payment_123",
  "userId": "user_123",
  "amount": 29.99,
  "currency": "USD",
  "status": "succeeded", // succeeded, failed, pending, refunded
  "method": "stripe",
  "stripePaymentId": "pi_123",
  "purpose": "subscription", // subscription, credits, refund
  "description": "Pro Plan Monthly",
  "metadata": {
    "plan": "pro",
    "credits": 1000
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "completedAt": "2024-01-01T00:00:00Z",
  "receipt": "https://..."
}
```

### API Usage
```json
{
  "id": "usage_123",
  "userId": "user_123",
  "endpoint": "/api/tools/image-generation",
  "method": "POST",
  "status": 200,
  "responseTime": 2500,
  "provider": "openai",
  "model": "dall-e-3",
  "tokensUsed": 150,
  "creditsDeducted": 1.5,
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Activity Log
```json
{
  "id": "log_123",
  "userId": "user_123",
  "action": "image_generated",
  "category": "ai_tool",
  "description": "Generated image using DALL-E 3",
  "metadata": {
    "imageId": "img_123",
    "prompt": "A cat dancing"
  },
  "ipAddress": "192.168.1.1",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Notifications
```json
{
  "id": "notif_123",
  "userId": "user_123",
  "type": "info", // info, success, warning, error
  "title": "Image Generated",
  "message": "Your image has been generated successfully",
  "actionUrl": "/dashboard/images/img_123",
  "isRead": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "readAt": null
}
```

## Indexes

### Recommended Indexes

1. **Users**
   - `email` (ascending)
   - `subscription.plan` (ascending)
   - `status` (ascending)

2. **Chats**
   - `userId, createdAt` (ascending, descending)
   - `userId, isArchived` (ascending, ascending)

3. **Images**
   - `userId, createdAt` (ascending, descending)
   - `userId, isPublic` (ascending, ascending)

4. **Credits**
   - `userId, timestamp` (ascending, descending)

5. **Payments**
   - `userId, createdAt` (ascending, descending)
   - `status` (ascending)

6. **API Usage**
   - `userId, timestamp` (ascending, descending)
   - `endpoint` (ascending)

## Firestore Rules Summary

- Users can only read/write their own documents
- Admin can read/write all documents
- Public data is readable by anyone
- Sensitive data is encrypted
- Audit logging for all writes
