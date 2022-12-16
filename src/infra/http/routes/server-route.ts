import { ExpressRoute } from "@core/infra/route";
import { CardRoute } from "@modules/cards/infra/http/routes/card-route";
import { CredentialRoute } from "@modules/credentials/infra/http/routes/credential-route";
import { NoteRoute } from "@modules/notes/infra/http/routes/note-route";
import { UserRoute } from "@shared/modules/users/infra/http/routes/user-route";

export class ServerRoute extends ExpressRoute {
  public useRouter(): void {
    this.router.use("/users", new UserRoute().router);
    this.router.use("/credentials", new CredentialRoute().router);
    this.router.use("/notes", new NoteRoute().router);
    this.router.use("/cards", new CardRoute().router);
  }
}
