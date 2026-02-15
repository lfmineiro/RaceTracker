import { PrismaClient } from '@prisma/client';
import type { Response } from 'express';
import type { WorkoutCreateInput } from '../types/workout.types.js';
import type { AuthRequest } from '../types/auth.types.js';

const prisma = new PrismaClient();

export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const workouts = await prisma.workout.findMany({
      where: { userId },
      orderBy: { date: 'asc' }
    });

    return res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return res.status(500).json({ 
      message: 'Error fetching workouts',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};


export const createWorkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const data: Omit<WorkoutCreateInput, 'userId'> = req.body;
    
    if (!data.date) {
      return res.status(400).json({ message: 'Date is required' });
    }
    if (!data.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const date = new Date(data.date);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const workout = await prisma.workout.create({
      data: {
        ...data,
        userId,
        date,
      }
    });
    
    return res.status(201).json(workout);
  } catch (error) {
    console.error('Error creating workout:', error);
    return res.status(500).json({ 
      message: 'Error creating workout', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
