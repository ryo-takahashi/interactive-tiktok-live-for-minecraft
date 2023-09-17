import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveShare = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { nickname, uniqueId } = data;
  console.log("Shared by", `${nickname}@${uniqueId}`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(
    ws,
    `titleraw @a title {"rawtext":[{"text":"§c§lTNT Rain"}]}`
  );
  postMinecraftCommand(
    ws,
    `titleraw @a subtitle {"rawtext":[{"text":"shared by ${sanitizeNameTagText(
      nickname
    )}"}]}`
  );
  postMinecraftCommand(ws, "playsound random.levelup @a");
  spawnTNTAtPlayer(ws, 15);
};

const spawnTNTAtPlayer = async (ws: WebSocket, count: number) => {
  const arr = Array.from({ length: count }, () => "");
  for await (const empty of arr) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    postMinecraftCommand(ws, buildMobSpawnCommandAtPlayer(Mob.tnt, "TNT Rain"));
  }
};

const spawnTNT = async (ws: WebSocket, count: number) => {
  const arr = Array.from({ length: count }, () => "");
  for await (const empty of arr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
    );
  }
};
