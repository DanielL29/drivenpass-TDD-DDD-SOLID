import { FindAllNoteUseCase } from "./find-all-note.use-case";
import { FindAllNoteController } from "./find-all-note.controller";
import { PrismaNoteRepo } from "@modules/notes/repositories/implements/prisma-note-repo";
import { prisma } from "@infra/prisma/config";

function findAllNoteControllerFactory() {
  const repo = new PrismaNoteRepo(prisma);
  const useCase = new FindAllNoteUseCase(repo);

  return new FindAllNoteController(useCase);
}

export const findAllNoteController = findAllNoteControllerFactory();
