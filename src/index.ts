import { WebcastPushConnection } from "tiktok-live-connector";
import { WebSocket, WebSocketServer } from "ws";
import { postSummonVillagerRecursive } from "./helpers/postSummonVillagerRecursive";
import { handleReceiveFollow } from "./handler/handleReceiveFollow";
import { handleReceiveGift } from "./handler/handleReceiveGift";
import { handleReceiveJoinLiveMember } from "./handler/handleReceiveJoinLiveMember";
import { handleReceiveShare } from "./handler/handleReceiveShare";
import { handleReceiveLike } from "./handler/handleReceiveLike";
import { handleReceiveChat } from "./handler/handleReceiveChat";
import { TikTokLiveUser } from "./types/TikTokLiveUser";
import { handleStreamEnd } from "./handler/handleStreamEnd";
import { handleReceiveMinecraftMessage } from "./handler/handleReceiveMinecraftMessage";

const wss = new WebSocketServer({ port: 8080 });
var currentWebSocket: WebSocket | undefined = undefined;
var currentTiktokLiveConnection: WebcastPushConnection | undefined = undefined;

wss.on("connection", async (ws, req) => {
  if (!req.url) {
    console.error("No TikTok username provided");
    return;
  }
  console.log("Connected Minecraft");
  const connectToTikTokUserName = req.url.replace("/", "");

  currentWebSocket = ws;

  const tiktokLiveConnection = new WebcastPushConnection(
    connectToTikTokUserName
  );
  tiktokLiveConnection
    .connect()
    .then((state) => {
      console.info(`Connected to roomId ${state.roomId}`);
    })
    .catch((err) => {
      console.error("Failed to connect", err);
    });

  tiktokLiveConnection.on("member", (data) => {
    handleReceiveJoinLiveMember(currentWebSocket, data);
  });

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

  tiktokLiveConnection.on("streamEnd", (actionId) => {
    handleStreamEnd(actionId);
  });

  ws.on("message", async (rawData) => {
    handleReceiveMinecraftMessage(currentWebSocket, rawData);
  });
});

wss.on("close", () => {
  console.log("Disconnected Minecraft");
  currentWebSocket = undefined;
  currentTiktokLiveConnection?.disconnect();
});
