import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { buildPlaysoundCommand } from "../helpers/buildPlaysoundCommand";
import { buildSayCommand } from "../helpers/buildSayCommand";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { SpawnMobManager } from "../manager/SpawnMobManager";
import { MCItem } from "../types/MCItem";
import { MCSound } from "../types/MCSound";
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
    const enemies = [Mob.zombie, Mob.creeper];
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    SpawnMobManager.instance.spawnMobSubject.next({
      mob: randomEnemy,
      mobNameTag,
    });
    spawnTNTFeverIfNeeded(ws, mobNameTag);
    giveElytraIfNeeded(ws, mobNameTag);
  }
};

const spawnTNTFeverIfNeeded = async (ws: WebSocket, mobNameTag: string) => {
  // 0.333%の確率でTNT Feverを発生させる
  const needSpawn = Math.random() < 0.00333;
  if (!needSpawn) {
    return;
  }
  executeMinecraftCommand(
    ws,
    `titleraw @a title {"rawtext":[{"text":"§c§lTNT FEVER!!"}]}`
  );
  executeMinecraftCommand(
    ws,
    `titleraw @a subtitle {"rawtext":[{"text":"by ${mobNameTag}"}]}`
  );
  executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.levelup));
  const emptyArray = Array.from({ length: 15 }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.click));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.tnt, mobNameTag)
    );
  }
};

const giveElytraIfNeeded = async (ws: WebSocket, mobNameTag: string) => {
  // 0.03%の確率でエリトラを付与
  const needExecuteCommand = Math.random() < 0.0003;
  if (!needExecuteCommand) {
    return;
  }
  executeMinecraftCommand(
    ws,
    `titleraw @a title {"rawtext":[{"text":"§e§o§lエリトラタイム突入!!!"}]}`
  );
  executeMinecraftCommand(
    ws,
    `titleraw @a subtitle {"rawtext":[{"text":"by ${mobNameTag}"}]}`
  );
  executeMinecraftCommand(
    ws,
    buildSayCommand(`${sanitizeNameTagText(mobNameTag)}がエリトラを与えた`)
  );
  executeMinecraftCommand(ws, buildPlaysoundCommand(MCSound.raid_horn));
  executeMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.elytra, 1));
};

const spawnZombieAtPlayer = async (
  ws: WebSocket,
  mobNameTag: string,
  count: number
) => {
  const emptyArray = Array.from({ length: count }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.zombie, mobNameTag)
    );
  }
};

const spawnVindicator = async (ws: WebSocket, count: number) => {
  const emptyArray = Array.from({ length: count }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.vindicator, { x: 0, y: 0, z: 0 })
    );
  }
};
