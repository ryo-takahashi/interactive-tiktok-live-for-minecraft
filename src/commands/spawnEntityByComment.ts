import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";
import { SpawnCommentType } from "../types/SpawnCommentType";
import { MCItem } from "../types/MCItem";
import { buildGiveEffectCommandAtPlayer } from "../helpers/buildGiveEffectCommandAtPlayer";
import { MCEffect } from "../types/MCEffect";

export const spawnEntityByComment = async (
  ws: WebSocket,
  nickname: string,
  comment: string
) => {
  const characters = [...comment];
  const filterd1Characters = characters.filter(
    (character) => character === SpawnCommentType._1
  );
  const filterd2Characters = characters.filter(
    (character) => character === SpawnCommentType._2
  );
  const filterd3Characters = characters.filter(
    (character) => character === SpawnCommentType._3
  );
  const filterd4Characters = characters.filter(
    (character) => character === SpawnCommentType._4
  );
  const filterd5Characters = characters.filter(
    (character) => character === SpawnCommentType._5
  );
  const filterd6Characters = characters.filter(
    (character) => character === SpawnCommentType._6
  );
  const filterd7Characters = characters.filter(
    (character) => character === SpawnCommentType._7
  );
  const filterd8Characters = characters.filter(
    (character) => character === SpawnCommentType._8
  );
  const filterd9Characters = characters.filter(
    (character) => character === SpawnCommentType._9
  );
  const filterd0Characters = characters.filter(
    (character) => character === SpawnCommentType._0
  );

  for await (const character of filterd1Characters) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.tnt, nickname)
    );
  }

  for await (const character of filterd2Characters) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.golem, nickname)
    );
  }

  if (filterd3Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.diamond, filterd3Characters.length)
    );
  }

  if (filterd4Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.iron_ingot, filterd4Characters.length)
    );
  }

  if (filterd5Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.gold_ingot, filterd5Characters.length)
    );
  }

  if (filterd6Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildGiveEffectCommandAtPlayer(
        MCEffect.speed,
        filterd6Characters.length * 5,
        5
      )
    );
  }

  if (filterd7Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.obsidian, filterd7Characters.length)
    );
  }

  for await (const character of filterd8Characters) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    executeMinecraftCommand(
      ws,
      buildMobSpawnCommandAtPlayer(Mob.fireworks_rocket, nickname)
    );
  }

  if (filterd9Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.golden_apple, filterd9Characters.length)
    );
  }

  if (filterd0Characters.length > 0) {
    executeMinecraftCommand(
      ws,
      buildGiveCommandAtPlayer(MCItem.ender_pearl, filterd0Characters.length)
    );
  }
};
