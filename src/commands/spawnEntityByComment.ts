import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
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
        executeMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.tnt, nickname)
        );
        break;
      case SpawnCommentType._2:
        await new Promise((resolve) => setTimeout(resolve, 100));
        executeMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.golem, nickname)
        );
        break;
      case SpawnCommentType._3:
        executeMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.diamond));
        break;
      case SpawnCommentType._4:
        executeMinecraftCommand(
          ws,
          buildGiveCommandAtPlayer(MCItem.iron_ingot)
        );
        break;
      case SpawnCommentType._5:
        executeMinecraftCommand(
          ws,
          buildGiveCommandAtPlayer(MCItem.gold_ingot)
        );
        break;
      case SpawnCommentType._6:
        executeMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.emerald));
        break;
      case SpawnCommentType._7:
        executeMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.obsidian));
        break;
      case SpawnCommentType._8:
        await new Promise((resolve) => setTimeout(resolve, 100));
        executeMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.fireworks_rocket, nickname)
        );
        break;
      case SpawnCommentType._9:
        executeMinecraftCommand(
          ws,
          buildGiveCommandAtPlayer(MCItem.golden_apple)
        );
        break;
      case SpawnCommentType._0:
        executeMinecraftCommand(
          ws,
          buildGiveCommandAtPlayer(MCItem.ender_pearl)
        );
        break;
      default:
        break;
    }
  }
};
