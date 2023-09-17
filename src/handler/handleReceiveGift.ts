import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";
import { TikTokGift } from "../types/TikTokGift";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";

export const handleReceiveGift = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { nickname, uniqueId, giftId } = data;
  if (!ws) {
    return;
  }
  switch (giftId) {
    case TikTokGift.Rose:
      break;
    case TikTokGift.TikTok:
      break;
    case TikTokGift.gg:
      break;
    case TikTokGift.Dougnnut:
      break;
  }
};

const spawnGolem = async (ws: WebSocket) => {
  executeMinecraftCommand(ws, "playsound mob.irongolem.throw @a");
  executeMinecraftCommand(
    ws,
    buildMobSpawnCommand(Mob.golem, { x: 0, y: 0, z: 0 })
  );
};

const spawnGolemAtPlayer = async (ws: WebSocket, mobNameTag: string) => {
  executeMinecraftCommand(ws, "playsound mob.irongolem.throw @a");
  executeMinecraftCommand(
    ws,
    buildMobSpawnCommandAtPlayer(Mob.golem, mobNameTag)
  );
};

const spawnTNT = async (ws: WebSocket, count: number) => {
  executeMinecraftCommand(ws, "playsound random.click @a");
  const tiktokArr = Array.from({ length: count }, () => "");
  for await (const empty of tiktokArr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
    );
  }
};

const spawnTNTAtPlayer = async (ws: WebSocket, count: number) => {
  executeMinecraftCommand(ws, "playsound random.click @a");
  const tiktokArr = Array.from({ length: count }, () => "");
  for await (const empty of tiktokArr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
    );
  }
};

const spawnWarden = async (ws: WebSocket, count: number) => {
  executeMinecraftCommand(ws, "playsound random.levelup @a");
  const arr = Array.from({ length: count }, () => "");
  for await (const empty of arr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.warden, { x: 0, y: 0, z: 0 })
    );
  }
};
