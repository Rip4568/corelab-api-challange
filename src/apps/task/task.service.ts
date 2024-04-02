import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { IUser } from "../user/user.schema";
import { taskSchema } from "./task.schema";
const prisma = new PrismaClient();

export async function getAllTaskService(request: Request | any, response: Response) {
  try {
    //objeto user vai ser passado por causa do  midleware
    const user: IUser = request.user;
    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id
      }
    });

    return response.status(200).json({ tasks });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function getOneTaskService(request: Request | any, response: Response) {
  try {
    const taskId = Number(request.params.id);
    const user: IUser = request.user
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: user.id
      }
    });
    return response.status(200).json({ message: "Get one Task", task });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function createTaskService(request: Request | any, response: Response) {
  try {
    const user = request.user.payload;
    //const taskData = request.body;
    const { id, createdAt, updatedAt, ...secureData } = request.body;
    //const taskValidated = await taskSchema.validate(taskData, { abortEarly: false });
    //por algum motivo esta dando um erro muito chato de tipo e valor, como eu não quero
    //perder tempo não vou dar sequencia na utilização do yup e dependerei
    //totalmente da validação do prisma
    const task = await prisma.task.create({
      data: {userId: user.id, ...secureData}
    });
    return response.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function updateTaskService(request: Request | any, response: Response) {
  try {
    const taskId = Number(request.params.id);
    const taskData = request.body;
    const user = request.user;
    const task = await prisma.task.update({
      where: {
        id: taskId,
        userId: user.id
      },
      data: {
        ...taskData,
      }
    })
    return response.status(200).json({ message: "Task Updated", taskId, task });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function deleteTaskService(request: Request| any, response: Response) {
  try {
    const taskId = Number(request.params.id);
    //const user = request.user.payload;
    const taskDeleted = await prisma.task.delete({
      where: {
        id: taskId
      }
    })

    return response.status(200).json({ message: "Task Deleted", taskId, taskDeleted });
  } catch (error) {
    return response.status(500).json({ error });
  }
}