import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'UPDATE') {
    const id = req.query.id;
    const taskId = id?.toString();

    const { title, description } = req.body;

    try {
      const task = await prisma.task.update({
        where: { id: taskId },
        data: {
          title: title,
          description: description,
        },
      });

      return res.status(200).json(task);
    } catch (error) {
      console.error(error);
    }
  }

  if (req.method === 'DELETE') {
    const id = req.query.id;
    const taskId = id?.toString();
    try {
      const task = await prisma.task.delete({
        where: { id: taskId },
      });
      return res.status(200).json(task);
    } catch (error) {
      throw new Error(`The HTTP ${req.method} method is not supported at this route. ${error}`);
    }
  }
}
