import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeCommandText } from "../helpers/sanitizeCommandText";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveJoinLiveMember = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { nickname, uniqueId } = data;
  console.log(`${nickname}@${uniqueId} joined live`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(
    ws,
    `say §e${sanitizeCommandText(nickname)} joined the game`
  );
  spawnVillagerAtPlayer(ws, 1, nickname);
};

const spawnVillager = async (ws: WebSocket, count: number) => {
  const emptyArray = Array.from({ length: count }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.villager, { x: 0, y: 0, z: 0 })
    );
  }
};

const spawnVillagerAtPlayer = async (
  ws: WebSocket,
  count: number,
  mobNameTag: string
) => {
  const emptyArray = Array.from({ length: count }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.villager, mobNameTag)
    );
  }
};
