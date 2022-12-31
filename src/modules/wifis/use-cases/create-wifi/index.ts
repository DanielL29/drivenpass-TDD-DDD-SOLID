import { wifiRepoInMemory } from "@modules/wifis/infra/http/in-memory";
import { CreateWifiController } from "./create-wifi.controller";
import { CreateWifiUseCase } from "./create-wifi.use-case";

function createWifiControllerFactory() {
  const repo = wifiRepoInMemory;
  const useCase = new CreateWifiUseCase(repo);

  return new CreateWifiController(useCase);
}

export const createWifiController = createWifiControllerFactory();
