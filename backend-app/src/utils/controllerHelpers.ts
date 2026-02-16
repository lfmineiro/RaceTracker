import type { Response } from 'express';
import type { AuthRequest } from '../types/auth.types.js';

export const validateAuth = (req: AuthRequest, res: Response): boolean => {
  if (!req.userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return false;
  }
  return true;
};

export const validateRequiredFields = (
  data: Record<string, unknown>,
  requiredFields: string[],
  res: Response
): boolean => {
  for (const field of requiredFields) {
    if (!data[field]) {
      res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` });
      return false;
    }
  }
  return true;
};

export const validateDate = (dateValue: unknown, res: Response): Date | null => {
  const date = new Date(dateValue as string);
  if (isNaN(date.getTime())) {
    res.status(400).json({ message: 'Invalid date format' });
    return null;
  }
  return date;
};

export const handleError = (error: unknown, action: string, res: Response): void => {
  console.error(`Error ${action}:`, error);
  res.status(500).json({ 
    message: `Error ${action}`,
    error: error instanceof Error ? error.message : 'Unknown error'
  });
};

export const validateOwnership = (
  resource: { userId: string } | null,
  userId: string,
  resourceName: string,
  res: Response
): boolean => {
  if (!resource) {
    res.status(404).json({ message: `${resourceName} not found` });
    return false;
  }

  if (resource.userId !== userId) {
    res.status(403).json({ message: 'Forbidden' });
    return false;
  }

  return true;
};
