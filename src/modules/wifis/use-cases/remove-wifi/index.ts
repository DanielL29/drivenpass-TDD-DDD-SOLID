import { prisma } from "@infra/prisma/config";
import { PrismaWifiRepo } from "@modules/wifis/repositories/implements/prisma-wifi-repo";
import { RemoveWifiController } from "./remove-wifi.controller";
import { RemoveWifiUseCase } from "./remove-wifi.use-case";

function removeWifiControllerFactory() {
  const repo = new PrismaWifiRepo(prisma);
  const useCase = new RemoveWifiUseCase(repo);

  return new RemoveWifiController(useCase);
}

export const removeWifiController = removeWifiControllerFactory();
