import { PrismaDatabase } from "@infra/prisma/config";
import { Credential } from "@modules/credentials/domain/credential";
import { CredentialMapper } from "@modules/credentials/mappers/credential-mapper";
import { CredentialRepo } from "../interfaces/credential-repo";

export class PrismaCredentialRepo implements CredentialRepo {
  private readonly prisma: PrismaDatabase;
  private readonly mapper: CredentialMapper;

  constructor(prisma: PrismaDatabase) {
    this.prisma = prisma;
    this.mapper = new CredentialMapper();
  }

  public async findByTitle(
    title: string,
    userId: string
  ): Promise<Credential | null> {
    const credential = await this.prisma.credential.findUnique({
      where: { title_userId: { title, userId } },
    });

    if (!credential) {
      return null;
    }

    return this.mapper.toDomain(credential);
  }

  public async create(domainCredential: Credential): Promise<Credential> {
    const data = this.mapper.toPersistence(domainCredential);

    const credential = await this.prisma.credential.create({ data });

    return this.mapper.toDomain(credential);
  }

  public async findAll(userId: string): Promise<Credential[]> {
    const credentials = await this.prisma.credential.findMany({
      where: { userId },
    });

    return this.mapper.bulkToDomain(credentials);
  }

  public async find(id: string): Promise<Credential | null> {
    const credential = await this.prisma.credential.findUnique({
      where: { id },
    });

    if (!credential) {
      return null;
    }

    return this.mapper.toDomain(credential);
  }

  public async remove(id: string): Promise<Credential | null> {
    const credential = await this.prisma.credential.delete({ where: { id } });

    return this.mapper.toDomain(credential);
  }
}
