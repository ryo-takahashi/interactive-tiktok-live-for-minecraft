import * as uuid from "uuid";
import { WebSocket } from "ws";

export const subscribeMinecraftEvent = async (
  ws: WebSocket,
  eventName: string
) => {
  const subscribeMessageJSON = {
    header: {
      version: 1,
      requestId: uuid.v4(),
      messageType: "commandRequest",
      messagePurpose: "subscribe",
    },
    body: {
      eventName: eventName,
    },
  };
  ws.send(JSON.stringify(subscribeMessageJSON));
};
