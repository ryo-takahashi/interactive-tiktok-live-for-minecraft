import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
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
    `titleraw @a subtitle {"rawtext":[{"text":"followed by ${sanitizeNameTagText(
      nickname
    )}"}]}`
  );
  executeMinecraftCommand(ws, "playsound random.levelup @a");
  spawnTNTAtPlayer(ws, 15);
};

const spawnTNTAtPlayer = async (ws: WebSocket, count: number) => {
  const arr = Array.from({ length: count }, () => "");
  for await (const empty of arr) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.tnt, "TNT Rain")
    );
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
