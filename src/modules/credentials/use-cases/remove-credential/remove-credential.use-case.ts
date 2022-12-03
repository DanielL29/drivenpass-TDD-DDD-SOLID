import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { Credential } from "@modules/credentials/domain/credential";
import { CredentialMapper } from "@modules/credentials/mappers/credential-mapper";
import { CredentialRepo } from "@modules/credentials/repositories/interfaces/credential-repo";
import { CredentialDTO } from "@shared/dtos/credentials/credential.dto";

export class RemoveCredentialUseCase implements UseCase<string, CredentialDTO> {
  private readonly repo: CredentialRepo;
  private readonly mapper: CredentialMapper;

  constructor(repo: CredentialRepo) {
    this.repo = repo;
    this.mapper = new CredentialMapper();
  }

  private async findCredentialOrFail(
    credentialId: string
  ): Promise<Credential> {
    const isCredential = await this.repo.find(credentialId);
    if (!isCredential) {
      throw new CustomError(
        "error_not_found",
        "user credential not found or credential does not belong to user"
      );
    }

    return isCredential;
  }

  public async execute(credentialId: string): Promise<CredentialDTO> {
    const credential = await this.findCredentialOrFail(credentialId);

    await this.repo.remove(credentialId);

    return this.mapper.toDTO(credential);
  }
}
