import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveChat = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { comment, nickname, uniqueId } = data;
  console.log(`${nickname}@${uniqueId}): ${comment}`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: ${comment}`);
};
