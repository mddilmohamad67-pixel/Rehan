import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { uid: string; email: string };
  token?: string;
}

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided',
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
    };
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: 'Invalid token',
    });
  }
};

export const checkAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDoc = await admin.firestore().collection('users').doc(req.user?.uid!).get();
    const userData = userDoc.data();

    if (userData?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Admin access required',
      });
    }

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: 'Access denied',
    });
  }
};
