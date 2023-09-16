import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeCommandText } from "../helpers/sanitizeCommandText";
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
  spawnRandomEnemyAtPlayer(ws, nickname, likeCount);
};

const spawnRandomEnemyAtPlayer = async (
  ws: WebSocket,
  mobNameTag: string,
  count: number
) => {
  const emptyArray = Array.from({ length: count }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const enemies = [Mob.zombie, Mob.skeleton, Mob.creeper];
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    postMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(randomEnemy, mobNameTag)
    );
    spawnWardenIfNeeded(ws, mobNameTag);
  }
};

const spawnWardenIfNeeded = async (ws: WebSocket, mobNameTag: string) => {
  // 0.333%の確率でwardenをspawn
  const needSpawnWarden = Math.random() < 0.00333;
  if (!needSpawnWarden) {
    return;
  }
  postMinecraftCommand(
    ws,
    `titleraw @a title {"rawtext":[{"text":"§c§lSummon Warden"}]}`
  );
  postMinecraftCommand(
    ws,
    `titleraw @a subtitle {"rawtext":[{"text":"by ${sanitizeCommandText(
      mobNameTag
    )}"}]}`
  );
  postMinecraftCommand(ws, "playsound random.levelup @a");
  postMinecraftCommand(
    ws,
    buildMobSpawnCommandAtPlayer(Mob.warden, mobNameTag)
  );
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
