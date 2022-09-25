import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, description } = req.body;
  const result = await prisma.task.create({
    data: {
      title: title,
      description: description,
    },
  });

  res.json(result);
}
