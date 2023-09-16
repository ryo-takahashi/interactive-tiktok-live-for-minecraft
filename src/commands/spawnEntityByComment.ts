import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";
import { SpawnCommentType } from "../types/SpawnCommentType";
import { MCItem } from "../types/MCItem";

export const spawnEntityByComment = async (
  ws: WebSocket,
  nickname: string,
  comment: string
) => {
  const characters = [...comment];
  const filterdCharacters = characters.filter((character) =>
    Object.values(SpawnCommentType).includes(character as SpawnCommentType)
  );
  for await (const character of filterdCharacters) {
    switch (character) {
      case SpawnCommentType._1:
        await new Promise((resolve) => setTimeout(resolve, 500));
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.tnt, nickname)
        );
        break;
      case SpawnCommentType._2:
        await new Promise((resolve) => setTimeout(resolve, 100));
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.golem, nickname)
        );
        break;
      case SpawnCommentType._3:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.golden_apple));
        break;
      case SpawnCommentType._4:
        await new Promise((resolve) => setTimeout(resolve, 100));
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.fireworks_rocket, nickname)
        );
        break;
      case SpawnCommentType._5:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.ender_pearl));
        break;
      case SpawnCommentType._6:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.obsidian));
        break;
      case SpawnCommentType._7:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.iron_ingot));
        break;
      case SpawnCommentType._8:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.gold_ingot));
        break;
      case SpawnCommentType._9:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.diamond));
        break;
      case SpawnCommentType._0:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.emerald));
        break;
      default:
        break;
    }
  }
};
