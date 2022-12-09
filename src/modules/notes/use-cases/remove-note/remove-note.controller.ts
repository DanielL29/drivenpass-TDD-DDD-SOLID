import { BaseController } from "@core/infra/base-controller";
import { NoteDTO } from "@shared/dtos/notes/note.dto";
import { Request, Response } from "express";
import { RemoveNoteUseCase } from "./remove-note.use-case";

export class RemoveNoteController extends BaseController {
  constructor(private readonly useCase: RemoveNoteUseCase) {
    super();
  }

  protected async executeImpl(req: Request, res: Response): Promise<void> {
    const { noteId } = req.params;

    const note = await this.useCase.execute(noteId);

    this.ok<NoteDTO>(res, note);
  }
}
