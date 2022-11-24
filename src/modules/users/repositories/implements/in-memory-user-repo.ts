import { User } from "@modules/users/domain/user";
import { UserMapper } from "@modules/users/mappers/user-mapper";
import { UserPersistence, UserRepo } from "../interfaces/user-repo";

export class InMemoryUserRepo implements UserRepo {
  private users: UserPersistence[] = [];
  private userMapper: UserMapper = new UserMapper();

  public async findByEmail(email: string): Promise<User | null> {
    const isMemoryUser = this.users.find(
      (memoryUser) => memoryUser,
      email === email
    );

    if (!isMemoryUser) {
      return null;
    }

    return this.userMapper.toDomain(isMemoryUser);
  }

  public async create(data: User): Promise<User> {
    const userToMemory = this.userMapper.toPersistence(data);

    this.users.push(userToMemory);

    return this.userMapper.toDomain(userToMemory);
  }
}
