import { ExpressRoute } from "@core/infra/route";
import { createNoteController } from "@modules/notes/use-cases/create-note";
import { SchemaValidator } from "@shared/infra/http/middlewares/schema-validator";
import { TokenValidator } from "@shared/infra/http/middlewares/token-validator";

export class NoteRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.post(
      "/",
      TokenValidator.validateToken,
      SchemaValidator.validateSchema("createNoteSchema"),
      createNoteController.execute
    );
  }
}
