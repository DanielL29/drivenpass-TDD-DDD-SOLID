import { ExpressRoute } from "@core/infra/route";
import { createCardController } from "@modules/cards/use-cases/create-card";
import { findAllCardController } from "@modules/cards/use-cases/find-all-card";
import { findCardController } from "@modules/cards/use-cases/find-card";
import { SchemaValidator } from "@shared/infra/http/middlewares/schema-validator";
import { TokenValidator } from "@shared/infra/http/middlewares/token-validator";

export class CardRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.post(
      "/",
      TokenValidator.validateToken,
      SchemaValidator.validateSchema("createCardSchema"),
      createCardController.execute
    );

    this.router.get(
      "/",
      TokenValidator.validateToken,
      findAllCardController.execute
    );

    this.router.get(
      "/:cardId",
      TokenValidator.validateToken,
      findCardController.execute
    );
  }
}
