import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UseCaseAuth } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { User } from "@modules/users/domain/user";
import { UserRepo } from "@modules/users/repositories/interfaces/user-repo";
import { AuthUserDTO, TokenDTO } from "@shared/dtos/users/auth-user.dto";

export class AuthUserUseCase implements UseCaseAuth<AuthUserDTO, TokenDTO> {
  private readonly repo: UserRepo;
  private secretKey = process.env.JWT_SECRET!;

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
    if (!bcrypt.compareSync(password, dbPassword)) {
      throw new CustomError("error_bad_request", "user[password] is wrong");
    }
  }

  public async login(userReq: AuthUserDTO): Promise<TokenDTO> {
    const user = await this.findKnownEmail(userReq.email);

    await this.verifyPassword(userReq.password, user.password);

    const token = jwt.sign({ id: user._id }, this.secretKey, {
      expiresIn: "1d",
    });

    return { token };
  }
}
