import { User } from "@modules/users/domain/user";

export interface Repository<Model> {
  create(data: Model): Promise<Model>;
  findAll(id: string): Promise<Model[]>;
  find(id: string): Promise<Model>;
  remove(id: string): Promise<Model>;
}

export type RepositoryToAuth = Omit<
  Repository<User>,
  "findAll" | "find" | "remove"
>;
