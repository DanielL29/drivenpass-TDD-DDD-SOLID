import { ExpressRoute } from "@core/infra/route";
import { createWifiController } from "@modules/wifis/use-cases/create-wifi";
import { findAllWifiController } from "@modules/wifis/use-cases/find-all-wifi";
import { findWifiController } from "@modules/wifis/use-cases/find-wifi";
import { SchemaValidator } from "@shared/infra/http/middlewares/schema-validator";
import { TokenValidator } from "@shared/infra/http/middlewares/token-validator";

export class WifiRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.post(
      "/",
      TokenValidator.validateToken,
      SchemaValidator.validateSchema("createWifiSchema"),
      createWifiController.execute
    );

    this.router.get(
      "/",
      TokenValidator.validateToken,
      findAllWifiController.execute
    );

    this.router.get(
      "/:wifiId",
      TokenValidator.validateToken,
      findWifiController.execute
    );
  }
}
