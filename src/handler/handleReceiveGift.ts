import { LiveConfig } from "../types/LiveConfig";
import { CommandExecutor } from "../manager/CommandExecutor";
import { replaceCommand } from "../helpers/replaceCommand";

// ギフトを受け取った時、受け取り個数回実行される
// ex. バラを10個受け取る -> 10回実行
// 最終的に何個受け取ったかは repeatEnd:true の時のみ分かる
export const handleReceiveGift = async (data: any, config: LiveConfig) => {
  const { nickname, giftId, giftName, repeatCount, repeatEnd, diamondCount } =
    data;

  console.log(
    `🎁${nickname} sent ${giftName}(ID: ${giftId}). repeat:${repeatCount}, isRepeatEnd:${repeatEnd}, diamond:${diamondCount}`
  );
  config.trigger.gift.forEach((gift) => {
    if (giftId !== gift.gift_id) return;
    if (Math.random() >= gift.rate) return;
    gift.actions.forEach(async (action) => {
      switch (action.type) {
        case "repeat":
          {
            if (repeatEnd) return;
            for await (const command of action.commands) {
              await new Promise((resolve) =>
                setTimeout(resolve, action.interval_seconds * 1000)
              );
              CommandExecutor.instance.execute(
                replaceCommand(command, { nickname, count: repeatCount })
              );
            }
          }
          break;
        case "repeat_end":
          {
            if (!repeatEnd) return;
            for await (const command of action.commands) {
              await new Promise((resolve) =>
                setTimeout(resolve, action.interval_seconds * 1000)
              );
              CommandExecutor.instance.execute(
                replaceCommand(command, { nickname, count: repeatCount })
              );
            }
          }
          break;
      }
    });
  });
};
