import { ExpressRoute } from "@core/infra/route";
import { createNoteController } from "@modules/notes/use-cases/create-note";
import { findAllNoteController } from "@modules/notes/use-cases/find-all-note";
import { findNoteController } from "@modules/notes/use-cases/find-note";
import { removeNoteController } from "@modules/notes/use-cases/remove-note";
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

    this.router.get(
      "/",
      TokenValidator.validateToken,
      findAllNoteController.execute
    );

    this.router.get(
      "/:noteId",
      TokenValidator.validateToken,
      findNoteController.execute
    );

    this.router.delete(
      "/:noteId",
      TokenValidator.validateToken,
      removeNoteController.execute
    );
  }
}
