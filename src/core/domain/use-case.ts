import { CreateUserDTO } from "@shared/dtos/users/create-user.dto";
import { UserDTO } from "@shared/dtos/users/user.dto";

export interface UseCase<Request, Response> {
  create(req: Request): Promise<Response>;
  findAll(id: string): Promise<Response[]>;
  find(id: string): Promise<Response>;
  remove(id: string): Promise<Response>;
}

export interface UseCaseUser<Request, Response> {
  create(req: Request): Promise<Response>;
}

export interface UseCaseAuth<Request, Response> {
  login(req: Request): Promise<Response>;
}
