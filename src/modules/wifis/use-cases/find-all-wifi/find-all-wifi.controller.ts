import { BaseController } from "@core/infra/base-controller";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { FindAllWifiUseCase } from "./find-all-wifi.use-case";

export class FindAllWifiController extends BaseController {
  constructor(private readonly useCase: FindAllWifiUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const user: UserDecoded = res.locals.user;

    const wifis = await this.useCase.execute(undefined, user._id);

    this.ok<WifiDTO[]>(res, wifis);
  }
}
