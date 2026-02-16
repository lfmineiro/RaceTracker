import type { Response } from 'express';
import type { WorkoutCreateInput, WorkoutUpdateInput } from '../types/workout.types.js';
import type { AuthRequest } from '../types/auth.types.js';
import { validateAuth, validateRequiredFields, validateDate, handleError, validateOwnership } from '../utils/controllerHelpers.js';
import { prisma } from '../lib/prisma.js';

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

export const updateWorkout = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;
    const id = req.params.id as string;

    const existingWorkout = await prisma.workout.findUnique({ where: { id } });
    if (!validateOwnership(existingWorkout, req.userId!, 'Workout', res)) return;

    const data: WorkoutUpdateInput = req.body;
    
    if (data.date) {
      const date = validateDate(data.date, res);
      if (!date) return;
      data.date = date;
    }

    const updatedWorkout = await prisma.workout.update({
      where: { id },
      data
    });

    return res.json(updatedWorkout);
  } catch (error) {
    handleError(error, 'updating workout', res);
  }
};

export const deleteWorkout = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;
    const id = req.params.id as string;

    const existingWorkout = await prisma.workout.findUnique({ where: { id } });
    if (!validateOwnership(existingWorkout, req.userId!, 'Workout', res)) return;

    await prisma.workout.delete({ where: { id } });

    return res.status(204).send();
  } catch (error) {
    handleError(error, 'deleting workout', res);
  }
};
