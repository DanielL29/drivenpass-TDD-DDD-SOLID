import { BaseController } from "@core/infra/base-controller";
import { AuthUserDTO, TokenDTO } from "@shared/dtos/users/auth-user.dto";
import { Request, Response } from "express";
import { AuthUserUseCase } from "./auth-user.use-case";

export class AuthUserController extends BaseController {
  constructor(private readonly useCase: AuthUserUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const authUserBody: AuthUserDTO = req.body;

    const tokenBody = await this.useCase.execute(authUserBody);

    this.ok<TokenDTO>(res, tokenBody);
  }
}
