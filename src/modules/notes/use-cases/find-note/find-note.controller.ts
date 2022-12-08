import { BaseController } from "@core/infra/base-controller";
import { NoteDTO } from "@shared/dtos/notes/note.dto";
import { Request, Response } from "express";
import { FindNoteUseCase } from "./find-note.use-case";

export class FindNoteController extends BaseController {
  constructor(private readonly useCase: FindNoteUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { noteId } = req.params;

    const note = await this.useCase.execute(noteId);

    this.ok<NoteDTO>(res, note);
  }
}
