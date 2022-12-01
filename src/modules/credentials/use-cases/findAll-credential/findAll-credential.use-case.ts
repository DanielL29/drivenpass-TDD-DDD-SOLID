import { UseCase } from "@core/domain/use-case";
import { CredentialMapper } from "@modules/credentials/mappers/credential-mapper";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { CredentialDTO } from "@shared/dtos/credentials/credential.dto";

export class FindAllCredentialUseCase
  implements UseCase<undefined, CredentialDTO[]>
{
  private readonly repo: CredentialRepo;
  private readonly mapper: CredentialMapper;

  constructor(repo: CredentialRepo) {
    this.repo = repo;
    this.mapper = new CredentialMapper();
  }

  public async execute(
    _req: undefined,
    userId: string
  ): Promise<CredentialDTO[]> {
    const credentials = await this.repo.findAll(userId);

    return this.mapper.bulkToDTO(credentials);
  }
}
