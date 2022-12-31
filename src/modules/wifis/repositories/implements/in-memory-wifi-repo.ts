import { Wifi } from "@modules/wifis/domain/wifi";
import { WifiMapper } from "@modules/wifis/mappers/wifi-mapper";
import { WifiPersistence, WifiRepo } from "../interfaces/wifi-repo";

export class InMemoryWifiRepo implements WifiRepo {
  private wifis: WifiPersistence[];
  private readonly mapper: WifiMapper;

  constructor() {
    this.wifis = [];
    this.mapper = new WifiMapper();
  }

  public async findByTitle(
    title: string,
    userId: string
  ): Promise<Wifi | null> {
    const isWifi = this.wifis.find(
      (wifi) => wifi.title === title && wifi.userId === userId
    );

    if (!isWifi) {
      return null;
    }

    return this.mapper.toDomain(isWifi);
  }

  public async create(data: Wifi): Promise<Wifi> {
    const wifiPersistence = this.mapper.toPersistence(data);

    this.wifis.push(wifiPersistence);

    return this.mapper.toDomain(wifiPersistence);
  }

  public async findAll(userId: string): Promise<Wifi[]> {
    const wifiPersistences = this.wifis.filter(
      (wifi) => wifi.userId === userId
    );

    return this.mapper.bulkToDomain(wifiPersistences);
  }

  public async find(id: string): Promise<Wifi | null> {
    const isWifiPersistence = this.wifis.find((wifi) => wifi.id === id);

    if (!isWifiPersistence) {
      return null;
    }

    return this.mapper.toDomain(isWifiPersistence);
  }

  remove(id: string): Promise<Wifi | null> {
    throw new Error("Method not implemented.");
  }
}
