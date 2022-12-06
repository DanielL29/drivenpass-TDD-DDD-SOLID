import { CreateNoteUseCase } from "./create-note.use-case";
import { CreateNoteController } from "./create-note.controller";
import { noteRepoInMemory } from "@modules/notes/infra/http/in-memory";

function createNoteControllerFactory() {
  const repo = noteRepoInMemory;
  const useCase = new CreateNoteUseCase(repo);

  return new CreateNoteController(useCase);
}

export const createNoteController = createNoteControllerFactory();
