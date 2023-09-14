import { WebcastPushConnection } from "tiktok-live-connector";
import { WebSocket, WebSocketServer } from "ws";
import * as uuid from "uuid";
import { buildMinecraftCommandJSON } from "./helpers/buildMinecraftCommandJSON";
import { postMinecraftCommand } from "./helpers/postMinecraftCommand";
import { MinecraftSubscribeEvent } from "./types/MinecraftSubscribeEvent";
import { subscribeMinecraftEvent } from "./helpers/subscribeMinecraftEvent";
import { TikTokGift } from "./types/TikTokGift";

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
      postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: 🌹`);
      break;
    case TikTokGift.TikTok:
      postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: 🎵`);
      break;
    case TikTokGift.gg:
      postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: 🎲`);
      break;
    case TikTokGift.Dougnnut:
      postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: 🍩`);
      break;
    case TikTokGift.Corn:
      postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: 🌽`);
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
  postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: ❤️`);
};

const handleReceiveFollow = (ws: WebSocket | undefined, data: any) => {
  const { nickname, uniqueId } = data;
  console.log("Followed by", `${nickname}@${uniqueId}`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: 🎉🎉🎉`);
};

const handleReceiveShare = (ws: WebSocket | undefined, data: any) => {
  const { nickname, uniqueId } = data;
  console.log("Shared by", `${nickname}@${uniqueId}`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(ws, `say ${nickname}@${uniqueId}: 🎉`);
};

const handleReceiveSubscribe = (ws: WebSocket | undefined, data: any) => {
  console.log(data.uniqueId, "subscribed!");
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(ws, `say ${data.uniqueId}: 🎉🎉🎉🎉🎉`);
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
