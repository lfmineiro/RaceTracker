import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: String(id) } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const {name, email, password} = req.body;
  const user = await prisma.user.create({
    data: {
      name, 
      email,
      password
    }
  })
  return res.status(201).json(user);
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, password } = req.body;
  const user = await prisma.user.update({
    where: { id: String(id) },
    data: { email, name, password }
  });
  return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: String(id) } });
  return res.status(204).send();
};
