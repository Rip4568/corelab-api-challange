import request from 'supertest'
import { PrismaClient } from "@prisma/client";
import { app } from "../src/app";

const prisma = new PrismaClient()

describe("Tasks", () => {
  beforeAll(async () => {
    // Limpe o banco de dados antes de executar os testes
    await prisma.task.deleteMany({});
  })

  afterAll(async () => {
    // Limpe o banco de dados depois de executar os testes
    await prisma.task.deleteMany({});
    await prisma.$disconnect();
  });

  it('should get a response and status 200 ok', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
  })
})