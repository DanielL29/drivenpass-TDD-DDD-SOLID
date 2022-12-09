import { FindNoteUseCase } from "./find-note.use-case";
import { FindNoteController } from "./find-note.controller";
import { PrismaNoteRepo } from "@modules/notes/repositories/implements/prisma-note-repo";
import { prisma } from "@infra/prisma/config";

function findNoteControllerFactory() {
  const repo = new PrismaNoteRepo(prisma);
  const useCase = new FindNoteUseCase(repo);

  return new FindNoteController(useCase);
}

export const findNoteController = findNoteControllerFactory();
