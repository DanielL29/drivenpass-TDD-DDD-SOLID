import { BaseController } from "@core/infra/base-controller";
import { CreateWifiDTO } from "@shared/dtos/wifis/create-wifi.dto";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { CreateWifiUseCase } from "./create-wifi.use-case";

export class CreateWifiController extends BaseController {
  constructor(private readonly useCase: CreateWifiUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const wifiReq: CreateWifiDTO = req.body;
    const user: UserDecoded = res.locals.user;

    const wifi = await this.useCase.execute(wifiReq, user._id);

    this.created<WifiDTO>(res, wifi);
  }
}
