import { wifiRepoInMemory } from "@modules/wifis/infra/http/in-memory";
import { RemoveWifiController } from "./remove-wifi.controller";
import { RemoveWifiUseCase } from "./remove-wifi.use-case";

function removeWifiControllerFactory() {
  const repo = wifiRepoInMemory;
  const useCase = new RemoveWifiUseCase(repo);

  return new RemoveWifiController(useCase);
}

export const removeWifiController = removeWifiControllerFactory();
