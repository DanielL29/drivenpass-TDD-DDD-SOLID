import { ExpressRoute } from "@core/infra/route";
import { createCredentialController } from "@modules/credentials/use-cases/create-credential";
import { findCredentialController } from "@modules/credentials/use-cases/find-credential";
import { findAllCredentialController } from "@modules/credentials/use-cases/find-all-credential";
import { removeCredentialController } from "@modules/credentials/use-cases/remove-credential";
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

    this.router.get(
      "/",
      TokenValidator.validateToken,
      findAllCredentialController.execute
    );

    this.router.get(
      "/:credentialId",
      TokenValidator.validateToken,
      findCredentialController.execute
    );

    this.router.delete(
      "/:credentialId",
      TokenValidator.validateToken,
      removeCredentialController.execute
    );
  }
}
