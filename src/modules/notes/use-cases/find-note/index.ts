import { noteRepoInMemory } from "@modules/notes/infra/http/in-memory";
import { FindNoteUseCase } from "./find-note.use-case";
import { FindNoteController } from "./find-note.controller";

function findNoteControllerFactory() {
  const repo = noteRepoInMemory;
  const useCase = new FindNoteUseCase(repo);

  return new FindNoteController(useCase);
}

export const findNoteController = findNoteControllerFactory();
