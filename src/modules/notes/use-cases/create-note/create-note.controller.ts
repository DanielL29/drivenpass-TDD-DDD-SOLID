import { BaseController } from "@core/infra/base-controller";
import { CreateNoteDTO } from "@shared/dtos/notes/create-note.dto";
import { NoteDTO } from "@shared/dtos/notes/note.dto";
import { UserDecoded } from "@shared/infra/http/middlewares/token-validator";
import { Request, Response } from "express";
import { CreateNoteUseCase } from "./create-note.use-case";

export class CreateNoteController extends BaseController {
  constructor(private readonly useCase: CreateNoteUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const noteReq: CreateNoteDTO = req.body;
    const user: UserDecoded = res.locals.user;

    const note = await this.useCase.execute(noteReq, user._id);

    this.created<NoteDTO>(res, note);
  }
}
