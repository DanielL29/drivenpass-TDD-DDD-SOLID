import { CustomError } from "@core/logic/error";
import { faker } from "@faker-js/faker";
import { InMemoryNoteRepo } from "@modules/notes/repositories/implements/in-memory-note-repo";
import { NoteRepo } from "@modules/notes/repositories/interfaces/note-repo";
import { createFakeNoteDTO } from "../create-faker-note-factory";
import { CreateNoteUseCase } from "./create-note.use-case";

describe("create note use case", () => {
  let repo: NoteRepo;
  let sut: CreateNoteUseCase;

  beforeEach(() => {
    repo = new InMemoryNoteRepo();
    sut = new CreateNoteUseCase(repo);
  });

  it("should create user note", async () => {
    const createNoteReq = createFakeNoteDTO();
    const userId = faker.datatype.uuid();

    const result = await sut.execute(createNoteReq, userId);

    expect(result).toHaveProperty("id");
  });

  it("should throw an error if user note[title] is already registered", async () => {
    const createNoteReq = createFakeNoteDTO();
    const userId = faker.datatype.uuid();
    await sut.execute(createNoteReq, userId);

    await expect(sut.execute(createNoteReq, userId)).rejects.toEqual(
      new CustomError(
        "error_conflict",
        "user note[title] is already registered"
      )
    );
  });
});
