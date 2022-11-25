import { ExpressRoute } from "@core/infra/route";
import { authUserController } from "@modules/users/use-cases/auth-user";
import { createUserController } from "@modules/users/use-cases/create-user";
import { SchemaValidator } from "@shared/infra/http/middlewares/request-schema-handler";

export class UserRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.post(
      "/sign-up",
      SchemaValidator.validateSchema("createUserSchema"),
      createUserController.execute
    );
    this.router.post(
      "/sign-in",
      SchemaValidator.validateSchema("authUserSchema"),
      authUserController.execute
    );
  }
}
