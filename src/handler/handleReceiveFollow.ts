import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { buildPlaysoundCommand } from "../helpers/buildPlaysoundCommand";
import { buildTNTRainSpawnCommandsAtPlayer } from "../helpers/buildTNTRainSpawnCommandAtPlayer";
import {
  buildSubTitleRawCommand,
  buildTitleRawCommand,
} from "../helpers/buildTitleRawCommand";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { replaceCommand } from "../helpers/replaceCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { LiveConfig } from "../types/LiveConfig";
import { MCSound } from "../types/MCSound";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveFollow = async (
  ws: WebSocket | undefined,
  data: any,
  config: LiveConfig
) => {
  const { nickname, uniqueId } = data;
  if (!ws) {
    return;
  }
  config.trigger.follow.forEach((follow) => {
    if (Math.random() >= follow.rate) {
      return;
    }
    follow.commands.forEach(async (command) => {
      for await (const e of command.commands) {
        await new Promise((resolve) =>
          setTimeout(resolve, command.interval_seconds * 1000)
        );
        executeMinecraftCommand(ws, replaceCommand(e, { nickname }));
      }
    });
  });
};
