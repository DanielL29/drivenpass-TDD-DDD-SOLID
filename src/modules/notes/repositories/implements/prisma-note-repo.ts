import { Note } from "@modules/notes/domain/note";
import { NoteMapper } from "@modules/notes/mappers/note-mapper";
import { NoteRepo } from "@modules/notes/repositories/interfaces/note-repo";
import { PrismaDatabase } from "@infra/prisma/config";

export class PrismaNoteRepo implements NoteRepo {
  private readonly prisma: PrismaDatabase;
  private readonly mapper: NoteMapper;

  constructor(prisma: PrismaDatabase) {
    this.prisma = prisma;
    this.mapper = new NoteMapper();
  }

  public async findByTitle(
    title: string,
    userId: string
  ): Promise<Note | null> {
    const persistenceNote = await this.prisma.note.findUnique({
      where: { title_userId: { title, userId } },
    });

    if (!persistenceNote) {
      return null;
    }

    return this.mapper.toDomain(persistenceNote);
  }

  public async create(data: Note): Promise<Note> {
    const persistenceData = this.mapper.toPersistence(data);

    await this.prisma.note.create({ data: persistenceData });

    return this.mapper.toDomain(persistenceData);
  }

  public async findAll(userId: string): Promise<Note[]> {
    const persistenceNotes = await this.prisma.note.findMany({
      where: { userId },
    });

    return this.mapper.bulkToDomain(persistenceNotes);
  }

  public async find(id: string): Promise<Note | null> {
    const persistenceNote = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!persistenceNote) {
      return null;
    }

    return this.mapper.toDomain(persistenceNote);
  }

  public async remove(id: string): Promise<Note | null> {
    const persistenceNote = await this.prisma.note.delete({ where: { id } });

    return this.mapper.toDomain(persistenceNote);
  }
}
