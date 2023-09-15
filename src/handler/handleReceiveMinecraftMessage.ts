import { WebSocket } from "ws";

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
  } catch (error) {
    console.error(error);
  }
};
