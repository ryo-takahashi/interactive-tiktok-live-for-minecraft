import { WebSocket, WebSocketServer } from "ws";
import * as uuid from "uuid";
import { buildMinecraftCommandJSON } from "./helpers/buildMinecraftCommandJSON";
import { postMinecraftCommand } from "./helpers/postMinecraftCommand";
import { MinecraftSubscribeEvent } from "./types/MinecraftSubscribeEvent";
import { subscribeMinecraftEvent } from "./helpers/subscribeMinecraftEvent";

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
  console.log("Connected");
  subscribeMinecraftEvent(ws, MinecraftSubscribeEvent.PlayerTravelled);

  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData.toString());
    console.log(data);

    if (data.header.eventName === MinecraftSubscribeEvent.PlayerTravelled) {
      postMinecraftCommand(ws, "summon chicken ~~~");
      return;
    }
  });
});
