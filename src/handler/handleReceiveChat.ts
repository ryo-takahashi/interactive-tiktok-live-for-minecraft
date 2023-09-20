import { spawnEntityByComment } from "../commands/spawnEntityByComment";
import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { buildSayCommand } from "../helpers/buildSayCommand";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { LiveConfig } from "../types/LiveConfig";
import { MCItem } from "../types/MCItem";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveChat = async (
  ws: WebSocket | undefined,
  data: any,
  config: LiveConfig
) => {
  const { comment, nickname, uniqueId } = data;
  if (!ws) {
    return;
  }
  spawnEntityByComment(ws, nickname, comment);
};

const spawnCreeper = async (ws: WebSocket, mobNameTag: string) => {
  executeMinecraftCommand(
    ws,
    buildMobSpawnCommandAtPlayer(Mob.creeper, mobNameTag)
  );
};
