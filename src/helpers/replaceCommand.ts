import { sanitizeNameTagText } from "./sanitizeNameTagText";

export type ReplaceType = {
  nickname?: string | undefined;
  count?: number | undefined;
};

export const replaceCommand = (command: string, replace: ReplaceType) => {
  var replacedCommand = command;
  if (replace.nickname) {
    replacedCommand = replacedCommand.replace(
      "$nickname",
      sanitizeNameTagText(replace.nickname)
    );
  }
  if (replace.count) {
    replacedCommand = replacedCommand.replace(
      "$count",
      replace.count.toString()
    );
  }
  return replacedCommand;
};
