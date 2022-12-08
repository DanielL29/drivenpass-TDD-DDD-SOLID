import { Note } from "@modules/notes/domain/note";
import { NoteMapper } from "@modules/notes/mappers/note-mapper";
import { NotePersistence, NoteRepo } from "../interfaces/note-repo";

export class InMemoryNoteRepo implements NoteRepo {
  private notes: NotePersistence[];
  private readonly mapper: NoteMapper;

  constructor() {
    this.notes = [];
    this.mapper = new NoteMapper();
  }

  public async findByTitle(
    title: string,
    userId: string
  ): Promise<Note | null> {
    const isMemoryNote = this.notes.find(
      (note) => note.title === title && note.userId === userId
    );

    if (!isMemoryNote) {
      return null;
    }

    return this.mapper.toDomain(isMemoryNote);
  }

  public async create(data: Note): Promise<Note> {
    const persistenceNote = this.mapper.toPersistence(data);

    this.notes.push(persistenceNote);

    return this.mapper.toDomain(persistenceNote);
  }

  public async findAll(userId: string): Promise<Note[]> {
    const notes = this.notes.filter((note) => note.userId === userId);

    return this.mapper.bulkToDomain(notes);
  }

  public async find(id: string): Promise<Note | null> {
    const isNote = this.notes.find((note) => note.id === id);

    if (!isNote) {
      return null;
    }

    return this.mapper.toDomain(isNote);
  }

  public async remove(id: string): Promise<Note | null> {
    throw new Error("Method not implemented.");
  }
}
