import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';
import type { WorkoutCreateInput } from '../types/workout.types.js';

const prisma = new PrismaClient();

export const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await prisma.workout.findMany({
    orderBy: { date: 'asc' }
  });
  return res.json(workouts);
}

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const data: WorkoutCreateInput = req.body;
    
    if (!data.date) {
      return res.status(400).json({ message: 'Date is required' });
    }
    if (!data.userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }
    if (!data.title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const userId = String(data.userId);

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
