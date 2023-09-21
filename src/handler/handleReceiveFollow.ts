import { replaceCommand } from "../helpers/replaceCommand";
import { CommandExecutor } from "../manager/CommandExecutor";
import { LiveConfig } from "../types/LiveConfig";

export const handleReceiveFollow = async (data: any, config: LiveConfig) => {
  const { nickname, uniqueId } = data;

  config.trigger.follow.forEach((follow) => {
    if (Math.random() >= follow.rate) {
      return;
    }
    follow.actions.forEach(async (action) => {
      for await (const e of action.commands) {
        await new Promise((resolve) =>
          setTimeout(resolve, action.interval_seconds * 1000)
        );
        CommandExecutor.instance.execute(replaceCommand(e, { nickname }));
      }
    });
  });
};
