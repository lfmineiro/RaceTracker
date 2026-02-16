import { PrismaClient } from '@prisma/client';
import type { Response } from 'express';
import type { WorkoutCreateInput } from '../types/workout.types.js';
import type { AuthRequest } from '../types/auth.types.js';
import { validateAuth, validateRequiredFields, validateDate, handleError } from '../utils/controllerHelpers.js';

const prisma = new PrismaClient();

export const getWorkouts = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;

    const workouts = await prisma.workout.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'asc' }
    });

    return res.json(workouts);
  } catch (error) {
    handleError(error, 'fetching workouts', res);
  }
};
export const createWorkout = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;

    const data: Omit<WorkoutCreateInput, 'userId'> = req.body;
    
    if (!validateRequiredFields(data, ['date', 'title'], res)) {
      return;
    }

    const date = validateDate(data.date, res);
    if (!date) return;

    const workout = await prisma.workout.create({
      data: {
        ...data,
        userId: req.userId!,
        date,
      }
    });
    
    return res.status(201).json(workout);
  } catch (error) {
    handleError(error, 'creating workout', res);
  }
}
