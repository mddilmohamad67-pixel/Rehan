import { Router, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { verifyToken } from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user?: { uid: string; email: string };
}

// Get Profile
router.get('/profile', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(req.user?.uid!).get();
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

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

// Update Profile
router.put('/profile', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, avatar, phone } = req.body;
    const uid = req.user?.uid!;

    await admin.firestore().collection('users').doc(uid).update({
      fullName,
      avatar,
      phone,
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      message: 'Profile updated successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
