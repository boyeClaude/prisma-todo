import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../lib/prisma";

export const deleteTask = async (id: string, req: NextApiRequest, res: NextApiResponse) => {
  try {
    const task = await prisma.task.delete({
      where: { id: id },
    });
    return res.status(200).json(task);
  } catch (error) {
    throw new Error(`The HTTP ${req.method} method is not supported at this route. ${error}`);
  }
};

export const updateTask = async (id: string, title: string, description: string, req: NextApiRequest, res: NextApiResponse) => {
  try {
    const task = await prisma.task.update({
      where: { id: id },
      data: {
        title: title,
        description: description,
      },
    });

    console.log("task updated", task);
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(405).end();
  }
};

export const getTask = async (id: string, req: NextApiRequest, res: NextApiResponse) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    const result = res.status(200).json(task);
    return result;
  } catch (error) {
    console.error(error);
  }
};
