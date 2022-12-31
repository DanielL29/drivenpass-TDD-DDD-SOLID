import { wifiRepoInMemory } from "@modules/wifis/infra/http/in-memory";
import { FindAllWifiController } from "./find-all-wifi.controller";
import { FindAllWifiUseCase } from "./find-all-wifi.use-case";

function findAllWifiControllerFactory() {
  const repo = wifiRepoInMemory;
  const useCase = new FindAllWifiUseCase(repo);

  return new FindAllWifiController(useCase);
}

export const findAllWifiController = findAllWifiControllerFactory();
