import { buildSetRandomWorldSpawnCommand } from "../helpers/buildSetRandomWorldSpawnCommand";
import { fetchLiveConfig } from "../helpers/fetchLiveConfig";

import { CommandExecutor } from "../manager/CommandExecutor";

export const handleReceivePlayerDied = async () => {
  const config = fetchLiveConfig();
  if (config.random_respawn) {
    CommandExecutor.instance.execute(buildSetRandomWorldSpawnCommand());
  }
};
