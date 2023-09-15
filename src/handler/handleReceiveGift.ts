import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";
import { TikTokGift } from "../types/TikTokGift";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";

export const handleReceiveGift = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { nickname, uniqueId, giftId } = data;
  console.log(`${nickname}@${uniqueId}): send gift_id = ${giftId}`);
  if (ws === undefined) {
    return;
  }
  switch (giftId) {
    case TikTokGift.Rose:
      spawnGolemAtPlayer(ws, nickname);
      break;
    case TikTokGift.TikTok:
      spawnTNTAtPlayer(ws, 1);
      break;
    case TikTokGift.gg:
      break;
    case TikTokGift.Dougnnut:
      break;
  }
};

const spawnGolem = async (ws: WebSocket) => {
  postMinecraftCommand(ws, "playsound mob.irongolem.throw @a");
  postMinecraftCommand(
    ws,
    buildMobSpawnCommand(Mob.golem, { x: 0, y: 0, z: 0 })
  );
};

const spawnGolemAtPlayer = async (ws: WebSocket, mobNameTag: string) => {
  postMinecraftCommand(ws, "playsound mob.irongolem.throw @a");
  postMinecraftCommand(ws, buildMobSpawnCommandAtPlayer(Mob.golem, mobNameTag));
};

const spawnTNT = async (ws: WebSocket, count: number) => {
  postMinecraftCommand(ws, "playsound random.click @a");
  const tiktokArr = Array.from({ length: count }, () => "");
  for await (const empty of tiktokArr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
    );
  }
};

const spawnTNTAtPlayer = async (ws: WebSocket, count: number) => {
  postMinecraftCommand(ws, "playsound random.click @a");
  const tiktokArr = Array.from({ length: count }, () => "");
  for await (const empty of tiktokArr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
    );
  }
};

const spawnWarden = async (ws: WebSocket, count: number) => {
  postMinecraftCommand(ws, "playsound random.levelup @a");
  const arr = Array.from({ length: count }, () => "");
  for await (const empty of arr) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.warden, { x: 0, y: 0, z: 0 })
    );
  }
};