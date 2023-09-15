import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveJoinLiveMember = async (
  ws: WebSocket | undefined,
  data: any
) => {
  const { nickname, uniqueId } = data;
  console.log(`${nickname}@${uniqueId} joined live`);
  if (ws === undefined) {
    return;
  }
  postMinecraftCommand(ws, `say ${nickname} joined the live`);

  const emptyArray = Array.from({ length: 5 }, () => "");
  for await (const empty of emptyArray) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    postMinecraftCommand(
      ws,
      buildMobSpawnCommand(Mob.villager, { x: 0, y: 0, z: 0 })
    );
  }
};
