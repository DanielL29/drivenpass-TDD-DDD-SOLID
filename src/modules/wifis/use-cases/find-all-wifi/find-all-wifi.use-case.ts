import { UseCase } from "@core/domain/use-case";
import { WifiMapper } from "@modules/wifis/mappers/wifi-mapper";
import { WifiRepo } from "@modules/wifis/repositories/interfaces/wifi-repo";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";

export class FindAllWifiUseCase implements UseCase<undefined, WifiDTO[]> {
  private readonly repo: WifiRepo;
  private readonly mapper: WifiMapper;

  constructor(repo: WifiRepo) {
    this.repo = repo;
    this.mapper = new WifiMapper();
  }

  public async execute(
    _useCaseReq: undefined,
    userId: string
  ): Promise<WifiDTO[]> {
    const wifis = await this.repo.findAll(userId);

    return this.mapper.bulkToDTO(wifis);
  }
}
