import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { userSchema } from "./user.schema";
import { generateHash } from "../../auth/hash-utils";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const prisma = new PrismaClient()

export async function createUserService(request: Request, response: Response) {
  try {
    const dataValidated = await userSchema.validate(request.body, { abortEarly: false })
    const { password } = dataValidated
    dataValidated.password = await generateHash(password)
    const user = await prisma.user.create({ data: dataValidated })
    return response.status(201).json({
      message: "User created successfully",
      user
    })
  } catch (error) {
    /* if(error instanceof PrismaClientKnownRequestError) {
      return response.json({ message: "erro conhecid do prisma, fazer um handleErro Do prisma" }).status(500);
    } */
    return response.status(500).json({ error });
  }
}

export async function getAllUserService(request: Request, response: Response) {
  try {
    const allUsers = await prisma.user.findMany({})
    return response.status(200).json({ result: allUsers })
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function getOneUserService(request: Request, response: Response) {
  try {
    const id = Number(request.params.id);
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })
    return response.status(200).json({ user })
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function updateUserService(request: Request, response: Response) {
  try {
    const { id, createdAt, updatedAt, root, password, ...secureData } = request.body;
    const idUser = Number(request.params.id);
    const passwordHased = generateHash(password)
    const user = await prisma.user.update({
      where: {
        id: idUser,
        password: passwordHased,
        ...secureData
      },
      data: request.body
    })
    return response.status(200).json({ message: "User updated successfully", user })
  } catch (error) {
    return response.status(500).json({ error });
  }
}

export async function deleteUserService(request: Request, response: Response) {
  try {
    const id = Number(request.params.id);
    const user = await prisma.user.delete({
      where: {
        id
      }
    })
    return response.status(200).json({ message: "User deleted successfully", user })
  } catch (error) {
    return response.status(500).json({ error });
  }
}