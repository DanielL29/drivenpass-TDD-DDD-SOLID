import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { Wifi } from "@modules/wifis/domain/wifi";
import { WifiMapper } from "@modules/wifis/mappers/wifi-mapper";
import { WifiRepo } from "@modules/wifis/repositories/interfaces/wifi-repo";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";

export class FindWifiUseCase implements UseCase<string, WifiDTO> {
  private readonly repo: WifiRepo;
  private readonly mapper: WifiMapper;

  constructor(repo: WifiRepo) {
    this.repo = repo;
    this.mapper = new WifiMapper();
  }

  private async findWifiOrFail(wifiId: string): Promise<Wifi> {
    const isWifi = await this.repo.find(wifiId);

    if (!isWifi) {
      throw new CustomError("error_not_found", "user wifi not found");
    }

    return isWifi;
  }

  public async execute(wifiId: string): Promise<WifiDTO> {
    const wifi = await this.findWifiOrFail(wifiId);

    return this.mapper.toDTO(wifi);
  }
}
