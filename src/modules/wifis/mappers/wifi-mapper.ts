import { Mapper } from "@core/infra/mapper";
import { WifiDTO } from "@shared/dtos/wifis/wifi.dto";
import dayjs from "dayjs";
import { Wifi } from "../domain/wifi";
import { WifiPersistence } from "../repositories/interfaces/wifi-repo";

export class WifiMapper implements Mapper<WifiDTO, Wifi, WifiPersistence> {
  public toDTO(domain: Wifi): WifiDTO {
    return {
      id: domain._id,
      title: domain.title,
      name: domain.name,
      password: domain.decryptPassword(),
      userId: domain.userId,
      registrationDay: dayjs(domain.props.createdAt).format("DD/MM/YYYY"),
    };
  }
  public toPersistence(domain: Wifi): WifiPersistence {
    return {
      id: domain._id,
      title: domain.title,
      name: domain.name,
      password: domain.password,
      userId: domain.userId,
      createdAt: domain.props.createdAt,
    };
  }
  public toDomain({
    id,
    title,
    name,
    password,
    userId,
    createdAt,
  }: WifiPersistence): Wifi {
    return Wifi.create({ title, name, password }, userId, true, id, createdAt);
  }
  public bulkToDomain(persistences: WifiPersistence[]): Wifi[] {
    const mapper = new WifiMapper();

    return persistences.map((persistence) => mapper.toDomain(persistence));
  }
  public bulkToDTO(domains: Wifi[]): WifiDTO[] {
    const mapper = new WifiMapper();

    return domains.map((domain) => mapper.toDTO(domain));
  }
}
