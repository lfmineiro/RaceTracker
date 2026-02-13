import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await prisma.workout.findMany({
    orderBy: { date: 'asc' }
  });
  return res.json(workouts);
}

export const createWorkout = async (req: Request, res: Response) => {
  const {userId, date, type, title, description, plannedDistance, plannedDuration} = req.body;
  const workout = await prisma.workout.create({
    data: {
      userId,
      date,
      type,
      title,
      description,
      plannedDistance,
      plannedDuration
    }
  })
  return res.status(201).json(workout);
}
