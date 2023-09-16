import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeCommandText } from "../helpers/sanitizeCommandText";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveFollow = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { nickname, uniqueId } = data;
  console.log("Followed by", `${nickname}@${uniqueId}`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(
    ws,
    `titleraw @a title {"rawtext":[{"text":"§c§lTNT Rain"}]}`
  );
  postMinecraftCommand(
    ws,
    `titleraw @a subtitle {"rawtext":[{"text":"followed by ${sanitizeCommandText(
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
