import { noteRepoInMemory } from "@modules/notes/infra/http/in-memory";
import { RemoveNoteController } from "./remove-note.controller";
import { RemoveNoteUseCase } from "./remove-note.use-case";

function removeNoteControllerFactory() {
  const repo = noteRepoInMemory;
  const useCase = new RemoveNoteUseCase(repo);

  return new RemoveNoteController(useCase);
}

export const removeNoteController = removeNoteControllerFactory();
