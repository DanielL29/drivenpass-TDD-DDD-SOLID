import { User } from "@shared/modules/users/domain/user";

export interface Repository<Model> {
  create(data: Model): Promise<Model>;
  findAll(userId: string): Promise<Model[]>;
  find(id: string, userId: string): Promise<Model | null>;
  remove(id: string, userId: string): Promise<Model | null>;
}

export type RepositoryToAuth = Omit<
  Repository<User>,
  "findAll" | "find" | "remove"
>;
