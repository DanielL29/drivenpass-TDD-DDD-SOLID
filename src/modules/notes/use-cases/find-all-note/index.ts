import { noteRepoInMemory } from "@modules/notes/infra/http/in-memory";
import { FindAllNoteUseCase } from "./find-all-note.use-case";
import { FindAllNoteController } from "./find-all-note.controller";

function findAllNoteControllerFactory() {
  const repo = noteRepoInMemory;
  const useCase = new FindAllNoteUseCase(repo);

  return new FindAllNoteController(useCase);
}

export const findAllNoteController = findAllNoteControllerFactory();
