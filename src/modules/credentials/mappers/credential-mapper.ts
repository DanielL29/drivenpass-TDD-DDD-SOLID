import dayjs from "dayjs";
import { Mapper } from "@core/infra/mapper";
import { CredentialDTO } from "@shared/dtos/credentials/credential.dto";
import { Credential } from "../domain/credential";
import { CredentialPersistence } from "../repositories/interfaces/credential-repo";

export class CredentialMapper
  implements Mapper<CredentialDTO, Credential, CredentialPersistence>
{
  public toDTO(domain: Credential): CredentialDTO {
    return {
      id: domain._id,
      title: domain.title,
      url: domain.url,
      password: domain.decryptPassword(),
      name: domain.name,
      userId: domain.userId,
      registrationDay: dayjs(domain.props.createdAt).format("DD/MM/YYYY"),
    };
  }

  public toPersistence(domain: Credential): CredentialPersistence {
    return {
      id: domain._id,
      title: domain.title,
      url: domain.url,
      name: domain.name,
      password: domain.password,
      userId: domain.userId,
      createdAt: domain.props.createdAt,
    };
  }
  public toDomain({
    id,
    title,
    url,
    name,
    password,
    userId,
    createdAt,
  }: CredentialPersistence): Credential {
    return Credential.create(
      { title, url, name, password },
      id,
      userId,
      createdAt
    );
  }
}
