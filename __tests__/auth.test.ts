import request from 'supertest'
import { Prisma, PrismaClient, User } from "@prisma/client";
import { IUser } from '../src/apps/user/user.schema';
import { server } from '../src/server';

const prisma = new PrismaClient()

describe("Auth Tests", () => {
  let user: User;
  beforeAll(async () => {
    // Limpe o banco de dados antes de executar os testes
    prisma.user.deleteMany({});
  })

  afterAll(() => {
    // Limpe o banco de dados depois de executar os testes
    prisma.user.deleteMany({});
    prisma.$disconnect()
  })

  it('should to create a new user', async () => {
    const response = await request(server).post('/users').send({
      username: "AnyUser",
      email: "user@example.com",
      password: "password123",
    })
    user = response.body.user;
    const message = response.body.message;
    expect(user).toHaveProperty('id');
    expect(response.status).toBe(201);
    expect(message).toBe("User created successfully");
  })

  it('should to do a login', async () => {
    const response = await request(server).post('/login').send({
      ...user
    });
    const data = await response.body;
    expect(response.status).toBe(200);
    expect(data.message).toEqual('login feito com sucesso')
  })
})