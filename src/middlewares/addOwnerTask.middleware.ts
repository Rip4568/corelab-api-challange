import { Request, Response, NextFunction } from "express";

export async function addOwnerTaskMiddleware(request: Request, response: Response, next: NextFunction) {
  try {
    // Adicione aqui a lógica para verificar se o usuário logado é o proprietário da tarefa
    // Por exemplo, você pode verificar se o usuário possui permissões para adicionar uma tarefa
    // Você pode acessar os dados do usuário a partir do request (por exemplo, request.user) se estiverem disponíveis

    // Se o usuário for o proprietário da tarefa, você pode prosseguir com a próxima função de middleware ou rota
    console.log('addOwnerTaskMiddleware passed');
    
    next();
  } catch (error) {
    return response.json({ error }).status(500);
  }
}
