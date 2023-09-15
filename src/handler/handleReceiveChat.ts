import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
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
  spawnCreeper(ws, comment);
};

const spawnCreeper = async (ws: WebSocket, mobNameTag: string) => {
  postMinecraftCommand(
    ws,
    buildMobSpawnCommandAtPlayer(Mob.creeper, mobNameTag)
  );
};
