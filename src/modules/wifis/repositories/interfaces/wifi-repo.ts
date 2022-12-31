import { Repository } from "@core/infra/repository";
import { Wifi } from "@modules/wifis/domain/wifi";

export interface WifiPersistence {
  id: string;
  title: string;
  name: string;
  password: string;
  userId: string;
  createdAt: Date;
}

export interface WifiRepo extends Repository<Wifi> {
  findByTitle(title: string, userId: string): Promise<Wifi | null>;
}
