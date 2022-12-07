import { faker } from "@faker-js/faker";
import { CreateNoteProps, Note } from "./note";

function createFakeNote({ title, note }: CreateNoteProps): CreateNoteProps {
  return {
    title: title !== undefined ? title : faker.lorem.word(6),
    note: note !== undefined ? note : faker.lorem.paragraph(1),
  };
}

describe("note entity", () => {
  it("should create a note entity", async () => {
    const createNoteProps = createFakeNote({} as CreateNoteProps);
    const userId = faker.datatype.uuid();

    const note = Note.create(createNoteProps, userId);

    expect(note).toBeInstanceOf(Note);
    expect(note.title).toEqual(createNoteProps.title);
    expect(note.note).toEqual(createNoteProps.note);
    expect(note.userId).toEqual(userId);
    expect(note.props).toHaveProperty("createdAt");
    expect(note).toHaveProperty("_id");
  });

  it("should throw an error if note[title] is empty", () => {
    const createNoteProps = createFakeNote({
      title: "",
    } as CreateNoteProps);
    const userId = faker.datatype.uuid();

    expect(() => Note.create(createNoteProps, userId)).toThrow(
      "note[title] cannot be empty"
    );
  });

  it("should throw an error if note[note] is empty", () => {
    const createNoteProps = createFakeNote({
      note: "",
    } as CreateNoteProps);
    const userId = faker.datatype.uuid();

    expect(() => Note.create(createNoteProps, userId)).toThrow(
      "note[note] cannot be empty"
    );
  });

  it("should throw an error if note[title] have more than 50 characters", () => {
    const createNoteProps = createFakeNote({
      title: faker.random.alphaNumeric(51),
    } as CreateNoteProps);
    const userId = faker.datatype.uuid();

    expect(() => Note.create(createNoteProps, userId)).toThrow(
      "note[title] must have at most 50 characters length"
    );
  });

  it("should throw an error if note[note] have more than 1000 characters", () => {
    const createNoteProps = createFakeNote({
      note: faker.random.alphaNumeric(1001),
    } as CreateNoteProps);
    const userId = faker.datatype.uuid();

    expect(() => Note.create(createNoteProps, userId)).toThrow(
      "note[note] must have at most 1000 characters length"
    );
  });
});
