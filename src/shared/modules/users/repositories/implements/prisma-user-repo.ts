import { PrismaDatabase } from "@infra/prisma/config";
import { User } from "@shared/modules/users/domain/user";
import { UserMapper } from "@shared/modules/users/mappers/user-mapper";
import { UserRepo } from "@shared/modules/users/repositories/interfaces/user-repo";

export class PrismaUserRepo implements UserRepo {
  private readonly prisma: PrismaDatabase;
  private readonly mapper: UserMapper;

  constructor(prisma: PrismaDatabase) {
    this.prisma = prisma;
    this.mapper = new UserMapper();
  }

  public async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({ where: { email } });

    if (!prismaUser) {
      return null;
    }

    return this.mapper.toDomain(prismaUser);
  }

  public async create(domainUser: User): Promise<User> {
    const data = this.mapper.toPersistence(domainUser);

    const prismaUser = await this.prisma.user.create({ data });

    return this.mapper.toDomain(prismaUser);
  }
}
