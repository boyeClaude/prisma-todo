import { NextApiRequest, NextApiResponse } from "next";
import { deleteTask, getTask, updateTask } from "../../../helpers";
import prisma from "../../../lib/prisma";

// const deleteTask = async (id: string, req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const task = await prisma.task.delete({
//       where: { id: id },
//     });
//     return res.status(200).json(task);
//   } catch (error) {
//     throw new Error(`The HTTP ${req.method} method is not supported at this route. ${error}`);
//   }
// };

// const updateTask = async (id: string, title: string, description: string, req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const task = await prisma.task.update({
//       where: { id: id },
//       data: {
//         title: title,
//         description: description,
//       },
//     });

//     console.log("task updated", task);
//     return res.status(200).json(task);
//   } catch (error) {
//     console.error(error);
//   }
// };
// const getTask = async (id: string, req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const task = await prisma.task.findUnique({
//       where: {
//         id: id,
//       },
//     });
//     const result = res.status(200).json(task);
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// };

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const id = req.query.id;
    const taskId = id?.toString();

    taskId && getTask(taskId, req, res);
  }

  if (req.method === "UPDATE" || req.method === "PUT") {
    console.log(`REquest: ${req} and Reponse : ${res}`);

    const id = req.query.id;
    const taskId = id?.toString();
    const { title, description } = req.body;

    console.log(` id: ${taskId} title: ${title} description: ${description}`);
    taskId && updateTask(taskId, title, description, req, res);
  }

  if (req.method === "DELETE") {
    const id = req.query.id;
    const taskId = id?.toString();
    taskId && deleteTask(taskId, req, res);
  }
}
