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

const wss = new WebSocketServer({ port: 8080 });
var currentWebSocket: WebSocket | undefined = undefined;
const tiktokUsername = TikTokLiveUser.abelleeeeeeeee;
const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

wss.on("connection", async (ws) => {
  console.log("Connected Minecraft");
  currentWebSocket = ws;

  postSummonVillagerRecursive(ws);
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
