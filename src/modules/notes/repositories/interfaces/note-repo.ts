import { Repository } from "@core/infra/repository";
import { Note } from "@modules/notes/domain/note";

export interface NotePersistence {
  id: string;
  title: string;
  note: string;
  userId: string;
  createdAt: Date;
}

export interface NoteRepo extends Repository<Note> {
  findByTitle(title: string, userId: string): Promise<Note | null>;
}
