import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { User } from "@shared/modules/users/domain/user";
import { UserMapper } from "@shared/modules/users/mappers/user-mapper";
import { UserRepo } from "@shared/modules/users/repositories/interfaces/user-repo";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { UserDTO } from "@shared/dtos/users/user.dto";

export class CreateUserUseCase implements UseCase<CreateUserDTO, UserDTO> {
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
  }

  public async execute({
    name,
    email,
    password,
  }: CreateUserDTO): Promise<UserDTO> {
    await this.verifyEmailConflict(email);

    const domainUser = User.create({ name, email, password }, false);

    await this.repo.create(domainUser);

    return this.userMapper.toDTO(domainUser);
  }
}
