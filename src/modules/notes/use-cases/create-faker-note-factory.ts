import { CreateNoteDTO } from "@shared/dtos/notes/create-note.dto";
import { faker } from "@faker-js/faker";

export function createFakeNoteDTO(): CreateNoteDTO {
  return {
    title: faker.lorem.word(6),
    note: faker.lorem.paragraph(1),
  };
}
