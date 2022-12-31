import { wifiRepoInMemory } from "@modules/wifis/infra/http/in-memory";
import { FindWifiController } from "./find-wifi.controller";
import { FindWifiUseCase } from "./find-wifi.use-case";

function findWifiControllerFactory() {
  const repo = wifiRepoInMemory;
  const useCase = new FindWifiUseCase(repo);

  return new FindWifiController(useCase);
}

export const findWifiController = findWifiControllerFactory();
