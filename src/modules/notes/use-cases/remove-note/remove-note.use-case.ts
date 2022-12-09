import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { Note } from "@modules/notes/domain/note";
import { NoteMapper } from "@modules/notes/mappers/note-mapper";
import { NoteRepo } from "@modules/notes/repositories/interfaces/note-repo";
import { NoteDTO } from "@shared/dtos/notes/note.dto";

export class RemoveNoteUseCase implements UseCase<string, NoteDTO> {
  private readonly repo: NoteRepo;
  private readonly mapper: NoteMapper;

  constructor(repo: NoteRepo) {
    this.repo = repo;
    this.mapper = new NoteMapper();
  }

  private async findNoteOrFail(noteId: string): Promise<Note> {
    const isNote = await this.repo.find(noteId);

    if (!isNote) {
      throw new CustomError(
        "error_not_found",
        "user note not found or note does not belong to user"
      );
    }

    return isNote;
  }

  public async execute(noteId: string): Promise<NoteDTO> {
    const note = await this.findNoteOrFail(noteId);

    await this.repo.remove(noteId);

    return this.mapper.toDTO(note);
  }
}
