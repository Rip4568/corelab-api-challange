
import express, { Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';


const server = express();

//Ativando a utilização de JSON	
server.use(express.json());
//ativando a utilização de urlencode
server.use(express.urlencoded({ extended: true }));
//aqui começa minha organização de rotas
//deixei esse arquivo app.ts apenas para configuração inicial da aplicação da API
//com isso eu consigo orquestrar melhor onde cada rota fica e como gerenciar
//devo adminitir que boa parte da orgnização das pastas se deve ao meu pequeno conhecimento de 
//organização ee arquitetura do NestJS
server.use(cors())
server.use(routes)

server.get('/', (request: Request, response: Response): Response => {
  return response.send('Hello World!');
})


export {
  server,
}