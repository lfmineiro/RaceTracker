import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { AuthRequest, JWTPayload } from '../types/auth.types.js';

if (!process.env.JWT_SECRET) {
  throw new Error('❌ FATAL ERROR: JWT_SECRET is not defined in environment variables. Server cannot start.');
}

const JWT_SECRET: string = process.env.JWT_SECRET;

export const authMiddleware = (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Response | void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Authorization header missing' 
      });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ 
        message: 'Invalid authorization format. Use: Bearer <token>' 
      });
    }

    const token = parts[1] as string;

    const decoded = jwt.verify(token, JWT_SECRET) as unknown as JWTPayload;

    req.userId = decoded.userId;

    next();

  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        message: 'Invalid token' 
      });
    }

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        message: 'Token expired' 
      });
    }

    console.error('Error in authMiddleware:', error);
    return res.status(500).json({ 
      message: 'Error validating token' 
    });
  }
};



