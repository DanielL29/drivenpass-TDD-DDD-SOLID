import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { Note } from "@modules/notes/domain/note";
import { InMemoryNoteRepo } from "@modules/notes/repositories/implements/in-memory-note-repo";
import { createFakeNoteDTO } from "../create-faker-note-factory";
import { RemoveNoteUseCase } from "./remove-note.use-case";

describe("remove note use case", () => {
  let repo: InMemoryNoteRepo;
  let sut: RemoveNoteUseCase;

  beforeEach(() => {
    repo = new InMemoryNoteRepo();
    sut = new RemoveNoteUseCase(repo);
  });

  it("should remove a user note", async () => {
    const createNoteDTO = createFakeNoteDTO();
    const userId = faker.datatype.uuid();
    const note = Note.create(createNoteDTO, userId);
    await repo.create(note);

    const result = await sut.execute(note._id);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if not found user note", async () => {
    const createNoteDTO = createFakeNoteDTO();
    const userId = faker.datatype.uuid();
    const note = Note.create(createNoteDTO, userId);

    await expect(sut.execute(note._id)).rejects.toEqual(
      new CustomError("error_not_found", "user note not found")
    );
  });
});
