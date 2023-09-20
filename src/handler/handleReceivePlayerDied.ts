import { buildSetRandomWorldSpawnCommand } from "../helpers/buildSetRandomWorldSpawnCommand";
import { fetchLiveConfig } from "../helpers/fetchLiveConfig";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { WebSocket } from "ws";

export const handleReceivePlayerDied = async (ws: WebSocket) => {
  const config = fetchLiveConfig();
  if (config.random_respawn) {
    executeMinecraftCommand(ws, buildSetRandomWorldSpawnCommand());
  }
};
