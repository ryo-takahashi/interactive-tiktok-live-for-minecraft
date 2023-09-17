import { buildSetRandomWorldSpawnCommand } from "../helpers/buildSetRandomWorldSpawnCommand";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { WebSocket } from "ws";

export const handleReceivePlayerDied = async (ws: WebSocket) => {
  executeMinecraftCommand(ws, buildSetRandomWorldSpawnCommand());
};
