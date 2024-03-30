import { Request, Response, NextFunction } from "express";
import { validateTokenJWT } from "../auth/hash-utils";

export async function isAuthenticatedMiddleware(request: Request | any, response: Response, next: NextFunction) {
  try {
    const tokenJWT = request.headers.authorization;
    if (!tokenJWT) {
      return response.status(401).json({ error: "Token not provided" });
    }
    const token = tokenJWT.split(' ')[1];
    const decoded = validateTokenJWT(token)
    if (!decoded) {
      return response.status(401).json({ error: "Token invalid" });
    }
    request.user = decoded;

    // Se o usuário estiver autenticado, deve prosseguir com a próxima função de middleware ou rota
    next();
  } catch (error) {
    return response.json({ error }).status(500);
  }
}
