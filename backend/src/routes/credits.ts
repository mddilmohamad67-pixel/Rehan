import { Router, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { verifyToken } from '../middleware/auth';

const router = Router();

interface AuthRequest extends Request {
  user?: { uid: string; email: string };
}

// Get Credit Balance
router.get('/balance', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(req.user?.uid!).get();
    const userData = userDoc.data();

    res.json({
      success: true,
      balance: userData?.credits?.available || 0,
      used: userData?.credits?.used || 0,
      total: userData?.credits?.total || 0,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Get Credit History
router.get('/history', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const uid = req.user?.uid!;

    const snapshot = await admin.firestore()
      .collection('credits')
      .where('userId', '==', uid)
      .orderBy('timestamp', 'desc')
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string))
      .get();

    const history = snapshot.docs.map(doc => doc.data());

    res.json({
      success: true,
      history,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
