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
  const data: WorkoutCreateInput = req.body;
  const workout = await prisma.workout.create({
    data
  })
  return res.status(201).json(workout);
}
