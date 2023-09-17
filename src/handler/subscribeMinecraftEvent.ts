import { WebSocket } from "ws";
import { v4 as uuid } from "uuid";

const subscribeMinecraftEvent = async (ws: WebSocket, eventName: string) => {
  const subscribeMessageJSON = {
    header: {
      version: 1,
      requestId: uuid(),
      messageType: "commandRequest",
      messagePurpose: "subscribe",
    },
    body: {
      eventName: eventName,
    },
  };
  ws.send(JSON.stringify(subscribeMessageJSON));
};

export const subscribeMinecraftEvents = async (ws: WebSocket) => {
  await subscribeMinecraftEvent(ws, "PlayerDied");
};
