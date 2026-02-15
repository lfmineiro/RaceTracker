import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { RegisterInput, LoginInput, AuthResponse, JWTPayload, AuthRequest } from '../types/auth.types.js';

const prisma = new PrismaClient();

if (!process.env.JWT_SECRET) {
  throw new Error('❌ FATAL ERROR: JWT_SECRET is not defined in environment variables. Server cannot start.');
}

const JWT_SECRET: string = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;

/**
 * Register - Cria novo usuário com senha hash
 */
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password }: RegisterInput = req.body;

    // Validações
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: 'Name, email and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Password must be at least 6 characters' 
      });
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ 
        message: 'Email already registered' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });

    return res.status(201).json({
      message: 'User created successfully',
      user
    });

  } catch (error) {
    console.error('Error in register:', error);
    return res.status(500).json({ 
      message: 'Error creating user',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password }: LoginInput = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email and password are required' 
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid credentials' 
      });
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '7d' 
    });

    const authResponse: AuthResponse = {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      }
    };

    return res.status(200).json(authResponse);

  } catch (error) {
    console.error('Error in login:', error);
    return res.status(500).json({ 
      message: 'Error during login',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ 
        message: 'Unauthorized' 
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        stravaId: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return res.status(500).json({ 
      message: 'Error fetching user data',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
