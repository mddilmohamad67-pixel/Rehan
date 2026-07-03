import { Router, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { verifyToken, checkAdmin } from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user?: { uid: string; email: string };
}

// Get All Users (Admin only)
router.get('/users', verifyToken, checkAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const snapshot = await admin.firestore()
      .collection('users')
      .limit(parseInt(limit as string))
      .offset((parseInt(page as string) - 1) * parseInt(limit as string))
      .get();

    const users = snapshot.docs.map(doc => doc.data());
    const total = (await admin.firestore().collection('users').count().get()).data().count;

    res.json({
      success: true,
      users,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Ban User (Admin only)
router.post('/users/:userId/ban', verifyToken, checkAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    await admin.firestore().collection('users').doc(userId).update({
      status: 'banned',
      bannedReason: reason,
      bannedAt: new Date(),
    });

    res.json({
      success: true,
      message: 'User banned successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Add Credits to User (Admin only)
router.post('/users/:userId/add-credits', verifyToken, checkAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount, reason } = req.body;

    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();

    await admin.firestore().collection('users').doc(userId).update({
      'credits.available': (userData?.credits?.available || 0) + amount,
      'credits.total': (userData?.credits?.total || 0) + amount,
    });

    // Log transaction
    await admin.firestore().collection('credits').add({
      userId,
      type: 'addition',
      amount,
      reason,
      timestamp: new Date(),
    });

    res.json({
      success: true,
      message: 'Credits added successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
