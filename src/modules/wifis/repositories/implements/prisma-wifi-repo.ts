import { PrismaDatabase } from "@infra/prisma/config";
import { Wifi } from "@modules/wifis/domain/wifi";
import { WifiMapper } from "@modules/wifis/mappers/wifi-mapper";
import { WifiRepo } from "../interfaces/wifi-repo";

export class PrismaWifiRepo implements WifiRepo {
  private readonly prisma: PrismaDatabase;
  private readonly mapper: WifiMapper;

  constructor(prisma: PrismaDatabase) {
    this.prisma = prisma;
    this.mapper = new WifiMapper();
  }

  public async create(data: Wifi): Promise<Wifi> {
    const persistenceData = this.mapper.toPersistence(data);

    await this.prisma.wifi.create({ data: persistenceData });

    return this.mapper.toDomain(persistenceData);
  }

  public async findAll(userId: string): Promise<Wifi[]> {
    const persistenceWifis = await this.prisma.wifi.findMany({
      where: { userId },
    });

    return this.mapper.bulkToDomain(persistenceWifis);
  }

  public async find(id: string): Promise<Wifi | null> {
    const persistenceWifi = await this.prisma.wifi.findUnique({
      where: { id },
    });

    if (!persistenceWifi) {
      return null;
    }

    return this.mapper.toDomain(persistenceWifi);
  }

  public async remove(id: string): Promise<Wifi | null> {
    const persistenceWifi = await this.prisma.wifi.delete({ where: { id } });

    return this.mapper.toDomain(persistenceWifi);
  }
}
