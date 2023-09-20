import { WebcastPushConnection } from "tiktok-live-connector";
import { WebSocket, WebSocketServer } from "ws";
import { handleReceiveFollow } from "./handler/handleReceiveFollow";
import { handleReceiveGift } from "./handler/handleReceiveGift";
import { handleReceiveJoinLiveMember } from "./handler/handleReceiveJoinLiveMember";
import { handleReceiveShare } from "./handler/handleReceiveShare";
import { handleReceiveLike } from "./handler/handleReceiveLike";
import { handleReceiveChat } from "./handler/handleReceiveChat";
import { handleStreamEnd } from "./handler/handleStreamEnd";
import { handleReceiveMinecraftMessage } from "./handler/handleReceiveMinecraftMessage";
import { connect } from "http2";
import { subscribeMinecraftEvents } from "./handler/subscribeMinecraftEvent";
import { CommandExecutor } from "./manager/CommandExecutor";
import { executeMinecraftCommand } from "./helpers/postMinecraftCommand";
import { buildHiddenCommandLogCommand } from "./helpers/buildHiddenCommandLogCommand";
import { fetchLiveConfig } from "./helpers/fetchLiveConfig";

const wss = new WebSocketServer({ port: 8080 });
var currentWebSocket: WebSocket | undefined = undefined;
var currentTiktokLiveConnection: WebcastPushConnection | undefined = undefined;
const config = fetchLiveConfig();
wss.on("connection", async (ws, req) => {
  if (!req.url) {
    console.error("Failed Connect Minecraft: No TikTok username provided");
    return;
  }
  const connectToTikTokUserName = req.url.replace("/", "");
  if (connectToTikTokUserName === "") {
    console.error("Failed Connect Minecraft:No TikTok username provided");
    return;
  }
  console.log("Connected Minecraft");
  executeMinecraftCommand(ws, buildHiddenCommandLogCommand());
  currentWebSocket = ws;
  CommandExecutor.instance.setCurrentWebSocket(ws);

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
    handleReceiveJoinLiveMember(currentWebSocket, data, config);
  });

  tiktokLiveConnection.on("chat", (data) => {
    handleReceiveChat(currentWebSocket, data, config);
  });

  tiktokLiveConnection.on("gift", (data) => {
    handleReceiveGift(currentWebSocket, data, config);
  });

  tiktokLiveConnection.on("like", (data) => {
    handleReceiveLike(currentWebSocket, data, config);
  });

  tiktokLiveConnection.on("follow", (data) => {
    handleReceiveFollow(currentWebSocket, data, config);
  });

  tiktokLiveConnection.on("share", (data) => {
    handleReceiveShare(currentWebSocket, data, config);
  });

  tiktokLiveConnection.on("streamEnd", (actionId) => {
    handleStreamEnd(actionId);
  });

  await subscribeMinecraftEvents(currentWebSocket);
  ws.on("message", async (rawData) => {
    handleReceiveMinecraftMessage(currentWebSocket, rawData);
  });
});

wss.on("close", () => {
  console.log("Disconnected Minecraft");
  currentWebSocket = undefined;
  currentTiktokLiveConnection?.disconnect();
  currentTiktokLiveConnection = undefined;
});
