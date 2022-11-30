import { RepositoryToAuth } from "@core/infra/repository";
import { User } from "@shared/modules/users/domain/user";

export interface UserPersistence {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserRepo extends RepositoryToAuth {
  findByEmail(email: string): Promise<User | null>;
}
