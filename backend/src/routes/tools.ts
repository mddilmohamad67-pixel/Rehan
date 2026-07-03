import { Router, Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { verifyToken } from '../middleware/auth';
import axios from 'axios';

const router = Router();

interface AuthRequest extends Request {
  user?: { uid: string; email: string };
}

// Chat with AI
router.post('/chat', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { message, model, conversationId, temperature } = req.body;
    const uid = req.user?.uid!;

    // Validate user credits
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    const userData = userDoc.data();

    if ((userData?.credits?.available || 0) < 1) {
      return res.status(400).json({
        success: false,
        error: 'Insufficient credits',
      });
    }

    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: model || 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: temperature || 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    const tokensUsed = response.data.usage.total_tokens;
    const creditsDeducted = Math.ceil(tokensUsed / 100);

    // Deduct credits
    await admin.firestore().collection('users').doc(uid).update({
      'credits.available': (userData?.credits?.available || 0) - creditsDeducted,
      'credits.used': (userData?.credits?.used || 0) + creditsDeducted,
    });

    // Save to chat history
    await admin.firestore().collection('chats').add({
      userId: uid,
      title: message.substring(0, 50),
      model,
      messages: [{
        role: 'user',
        content: message,
        timestamp: new Date(),
      }, {
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
        tokensUsed,
      }],
      tokensUsed,
      creditsDeducted,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json({
      success: true,
      response: reply,
      tokensUsed,
      creditsDeducted,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
