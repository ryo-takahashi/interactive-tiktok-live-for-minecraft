import { spawnEntityByComment } from "../commands/spawnEntityByComment";
import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { MCItem } from "../types/MCItem";
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
  postChat(ws, nickname, uniqueId, comment);
  spawnEntityByComment(ws, nickname, comment);
};

const spawnCreeper = async (ws: WebSocket, mobNameTag: string) => {
  postMinecraftCommand(
    ws,
    buildMobSpawnCommandAtPlayer(Mob.creeper, mobNameTag)
  );
};

const postChat = async (
  ws: WebSocket,
  nickname: string,
  uniqueId: string,
  comment: string
) => {
  postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: ${comment}`);
};
