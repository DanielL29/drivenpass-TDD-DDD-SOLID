import { BaseController } from "@core/infra/base-controller";
import { CredentialDTO } from "@shared/dtos/credentials/credential.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { RemoveCredentialUseCase } from "./remove-credential.use-case";

export class RemoveCredentialController extends BaseController {
  constructor(private readonly useCase: RemoveCredentialUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { credentialId } = req.params;
    const { _id: userId } = res.locals.user as UserDecoded;

    const credential = await this.useCase.execute(credentialId, userId);

    this.ok<CredentialDTO>(res, credential);
  }
}
