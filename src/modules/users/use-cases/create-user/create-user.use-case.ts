import { UseCaseToAuth } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { User } from "@modules/users/domain/user";
import { UserMapper } from "@modules/users/mappers/user-mapper";
import { UserRepo } from "@modules/users/repositories/interfaces/user-repo";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { UserDTO } from "@shared/dtos/users/user.dto";

export class CreateUserUseCase implements UseCaseToAuth {
  private readonly repo: UserRepo;
  private userMapper: UserMapper = new UserMapper();

  constructor(repo: UserRepo) {
    this.repo = repo;
  }

  private async verifyEmailConflict(email: string) {
    const isUser = await this.repo.findByEmail(email);

    if (isUser) {
      throw new CustomError(
        "error_conflict",
        "user[email] is already registered"
      );
    }

    return isUser;
  }

  public async create({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<UserDTO> {
    await this.verifyEmailConflict(email);

    const domainUser = User.create({ name, email, password });

    await this.repo.create(domainUser);

    return this.userMapper.toDTO(domainUser);
  }
}
