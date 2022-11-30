import { ExpressRoute } from "@core/infra/route";
import { createCredentialController } from "@modules/credentials/use-cases/create-credential";
import { SchemaValidator } from "@shared/infra/http/middlewares/schema-validator";
import { TokenValidator } from "@shared/infra/http/middlewares/token-validator";

export class CredentialRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.post(
      "/",
      TokenValidator.validateToken,
      SchemaValidator.validateSchema("createCredentialSchema"),
      createCredentialController.execute
    );
  }
}
