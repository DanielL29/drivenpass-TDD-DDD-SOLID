import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { Credential } from "@modules/credentials/domain/credential";
import { CredentialMapper } from "@modules/credentials/mappers/credential-mapper";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { CreateCredentialDTO } from "@shared/dtos/credentials/create-credential.dto";
import { CredentialDTO } from "@shared/dtos/credentials/credential.dto";

export class CreateCredentialUseCase
  implements UseCase<CreateCredentialDTO, CredentialDTO>
{
  private readonly repo: CredentialRepo;
  private readonly mapper: CredentialMapper;

  constructor(repo: CredentialRepo) {
    this.repo = repo;
    this.mapper = new CredentialMapper();
  }

  private async verifyTitleConflict(
    title: string,
    userId: string
  ): Promise<void> {
    const isCredential = await this.repo.findByTitle(title, userId);

    if (isCredential) {
      throw new CustomError(
        "error_conflict",
        "credential[title] is already registered"
      );
    }
  }

  public async execute(
    req: CreateCredentialDTO,
    userId: string
  ): Promise<CredentialDTO> {
    await this.verifyTitleConflict(req.title, userId);

    const domainCredential = Credential.create({ ...req }, userId);

    await this.repo.create(domainCredential);

    return this.mapper.toDTO(domainCredential);
  }
}
