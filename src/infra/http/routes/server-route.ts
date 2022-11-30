import { ExpressRoute } from "@core/infra/route";
import { CredentialRoute } from "@modules/credentials/infra/http/routes/credential-route";
import { UserRoute } from "@shared/modules/users/infra/http/routes/user-route";

export class ServerRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.use("/users", new UserRoute().router);
    this.router.use("/credentials", new CredentialRoute().router);
  }
}
