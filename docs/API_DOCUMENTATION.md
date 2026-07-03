# API Documentation

## Base URL

```
https://api.yourdomain.com/api/v1
```

## Authentication

All requests require a Bearer token:

```bash
Authorization: Bearer <token>
```

## Rate Limits

- Free: 100 requests/hour
- Basic: 500 requests/hour
- Pro: 2000 requests/hour
- Enterprise: Unlimited

## Error Response Format

```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

## Endpoints

### Authentication

#### Sign Up
```
POST /auth/signup
```

Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt_token",
  "user": {
    "uid": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe"
  }
}
```

#### Login
```
POST /auth/login
```

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### AI Tools

#### Chat
```
POST /tools/chat
```

Request:
```json
{
  "message": "What is AI?",
  "model": "gpt-4",
  "conversationId": "conv_123",
  "temperature": 0.7
}
```

Response:
```json
{
  "success": true,
  "response": "AI stands for...",
  "tokenUsed": 150,
  "creditsDeducted": 1.5
}
```

#### Image Generation
```
POST /tools/image-generation
```

Request:
```json
{
  "prompt": "A beautiful sunset",
  "model": "dall-e-3",
  "size": "1024x1024",
  "quantity": 1
}
```

Response:
```json
{
  "success": true,
  "images": [
    {
      "url": "https://...",
      "id": "img_123"
    }
  ],
  "creditsDeducted": 5
}
```

#### Speech to Text
```
POST /tools/speech-to-text
```

Request: (multipart/form-data)
```
file: <audio_file>
model: whisper
language: en
```

Response:
```json
{
  "success": true,
  "text": "Transcribed text...",
  "confidence": 0.95,
  "creditsDeducted": 0.5
}
```

### Credits

#### Get Credit Balance
```
GET /credits/balance
```

Response:
```json
{
  "success": true,
  "balance": 100,
  "used": 50,
  "total": 150
}
```

#### Get Credit History
```
GET /credits/history?limit=10&offset=0
```

Response:
```json
{
  "success": true,
  "history": [
    {
      "id": "txn_123",
      "type": "deduction",
      "amount": 5,
      "reason": "Image Generation",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### Payments

#### Create Subscription
```
POST /payments/subscribe
```

Request:
```json
{
  "planId": "pro",
  "paymentMethod": "stripe"
}
```

Response:
```json
{
  "success": true,
  "subscriptionId": "sub_123",
  "clientSecret": "pi_123_secret"
}
```

#### Cancel Subscription
```
POST /payments/cancel-subscription
```

Response:
```json
{
  "success": true,
  "message": "Subscription cancelled"
}
```

### User Profile

#### Get Profile
```
GET /users/profile
```

Response:
```json
{
  "success": true,
  "user": {
    "uid": "user_123",
    "email": "user@example.com",
    "fullName": "John Doe",
    "avatar": "https://...",
    "subscription": "pro",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update Profile
```
PUT /users/profile
```

Request:
```json
{
  "fullName": "Jane Doe",
  "avatar": "https://..."
}
```

### Admin Endpoints

#### Get All Users
```
GET /admin/users?page=1&limit=20
```

Response:
```json
{
  "success": true,
  "users": [...],
  "total": 500,
  "page": 1
}
```

#### Ban User
```
POST /admin/users/{userId}/ban
```

Request:
```json
{
  "reason": "Violation of terms"
}
```

#### Add Credits to User
```
POST /admin/users/{userId}/add-credits
```

Request:
```json
{
  "amount": 100,
  "reason": "Compensation"
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Server Error

## Pagination

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 500,
    "pages": 25
  }
}
```
