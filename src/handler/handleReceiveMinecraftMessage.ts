import { WebSocket } from "ws";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { buildSetRandomWorldSpawnCommand } from "../helpers/buildSetRandomWorldSpawnCommand";

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
    if (eventName === "PlayerDied") {
      // TODO あとでリファクタする
      // 毎回死ぬたびにリスポーン地点をランダムに変更(ラグ対策)
      postMinecraftCommand(ws, buildSetRandomWorldSpawnCommand());
      return;
    }
  } catch (error) {
    console.error(error);
  }
};
