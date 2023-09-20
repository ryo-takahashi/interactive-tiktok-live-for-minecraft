import { executeMinecraftCommand } from "../helpers/postMinecraftCommand";
import { replaceCommand } from "../helpers/replaceCommand";
import { LiveConfig } from "../types/LiveConfig";
import { WebSocket } from "ws";

export const handleReceiveChat = async (
  ws: WebSocket | undefined,
  data: any,
  config: LiveConfig
) => {
  const { comment, nickname, uniqueId } = data;
  if (!ws) {
    return;
  }
  const triggerTexts = config.trigger.chat.map((chat) => chat.chat);
  for await (const triggerText of triggerTexts) {
    // chatTextからtriggerTextが一致した回数を取得
    const matchCount = comment.split(triggerText).length - 1;
    if (matchCount === 0) {
      continue;
    }
    // 一致した回数分コマンドを実行
    config.trigger.chat
      .filter((chat) => chat.chat === triggerText)
      .forEach((chat) => {
        if (Math.random() >= chat.rate) {
          return;
        }
        chat.commands.forEach(async (command) => {
          switch (command.type) {
            case "give":
            case "once":
              {
                for await (const e of command.commands) {
                  await new Promise((resolve) => {
                    setTimeout(resolve, command.interval_seconds * 1000);
                  });
                  executeMinecraftCommand(
                    ws,
                    replaceCommand(e, { nickname, count: matchCount })
                  );
                }
              }
              break;
            case "effect":
              {
                for await (const e of command.commands) {
                  await new Promise((resolve) => {
                    setTimeout(resolve, command.interval_seconds * 1000);
                  });
                  executeMinecraftCommand(
                    ws,
                    replaceCommand(e, { nickname, count: matchCount * 10 })
                  );
                }
              }
              break;
            case "summon":
              {
                for await (const _ of Array.from({ length: matchCount })) {
                  for await (const e of command.commands) {
                    await new Promise((resolve) => {
                      setTimeout(resolve, command.interval_seconds * 1000);
                    });
                    executeMinecraftCommand(
                      ws,
                      replaceCommand(e, { nickname, count: matchCount })
                    );
                  }
                }
              }
              break;
          }
        });
      });
  }
};
