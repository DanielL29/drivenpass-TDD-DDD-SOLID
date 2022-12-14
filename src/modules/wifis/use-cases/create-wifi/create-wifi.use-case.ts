import { UseCase } from "@core/domain/use-case";
import { Wifi } from "@modules/wifis/domain/wifi";
import { WifiMapper } from "@modules/wifis/mappers/wifi-mapper";
import { WifiRepo } from "@modules/wifis/repositories/interfaces/wifi-repo";
import { CreateWifiDTO } from "@shared/dtos/wifis/create-wifi.dto";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";

export class CreateWifiUseCase implements UseCase<CreateWifiDTO, WifiDTO> {
  private readonly repo: WifiRepo;
  private readonly mapper: WifiMapper;

  constructor(repo: WifiRepo) {
    this.repo = repo;
    this.mapper = new WifiMapper();
  }

  public async execute(
    useCaseReq: CreateWifiDTO,
    userId: string
  ): Promise<WifiDTO> {
    const domain = Wifi.create(useCaseReq, userId);

    await this.repo.create(domain);

    return this.mapper.toDTO(domain);
  }
}
