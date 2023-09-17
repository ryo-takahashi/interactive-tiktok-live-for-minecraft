import { WebSocket } from "ws";
import { handleReceivePlayerDied } from "./handleReceivePlayerDied";

export const handleReceiveMinecraftMessage = async (
  ws: WebSocket | undefined,
  rawData: any
) => {
  try {
    const data = JSON.parse(rawData);
    const hasError = data?.body?.statusCode === -2147483648;
    if (hasError) {
      console.error(data?.body?.statusMessage);
      return;
    }

    if (!ws) {
      console.error("No WebSocket connection");
      return;
    }
    const eventName = data?.header?.eventName;
    switch (eventName) {
      case "PlayerDied":
        handleReceivePlayerDied(ws);
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};
