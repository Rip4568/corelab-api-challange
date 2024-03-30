import { Request, Response, NextFunction } from "express";

export async function isOwnerTaskMiddleware(request: Request, response: Response, next: NextFunction) {
  try {
    // Adicione aqui a lógica para verificar se o usuário logado é o proprietário da tarefa
    // Por exemplo, você pode comparar o ID do usuário logado com o ID do usuário associado à tarefa na base de dados
    // Você pode acessar os dados do usuário a partir do request (por exemplo, request.user) se estiverem disponíveis

    // Se o usuário for o proprietário da tarefa, você pode prosseguir com a próxima função de middleware ou rota
    console.log('isOwnerTaskMiddleware passed');
    
    next();
  } catch (error) {
    return response.json({ error }).status(500);
  }
}
