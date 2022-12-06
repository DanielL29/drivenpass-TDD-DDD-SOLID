import { BaseController } from "@core/infra/base-controller";
import { CredentialDTO } from "@shared/dtos/credentials/credential.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { FindCredentialUseCase } from "./find-credential.use-case";

export class FindCredentialController extends BaseController {
  constructor(private readonly useCase: FindCredentialUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { credentialId } = req.params;

    const credential = await this.useCase.execute(credentialId);

    this.ok<CredentialDTO>(res, credential);
  }
}
