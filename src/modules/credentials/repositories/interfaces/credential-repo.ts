import { Repository } from "@core/infra/repository";
import { Credential } from "@modules/credentials/domain/credential";

export interface CredentialPersistence {
  id: string;
  title: string;
  url: string;
  name: string;
  password: string;
  userId: string;
  createdAt: Date;
}

export interface CredentialRepo extends Repository<Credential> {
  findByTitle(title: string, userId: string): Promise<Credential | null>;
}
