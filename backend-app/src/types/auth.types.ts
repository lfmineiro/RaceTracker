import type { Request } from 'express';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

export interface JWTPayload {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}
