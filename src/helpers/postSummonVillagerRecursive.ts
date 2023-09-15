import { Mob } from "../types/Mob";
import { buildMobSpawnCommand } from "./buildMobSpawnCommand";
import { postMinecraftCommand } from "./postMinecraftCommand";
import { WebSocket } from "ws";

export const postSummonVillagerRecursive = async (
  ws: WebSocket | undefined
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (ws === undefined) {
    return;
  }
  console.log("summon villager");
  postMinecraftCommand(
    ws,
    buildMobSpawnCommand(Mob.villager, { x: 0, y: 0, z: 0 })
  );
  await postSummonVillagerRecursive(ws);
};
