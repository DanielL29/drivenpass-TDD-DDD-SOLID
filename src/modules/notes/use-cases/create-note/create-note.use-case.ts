import { UseCase } from "@core/domain/use-case";
import { CustomError } from "@core/logic/error";
import { Note } from "@modules/notes/domain/note";
import { NoteMapper } from "@modules/notes/mappers/note-mapper";
import { NoteRepo } from "@modules/notes/repositories/interfaces/note-repo";
import { CreateNoteDTO } from "@shared/dtos/notes/create-note.dto";
import { NoteDTO } from "@shared/dtos/notes/note.dto";

export class CreateNoteUseCase implements UseCase<CreateNoteDTO, NoteDTO> {
  private readonly repo: NoteRepo;
  private readonly mapper: NoteMapper;

  constructor(repo: NoteRepo) {
    this.repo = repo;
    this.mapper = new NoteMapper();
  }

  private async verifyExistingTitle(
    title: string,
    userId: string
  ): Promise<void> {
    const isNote = await this.repo.findByTitle(title, userId);
    if (isNote) {
      throw new CustomError(
        "error_conflict",
        "user note[title] is already registered"
      );
    }
  }

  public async execute(
    useCaseReq: CreateNoteDTO,
    userId: string
  ): Promise<NoteDTO> {
    await this.verifyExistingTitle(useCaseReq.title, userId);

    const note = Note.create(useCaseReq, userId);
    const createdNote = await this.repo.create(note);

    return this.mapper.toDTO(createdNote);
  }
}
