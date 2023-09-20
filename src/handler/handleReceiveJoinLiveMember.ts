import { buildMobSpawnCommand } from "../helpers/buildMobSpawnCommand";
import { buildMobSpawnCommandAtPlayer } from "../helpers/buildMobSpawnCommandAtPlayer";
import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { replaceCommand } from "../helpers/replaceCommand";
import { sanitizeNameTagText } from "../helpers/sanitizeNameTagText";
import { LiveConfig } from "../types/LiveConfig";
import { Mob } from "../types/Mob";
import { WebSocket } from "ws";

export const handleReceiveJoinLiveMember = async (
  ws: WebSocket | undefined,
  data: any,
  config: LiveConfig
) => {
  const { nickname } = data;
  if (ws === undefined) {
    return;
  }
  config.trigger.member.forEach((member) => {
    if (Math.random() >= member.rate) {
      return;
    }
    member.commands.forEach(async (command) => {
      for await (const e of command.commands) {
        await new Promise((resolve) =>
          setTimeout(resolve, command.interval_seconds * 1000)
        );
        executeMinecraftCommand(ws, replaceCommand(e, { nickname }));
      }
    });
  });
};
