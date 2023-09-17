import { spawnEntityByComment } from "../commands/spawnEntityByComment";
import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { MCItem } from "../types/MCItem";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveChat = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { comment, nickname, uniqueId } = data;
  if (!ws) {
    return;
  }
  postChat(ws, nickname, uniqueId, comment);
  spawnEntityByComment(ws, nickname, comment);
};

const spawnCreeper = async (ws: WebSocket, mobNameTag: string) => {
  executeMinecraftCommand(
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
  executeMinecraftCommand(
    ws,
    `say ${sanitizeNameTagText(nickname)}@${uniqueId}: ${sanitizeNameTagText(
      comment
    )}`
  );
};
