import { CreateNoteUseCase } from "./create-note.use-case";
import { CreateNoteController } from "./create-note.controller";
import { PrismaNoteRepo } from "@modules/notes/repositories/implements/prisma-note-repo";
import { prisma } from "@infra/prisma/config";

function createNoteControllerFactory() {
  const repo = new PrismaNoteRepo(prisma);
  const useCase = new CreateNoteUseCase(repo);

  return new CreateNoteController(useCase);
}

export const createNoteController = createNoteControllerFactory();
