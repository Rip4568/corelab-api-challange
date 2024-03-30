import request from 'supertest';
import { PrismaClient } from "@prisma/client";
import { IUser } from '../src/apps/user/user.schema';
import express from 'express';
import { server } from '../src/server';


const prisma = new PrismaClient()

describe("Users", () => {
  beforeAll(async () => {
    // Limpe o banco de dados antes de executar os testes
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    //depois de tudo desconecte o banco de dados
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  })

  it("should return an empty array when there are no users", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toBe(200);
  });
  it("should create a new user", async () => {
    const response = await request(server)
      .post("/users")
      .send({
        email: 'test@example.com',
        username: 'test',
        password: "password123",
      });
    expect(response.status).toBe(201);
    const data = response.body;
    const user: IUser = data.user
    expect(user.email).toBe("test@example.com");
    expect(user.username).toBe("test");
    //expect(response.body.name).toBe("<NAME>");
  })
})