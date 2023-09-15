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
    await new Promise((resolve) => setTimeout(resolve, 500));
    switch (character) {
      case SpawnCommentType.tnt:
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.tnt, nickname)
        );
        break;
      case SpawnCommentType.iron_golem:
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.golem, nickname)
        );
        break;
      case SpawnCommentType.golden_apple:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.golden_apple));
        break;
      case SpawnCommentType.iron_ingot:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.iron_ingot));
        break;
      case SpawnCommentType.wood:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.wood));
        break;
      case SpawnCommentType.arrow:
        postMinecraftCommand(ws, buildGiveCommandAtPlayer(MCItem.arrow));
        break;
      case SpawnCommentType.chicken:
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.chicken, nickname)
        );
        break;
      case SpawnCommentType.sheep:
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.sheep, nickname)
        );
        break;
      case SpawnCommentType.cow:
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.cow, nickname)
        );
        break;
      case SpawnCommentType.pig:
        postMinecraftCommand(
          ws,
          buildMobSpawnCommandAtPlayer(Mob.pig, nickname)
        );
        break;
    }
  }
};
