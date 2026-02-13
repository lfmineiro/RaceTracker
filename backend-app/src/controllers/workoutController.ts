import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await prisma.workout.findMany({
    orderBy: { date: 'asc' }
  });
  return res.json(workouts);
}
