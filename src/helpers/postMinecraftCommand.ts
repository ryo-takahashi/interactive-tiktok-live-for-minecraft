import { WebSocket } from "ws";
import * as uuid from "uuid";

const buildMinecraftCommandJSON = (command: string) => {
  return {
    header: {
      version: 1,
      requestId: uuid.v4(),
      messageType: "commandRequest",
      messagePurpose: "commandRequest",
    },
    body: {
      origin: {
        type: "player",
      },
      version: 1,
      commandLine: command,
    },
  };
};

export const executeMinecraftCommand = async (
  ws: WebSocket,
  command: string
) => {
  if (ws.readyState !== WebSocket.OPEN) {
    console.error("WebSocket is not open");
    return;
  }
  ws.send(JSON.stringify(buildMinecraftCommandJSON(command)));
};
