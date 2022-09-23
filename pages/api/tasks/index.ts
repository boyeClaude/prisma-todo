import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export type ITask = {
  title: string;
  description: string;
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<ITask[]>) {
  const result = await prisma.task.findMany();
  return res.status(200).json(result);
}
