import { BaseController } from "@core/infra/base-controller";
import { CredentialDTO } from "@shared/dtos/credentials/credential.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { FindAllCredentialUseCase } from "./find-all-credential.use-case";

export class FindAllCredentialController extends BaseController {
  constructor(private readonly useCase: FindAllCredentialUseCase) {
    super();
  }

  protected async executeImpl(_req: Request, res: Response): Promise<void> {
    const { _id: userId } = res.locals.user as UserDecoded;

    const credentials = await this.useCase.execute(undefined, userId);

    this.ok<CredentialDTO[]>(res, credentials);
  }
}
