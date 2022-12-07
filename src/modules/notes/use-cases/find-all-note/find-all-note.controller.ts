import { BaseController } from "@core/infra/base-controller";
import { NoteDTO } from "@shared/dtos/notes/note.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { FindAllNoteUseCase } from "./find-all-note.use-case";

export class FindAllNoteController extends BaseController {
  constructor(private readonly useCase: FindAllNoteUseCase) {
    super();
  }

  protected async executeImpl(_req: Request, res: Response): Promise<void> {
    const user: UserDecoded = res.locals.user;

    const notes = await this.useCase.execute(undefined, user._id);

    this.ok<NoteDTO>(res, notes);
  }
}
