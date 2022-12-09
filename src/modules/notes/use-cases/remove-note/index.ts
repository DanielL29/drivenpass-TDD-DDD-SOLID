import { prisma } from "@infra/prisma/config";
import { PrismaNoteRepo } from "@modules/notes/repositories/implements/prisma-note-repo";
import { RemoveNoteController } from "./remove-note.controller";
import { RemoveNoteUseCase } from "./remove-note.use-case";

function removeNoteControllerFactory() {
  const repo = new PrismaNoteRepo(prisma);
  const useCase = new RemoveNoteUseCase(repo);

  return new RemoveNoteController(useCase);
}

export const removeNoteController = removeNoteControllerFactory();
