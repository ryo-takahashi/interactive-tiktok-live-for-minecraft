import { replaceCommand } from "../helpers/replaceCommand";
import { CommandExecutor } from "../manager/CommandExecutor";
import { LiveConfig } from "../types/LiveConfig";
import { WebSocket } from "ws";

export const handleReceiveLike = async (data: any, config: LiveConfig) => {
  const { likeCount, nickname, uniqueId, totalLikeCount } = data;
  console.log(
    `${nickname}@${uniqueId}: likeCount = ${likeCount}, totalLikeCount = ${totalLikeCount}`
  );

  for await (const _ of Array.from({ length: likeCount }, () => "")) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    config.trigger.like.forEach((like) => {
      if (Math.random() >= like.rate) {
        return;
      }
      like.actions.forEach(async (action) => {
        switch (action.type) {
          case "once":
            {
              for await (const e of action.commands) {
                await new Promise((resolve) =>
                  setTimeout(resolve, action.interval_seconds * 1000)
                );
                CommandExecutor.instance.execute(
                  replaceCommand(e, { nickname, count: likeCount })
                );
              }
            }
            break;
          case "throttle":
            {
              for await (const e of action.commands) {
                await new Promise((resolve) =>
                  setTimeout(resolve, action.interval_seconds * 1000)
                );
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
