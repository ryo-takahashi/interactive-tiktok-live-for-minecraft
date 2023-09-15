import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveLike = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { likeCount, nickname, uniqueId, totalLikeCount } = data;
  console.log(
    `${nickname}@${uniqueId}): likeCount = ${likeCount}, totalLikeCount = ${totalLikeCount}`
  );
  if (ws === undefined) {
    return;
  }
  spawnZombieAtPlayer(ws, nickname, likeCount);
};

const spawnZombieAtPlayer = async (
  ws: WebSocket,
  mobNameTag: string,
  count: number
) => {
  const emptyArray = Array.from({ length: count }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.zombie, mobNameTag)
    );
  }
};

const spawnVindicator = async (ws: WebSocket, count: number) => {
  const emptyArray = Array.from({ length: count }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.vindicator, { x: 0, y: 0, z: 0 })
    );
  }
};
