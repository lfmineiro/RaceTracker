import type { Response } from 'express';
import type { RaceCreateInput, RaceUpdateInput } from '../types/race.types.js';
import type { AuthRequest } from '../types/auth.types.js';
import { validateAuth, validateRequiredFields, validateDate, handleError, validateOwnership } from '../utils/controllerHelpers.js';
import { prisma } from '../lib/prisma.js';

export const getRaces = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;

    const races = await prisma.race.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'asc' }
    });

    return res.json(races);
  } catch (error) {
    handleError(error, 'fetching races', res);
  }
};

export const createRace = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;

    const data: Omit<RaceCreateInput, 'userId'> = req.body;
    
    if (!validateRequiredFields(data, ['name', 'date', 'distance', 'priorityLevel'], res)) {
      return;
    }

    const date = validateDate(data.date, res);
    if (!date) return;

    const race = await prisma.race.create({
      data: {
        ...data,
        userId: req.userId!,
        date,
      }
    });
    
    return res.status(201).json(race);
  } catch (error) {
    handleError(error, 'creating race', res);
  }
};

export const updateRace = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;
    const id = req.params.id as string;

    const existingRace = await prisma.race.findUnique({ where: { id } });
    if (!validateOwnership(existingRace, req.userId!, 'Race', res)) return;

    const data: RaceUpdateInput = req.body;
    
    if (data.date) {
      const date = validateDate(data.date, res);
      if (!date) return;
      data.date = date;
    }

    const updatedRace = await prisma.race.update({
      where: { id },
      data
    });

    return res.json(updatedRace);
  } catch (error) {
    handleError(error, 'updating race', res);
  }
};

export const deleteRace = async (req: AuthRequest, res: Response) => {
  try {
    if (!validateAuth(req, res)) return;
    const id = req.params.id as string;

    const existingRace = await prisma.race.findUnique({ where: { id } });
    if (!validateOwnership(existingRace, req.userId!, 'Race', res)) return;

    await prisma.race.delete({ where: { id } });

    return res.status(204).send();
  } catch (error) {
    handleError(error, 'deleting race', res);
  }
};
