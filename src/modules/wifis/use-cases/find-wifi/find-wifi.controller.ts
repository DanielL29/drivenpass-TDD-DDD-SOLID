import { BaseController } from "@core/infra/base-controller";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";
import { Request, Response } from "express";
import { FindWifiUseCase } from "./find-wifi.use-case";

export class FindWifiController extends BaseController {
  constructor(private readonly useCase: FindWifiUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { wifiId } = req.params;

    const wifi = await this.useCase.execute(wifiId);

    this.ok<WifiDTO>(res, wifi);
  }
}
