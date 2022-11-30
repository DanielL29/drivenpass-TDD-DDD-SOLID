import jwt from "jsonwebtoken";
import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { User } from "@shared/modules/users/domain/user";
import { UserRepo } from "@shared/modules/users/repositories/interfaces/user-repo";
import { AuthUserDTO, TokenDTO } from "@shared/dtos/users/auth-user.dto";

export class AuthUserUseCase implements UseCase<AuthUserDTO, TokenDTO> {
  private readonly repo: UserRepo;

  constructor(repo: UserRepo) {
    this.repo = repo;
  }

  private async findKnownEmail(email: string): Promise<User> {
    const isUser = await this.repo.findByEmail(email);

    if (!isUser) {
      throw new CustomError("error_not_found", "user[email] not found");
    }

    return isUser;
  }

  private async verifyPassword(
    password: string,
    dbPassword: string
  ): Promise<void> {
    if (!User.comparePassword(dbPassword, password)) {
      throw new CustomError("error_bad_request", "user[password] is wrong");
    }
  }

  public async execute(userReq: AuthUserDTO): Promise<TokenDTO> {
    const user = await this.findKnownEmail(userReq.email);

    await this.verifyPassword(userReq.password, user.password);

    const token = User.generateToken({ _id: user._id });

    return { token };
  }
}
