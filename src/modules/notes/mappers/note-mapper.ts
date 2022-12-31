import dayjs from "dayjs";
import { Mapper } from "@core/infra/mapper";
import { NoteDTO } from "@shared/dtos/notes/note.dto";
import { Note } from "../domain/note";
import { NotePersistence } from "../repositories/interfaces/note-repo";

export class NoteMapper implements Mapper<NoteDTO, Note, NotePersistence> {
  public toDTO(domain: Note): NoteDTO {
    return {
      id: domain._id,
      title: domain.title,
      note: domain.note,
      userId: domain.userId,
      registrationDay: dayjs(domain.props.createdAt).format("DD/MM/YYYY"),
    };
  }

  public toPersistence(domain: Note): NotePersistence {
    return {
      id: domain._id,
      title: domain.title,
      note: domain.note,
      userId: domain.userId,
      createdAt: domain.props.createdAt,
    };
  }

  public toDomain({
    id,
    title,
    note,
    userId,
    createdAt,
  }: NotePersistence): Note {
    return Note.create({ title, note }, userId, id, createdAt);
  }

  public bulkToDomain(persistences: NotePersistence[]): Note[] {
    const noteMapper = new NoteMapper();

    return persistences.map((persistence) => noteMapper.toDomain(persistence));
  }

  public bulkToDTO(domains: Note[]): NoteDTO[] {
    const noteMapper = new NoteMapper();

    return domains.map((domain) => noteMapper.toDTO(domain));
  }
}
