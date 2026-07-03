import { Router, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { verifyToken } from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user?: { uid: string; email: string };
}

// Sign Up
router.post('/signup', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    // Create user in Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    // Create user document in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      uid: userRecord.uid,
      email,
      fullName,
      avatar: '',
      role: 'user',
      subscription: {
        plan: 'free',
        status: 'active',
      },
      credits: {
        available: 10,
        used: 0,
        total: 10,
      },
      settings: {
        theme: 'dark',
        notifications: true,
        emailUpdates: false,
        twoFactorEnabled: false,
      },
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Get custom token
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      token: customToken,
      user: {
        uid: userRecord.uid,
        email,
        fullName,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Get Current User
router.get('/me', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(req.user?.uid!).get();
    const userData = userDoc.data();

    res.json({
      success: true,
      user: userData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
