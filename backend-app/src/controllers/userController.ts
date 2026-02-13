import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import type { UserCreateInput, UserUpdateInput } from "../types/user.types.js";

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
  const data: UserCreateInput = req.body;
  const user = await prisma.user.create({
    data
  })
  return res.status(201).json(user);
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UserUpdateInput = req.body;
  const user = await prisma.user.update({
    where: { id: String(id) },
    data
  });
  return res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: String(id) } });
  return res.status(204).send();
};
