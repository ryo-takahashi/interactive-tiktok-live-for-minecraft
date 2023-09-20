import { buildGiveCommandAtPlayer } from "../helpers/buildGiveCommandAtPlayer";
import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import {
  buildMobSpawnCommandAtPlayer,
  buildMobSpawnWithEventCommandAtPlayer,
} from "../helpers/buildMobSpawnCommandAtPlayer";
import { buildPlaysoundCommand } from "../helpers/buildPlaysoundCommand";
import { buildSayCommand } from "../helpers/buildSayCommand";
import { buildTNTRainSpawnCommandsAtPlayer } from "../helpers/buildTNTRainSpawnCommandAtPlayer";
import {
  buildSubTitleRawCommand,
  buildTitleRawCommand,
} from "../helpers/buildTitleRawCommand";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { replaceCommand } from "../helpers/replaceCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { CommandExecutor } from "../manager/CommandExecutor";
import { LiveConfig } from "../types/LiveConfig";
import { MCItem } from "../types/MCItem";
import { MCSound } from "../types/MCSound";
import { MCSpawnEvent } from "../types/MCSpawnEvent";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveLike = async (
  ws: WebSocket | undefined,
  data: any,
  config: LiveConfig
) => {
  const { likeCount, nickname, uniqueId, totalLikeCount } = data;
  console.log(
    `${nickname}@${uniqueId}: likeCount = ${likeCount}, totalLikeCount = ${totalLikeCount}`
  );
  if (ws === undefined) {
    return;
  }
  for await (const _ of Array.from({ length: likeCount }, () => "")) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    config.trigger.like.forEach((like) => {
      if (Math.random() >= like.rate) {
        return;
      }
      like.commands.forEach(async (command) => {
        switch (command.type) {
          case "once":
            {
              for await (const e of command.commands) {
                await new Promise((resolve) => {
                  if (command.interval_seconds) {
                    return setTimeout(resolve, command.interval_seconds * 1000);
                  }
                });
                executeMinecraftCommand(
                  ws,
                  replaceCommand(e, { nickname, count: likeCount })
                );
              }
            }
            break;
          case "throttle":
            {
              for await (const e of command.commands) {
                await new Promise((resolve) => {
                  if (command.interval_seconds) {
                    return setTimeout(resolve, command.interval_seconds * 1000);
                  }
                });
                CommandExecutor.instance.throttleSubject.next(
                  replaceCommand(e, { nickname, count: likeCount })
                );
              }
            }
            break;
        }
      });
    });
  }
};
