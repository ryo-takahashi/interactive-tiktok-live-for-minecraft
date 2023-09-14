import { buildMinecraftCommandJSON } from "./buildMinecraftCommandJSON";
import { WebSocket } from "ws";

export const postMinecraftCommand = async (ws: WebSocket, command: string) => {
  if (ws.readyState !== WebSocket.OPEN) {
    console.log("WebSocket is not open");
    return;
  }
  ws.send(JSON.stringify(buildMinecraftCommandJSON(command)));
};
