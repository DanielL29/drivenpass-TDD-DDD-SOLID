import { UseCase } from "@core/domain/use-case";
import { NoteMapper } from "@modules/notes/mappers/note-mapper";
import { NoteRepo } from "@modules/notes/repositories/interfaces/note-repo";
import { NoteDTO } from "@shared/dtos/notes/note.dto";

export class FindAllNoteUseCase implements UseCase<undefined, NoteDTO[]> {
  private readonly repo: NoteRepo;
  private readonly mapper: NoteMapper;

  constructor(repo: NoteRepo) {
    this.repo = repo;
    this.mapper = new NoteMapper();
  }

  public async execute(
    _useCaseReq?: undefined,
    userId?: string
  ): Promise<NoteDTO[]> {
    const notes = await this.repo.findAll(userId!);

    return this.mapper.bulkToDTO(notes);
  }
}
