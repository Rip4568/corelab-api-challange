import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";
import { compareHash, generateTokenJWT } from "./hash-utils";


const prisma = new PrismaClient()

const authRouter = Router();

authRouter.post("/login", async (request: Request, response: Response) => {
  try {
    const { email, username, password } = request.body;
    if (!password) {
      return response.status(400).json({ error: 'password is required' })
    }
    const user = await prisma.user.findFirst({
      where: {
        username, email
      }
    });
    if (!user) {
      return response.status(500).json({
        message: "credenciais inválidas, email ou username inválido"
      })
    }
    const passwordMatch = await compareHash(password, user.password)
    if (!passwordMatch) {
      return response.status(500).json({
        "message": "credenciais inválidas, senhas incompativeis"
      })
    }

    const token = generateTokenJWT(user);
    return response.status(200).json({
      token,
      "message": "login feito com sucesso",
    });
  } catch (error) {
    return response.status(500).json({
      message: "erro ao fazer login",
      error,
    });
  }
});

export { authRouter };