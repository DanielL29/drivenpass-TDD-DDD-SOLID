export abstract class Mapper<DTO, Model, Persistence> {
  public abstract toDTO(domain: Model): DTO;
  public abstract toPersistence(domain: Model): Persistence;
  public abstract toDomain(persistence: Persistence): Model;
  public abstract bulkToDomain(persistences: Persistence[]): Model[];
  public abstract bulkToDTO(domains: Model[]): DTO[];
}
