import { PrismaUser } from ".prisma/client";
import { User } from "@modules/users/domain/user";
import { UserMapper } from "@modules/users/mappers/user-mapper";
import { UserPersistence, UserRepo } from "../interfaces/user-repo";

export class InMemoryUserRepo implements UserRepo {
  private readonly users: UserPersistence[];
  private readonly mapper: UserMapper;

  constructor() {
    this.users = [];
    this.mapper = new UserMapper();
  }

  public async findByEmail(email: string): Promise<User | null> {
    const isMemoryUser = this.users.find(
      (memoryUser) => memoryUser,
      email === email
    );

    if (!isMemoryUser) {
      return null;
    }

    return this.mapper.toDomain(isMemoryUser);
  }

  public async create(data: User): Promise<User> {
    const userToMemory = this.mapper.toPersistence(data);

    this.users.push(userToMemory);

    return this.mapper.toDomain(userToMemory);
  }
}
