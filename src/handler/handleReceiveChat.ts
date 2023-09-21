import { replaceCommand } from "../helpers/replaceCommand";
import { CommandExecutor } from "../manager/CommandExecutor";
import { LiveConfig } from "../types/LiveConfig";

export const handleReceiveChat = async (data: any, config: LiveConfig) => {
  const { comment, nickname, uniqueId } = data;
  const triggerTexts = config.trigger.chat.map((chat) => chat.keyword);
  for await (const triggerText of triggerTexts) {
    const matchCount = comment.split(triggerText).length - 1;
    if (matchCount === 0) {
      continue;
    }
    config.trigger.chat
      .filter((chat) => chat.keyword === triggerText)
      .forEach((chat) => {
        if (Math.random() >= chat.rate) {
          return;
        }
        chat.actions.forEach(async (action) => {
          switch (action.type) {
            case "give":
            case "once":
              {
                for await (const e of action.commands) {
                  await new Promise((resolve) => {
                    setTimeout(resolve, action.interval_seconds * 1000);
                  });
                  CommandExecutor.instance.execute(
                    replaceCommand(e, { nickname, count: matchCount })
                  );
                }
              }
              break;
            case "effect":
              {
                for await (const e of action.commands) {
                  await new Promise((resolve) => {
                    setTimeout(resolve, action.interval_seconds * 1000);
                  });
                  CommandExecutor.instance.execute(
                    replaceCommand(e, { nickname, count: matchCount * 10 })
                  );
                }
              }
              break;
            case "summon":
              {
                for await (const _ of Array.from({ length: matchCount })) {
                  for await (const e of action.commands) {
                    await new Promise((resolve) => {
                      setTimeout(resolve, action.interval_seconds * 1000);
                    });
                    CommandExecutor.instance.execute(
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
