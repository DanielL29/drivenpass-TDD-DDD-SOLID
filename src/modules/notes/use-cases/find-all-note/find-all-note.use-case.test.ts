import { NoteRepo } from "@modules/notes/repositories/interfaces/note-repo";
import { FindAllNoteUseCase } from "./find-all-note.use-case";
import { InMemoryNoteRepo } from "@modules/notes/repositories/implements/in-memory-note-repo";
import { createFakeNoteDTO } from "./../create-faker-note-factory";
import { faker } from "@faker-js/faker";
import { Note } from "@modules/notes/domain/note";

describe("find all notes use case", () => {
  let repo: NoteRepo;
  let sut: FindAllNoteUseCase;

  beforeEach(() => {
    repo = new InMemoryNoteRepo();
    sut = new FindAllNoteUseCase(repo);
  });

  it("should create a user note", async () => {
    const createNoteDTO = createFakeNoteDTO();
    const userId = faker.datatype.uuid();
    const note = Note.create(createNoteDTO, userId);
    await repo.create(note);

    const result = await sut.execute(undefined, userId);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty("id");
  });
});
