import { sanitizeNameTagText } from "./sanitizeNameTagText";

export const buildScoreboardAddCommand = (objectiveName: string) => {
  return `scoreboard objectives add ${objectiveName} dummy`;
};

export const buildScoreboardRemoveCommand = (objectiveName: string) => {
  return `scoreboard objectives remove ${objectiveName}`;
};

export const buildScoreboardSetDisplayCommand = (objectiveName: string) => {
  return `scoreboard objectives setdisplay sidebar ${objectiveName}`;
};

export const buildScoreboardSetCommand = (
  playerName: string,
  objectiveName: string,
  score: number
) => {
  const sanitizedName = sanitizeNameTagText(playerName);
  return `scoreboard players set ${sanitizedName} ${objectiveName} ${score}`;
};
