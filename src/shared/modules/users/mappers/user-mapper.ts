import dayjs from "dayjs";
import { Mapper } from "@core/infra/mapper";
import { UserDTO } from "@shared/dtos/users/user.dto";
import { User } from "../domain/user";
import { UserPersistence } from "../repositories/interfaces/user-repo";

export class UserMapper extends Mapper<UserDTO, User, UserPersistence> {
  public toDTO(domain: User): UserDTO {
    return {
      id: domain._id,
      name: domain.name,
      registrationDay: dayjs(domain.props.createdAt).format("DD/MM/YYYY"),
    };
  }

  public toPersistence(domain: User): UserPersistence {
    return {
      id: domain._id,
      name: domain.name,
      email: domain.email,
      password: domain.password,
      createdAt: domain.props.createdAt,
    };
  }

  public toDomain({
    id,
    name,
    email,
    password,
    createdAt,
  }: UserPersistence): User {
    return User.create({ name, email, password }, true, id, createdAt);
  }
}
