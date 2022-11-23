import { BaseController } from "@core/infra/base-controller";
import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { UserDTO } from "@shared/dtos/users/user.dto";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./create-user.use-case";

export class CreateUserController extends BaseController {
  constructor(private readonly useCase: CreateUserUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const createUserReq: CreateUserDTO = req.body;

    const userDTO = await this.useCase.create(createUserReq);

    this.created<UserDTO>(res, userDTO);
  }
}
