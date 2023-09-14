import { WebcastPushConnection } from "tiktok-live-connector";
import { WebSocket, WebSocketServer } from "ws";
import * as uuid from "uuid";
import { buildMinecraftCommandJSON } from "./helpers/buildMinecraftCommandJSON";
import { postMinecraftCommand } from "./helpers/postMinecraftCommand";
import { MinecraftSubscribeEvent } from "./types/MinecraftSubscribeEvent";
import { subscribeMinecraftEvent } from "./helpers/subscribeMinecraftEvent";
import { TikTokGift } from "./types/TikTokGift";
import { buildMobSpawnCommand } from "./helpers/buildMobSpawnCommand";
import { Mob } from "./types/Mob";

const wss = new WebSocketServer({ port: 8080 });
var currentWebSocket: WebSocket | undefined = undefined;
const tiktokUsername = "cristian_armandoo";
const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

wss.on("connection", (ws) => {
  console.log("Connected Minecraft");
  currentWebSocket = ws;
});

wss.on("close", () => {
  console.log("Disconnected Minecraft");
  currentWebSocket = undefined;
  tiktokLiveConnection.disconnect();
});

tiktokLiveConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

const handleReceiveChat = (ws: WebSocket | undefined, data: any) => {
  const { comment, nickname, uniqueId } = data;
  console.log(`${nickname}@${uniqueId}): ${comment}`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: ${comment}`);
};

const handleReceiveGift = (ws: WebSocket | undefined, data: any) => {
  const { nickname, uniqueId, giftId } = data;
  console.log(`${nickname}@${uniqueId}): send gift_id = ${giftId}`);
  if (ws === undefined) {
    return;
  }
  switch (giftId) {
    case TikTokGift.Rose:
      postMinecraftCommand(
        ws,
        buildMobSpawnCommand(Mob.golem, { x: 0, y: 0, z: 0 })
      );
      break;
    case TikTokGift.TikTok:
      postMinecraftCommand(
        ws,
        buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
      );
      break;
    case TikTokGift.gg:
      break;
    case TikTokGift.Dougnnut:
      postMinecraftCommand(
        ws,
        buildMobSpawnCommand(Mob.warden, { x: 0, y: 0, z: 0 })
      );
      break;
    case TikTokGift.Corn:
      postMinecraftCommand(
        ws,
        buildMobSpawnCommand(Mob.ravager, { x: 0, y: 0, z: 0 })
      );
      break;
  }
};

const handleReceiveLike = (ws: WebSocket | undefined, data: any) => {
  const { likeCount, nickname, uniqueId, totalLikeCount } = data;
  console.log(
    `${nickname}@${uniqueId}): likeCount = ${likeCount}, totalLikeCount = ${totalLikeCount}`
  );
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(
    ws,
    buildMobSpawnCommand(Mob.vindicator, { x: 0, y: 0, z: 0 })
  );
};

const handleReceiveFollow = async (ws: WebSocket | undefined, data: any) => {
  const { nickname, uniqueId } = data;
  console.log("Followed by", `${nickname}@${uniqueId}`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(
    ws,
    `titleraw @a title {"rawtext":[{"text":"§c§l!!! TNT Fever !!!"}]}`
  );
  postMinecraftCommand(
    ws,
    `titleraw @a subtitle {"rawtext":[{"text":"Thanks Follow"}]}`
  );
  const emptyArray = Array.from({ length: 15 }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.tnt, { x: 0, y: 0, z: 0 })
    );
  }
};

const handleReceiveShare = (ws: WebSocket | undefined, data: any) => {
  const { nickname, uniqueId } = data;
  console.log("Shared by", `${nickname}@${uniqueId}`);
  if (ws === undefined) {
    return;
  }
};

const handleReceiveSubscribe = (ws: WebSocket | undefined, data: any) => {
  console.log(data.uniqueId, "subscribed!");
  if (ws === undefined) {
    return;
  }
};

tiktokLiveConnection.on("chat", (data) => {
  handleReceiveChat(currentWebSocket, data);
});

tiktokLiveConnection.on("gift", (data) => {
  handleReceiveGift(currentWebSocket, data);
});

tiktokLiveConnection.on("like", (data) => {
  handleReceiveLike(currentWebSocket, data);
});

tiktokLiveConnection.on("follow", (data) => {
  handleReceiveFollow(currentWebSocket, data);
});

tiktokLiveConnection.on("share", (data) => {
  handleReceiveShare(currentWebSocket, data);
});

tiktokLiveConnection.on("subscribe", (data) => {
  handleReceiveSubscribe(currentWebSocket, data);
});
