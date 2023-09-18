import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { buildPlaysoundCommand } from "../helpers/buildPlaysoundCommand";
import { buildTNTRainSpawnCommandsAtPlayer } from "../helpers/buildTNTRainSpawnCommandAtPlayer";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { MCSound } from "../types/MCSound";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveFollow = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { nickname, uniqueId } = data;
  if (!ws) {
    return;
  }
  executeMinecraftCommand(
    ws,
    `titleraw @a title {"rawtext":[{"text":"§c§lTNT Rain"}]}`
  );
  executeMinecraftCommand(
    ws,
    `titleraw @a subtitle {"rawtext":[{"text":"${sanitizeNameTagText(
      nickname
    )}がフォローしました"}]}`
  );
  executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.levelup));
  spawnTNTRainAtPlayer(ws);
};

const spawnTNTRainAtPlayer = async (ws: WebSocket) => {
  const commands = buildTNTRainSpawnCommandsAtPlayer();
  for await (const command of commands) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.click));
    executeMinecraftCommand(ws, command);
  }
};

const spawnTNT = async (ws: WebSocket, count: number) => {
  const arr = Array.from({ length: count }, () => "");
  for await (const empty of arr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
    );
  }
};
