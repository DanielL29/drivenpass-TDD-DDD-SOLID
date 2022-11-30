// export interface UseCase<Request, Response> {
//   create(req: Request, userId: string): Promise<Response>;
//   findAll(userId: string): Promise<Response[]>;
//   find(id: string, userId: string): Promise<Response>;
//   remove(id: string, userId: string): Promise<Response>;
// }

// export interface UseCaseUser<Request, Response> {
//   create(req: Request): Promise<Response>;
// }

// export interface UseCaseAuth<Request, Response> {
//   login(req: Request): Promise<Response>;
// }

export interface UseCase<Request, Response> {
  execute(useCaseReq?: Request, userId?: string): Promise<Response>;
}
