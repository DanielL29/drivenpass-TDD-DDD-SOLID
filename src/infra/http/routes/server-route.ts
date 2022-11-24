import { ExpressRoute } from "@core/infra/route";
import { UserRoute } from "@modules/users/infra/http/routes/user-route";

export class ServerRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.use("/users", new UserRoute().router);
  }
}
