import { BaseController } from "@core/infra/base-controller";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";
import { Request, Response } from "express";
import { RemoveWifiUseCase } from "./remove-wifi.use-case";

export class RemoveWifiController extends BaseController {
  constructor(private readonly useCase: RemoveWifiUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { wifiId } = req.params;

    const wifi = await this.useCase.execute(wifiId);

    this.ok<WifiDTO>(res, wifi);
  }
}
