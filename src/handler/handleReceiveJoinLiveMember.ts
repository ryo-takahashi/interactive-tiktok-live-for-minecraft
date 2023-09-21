import { replaceCommand } from "../helpers/replaceCommand";
import { CommandExecutor } from "../manager/CommandExecutor";
import { LiveConfig } from "../types/LiveConfig";

export const handleReceiveJoinLiveMember = async (
  data: any,
  config: LiveConfig
) => {
  const { nickname } = data;
  config.trigger.member.forEach((member) => {
    if (Math.random() >= member.rate) {
      return;
    }
    member.actions.forEach(async (action) => {
      for await (const e of action.commands) {
        await new Promise((resolve) =>
          setTimeout(resolve, action.interval_seconds * 1000)
        );
        CommandExecutor.instance.execute(replaceCommand(e, { nickname }));
      }
    });
  });
};
