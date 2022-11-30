import { Credential } from "@modules/credentials/domain/credential";
import { CredentialMapper } from "@modules/credentials/mappers/credential-mapper";
import {
  CredentialPersistence,
  CredentialRepo,
} from "../interfaces/credential-repo";

export class InMemoryCredentialRepo implements CredentialRepo {
  private readonly credentials: CredentialPersistence[];
  private readonly mapper: CredentialMapper;

  constructor() {
    this.credentials = [];
    this.mapper = new CredentialMapper();
  }

  public async findByTitle(
    title: string,
    userId: string
  ): Promise<Credential | null> {
    const isMemoryCredential = this.credentials.find(
      (credential) => credential.title === title && credential.userId === userId
    );

    if (!isMemoryCredential) {
      return null;
    }

    return this.mapper.toDomain(isMemoryCredential);
  }

  public async create(data: Credential): Promise<Credential> {
    const credentialToMemory = this.mapper.toPersistence(data);

    this.credentials.push(credentialToMemory);

    return this.mapper.toDomain(credentialToMemory);
  }

  public async findAll(userId: string): Promise<Credential[]> {
    return this.credentials
      .map((credential) => this.mapper.toDomain(credential))
      .filter((credential) => credential.userId === userId);
  }

  public async find(id: string, userId: string): Promise<Credential | null> {
    const isMemoryCredential = this.credentials.find(
      (credential) => credential.userId === userId && credential.id === id
    );

    if (!isMemoryCredential) {
      return null;
    }

    return this.mapper.toDomain(isMemoryCredential);
  }

  public async remove(id: string, userId: string): Promise<Credential | null> {
    const isMemoryCredential = this.credentials.findIndex(
      (credential) => credential.userId === userId && credential.id === id
    );

    if (!isMemoryCredential) {
      return null;
    }

    this.credentials.splice(isMemoryCredential, 1);

    return this.mapper.toDomain(this.credentials[isMemoryCredential]);
  }
}
