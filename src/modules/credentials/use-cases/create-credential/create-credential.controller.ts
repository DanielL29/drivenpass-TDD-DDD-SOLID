import { BaseController } from "@core/infra/base-controller";
import { CreateCredentialProps } from "@modules/credentials/domain/credential";
import { CreateCredentialDTO } from "@shared/dtos/credentials/create-credential.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { CreateCredentialUseCase } from "./create-credential.use-case";

export class CreateCredentialController extends BaseController {
  constructor(private readonly useCase: CreateCredentialUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const user = res.locals.user as UserDecoded;
    const credentialBody = req.body as CreateCredentialProps;

    const credential = await this.useCase.execute(credentialBody, user._id);

    this.created<CreateCredentialDTO>(res, credential);
  }
}
