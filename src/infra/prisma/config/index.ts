import { PrismaClient } from "@prisma/client";

export class PrismaDatabase {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({ log: ["query", "error"] });
  }

  public async connect() {
    await this.prisma.$connect();
  }

  public get user() {
    return this.prisma.prismaUser;
  }
}

export const prisma = new PrismaDatabase();