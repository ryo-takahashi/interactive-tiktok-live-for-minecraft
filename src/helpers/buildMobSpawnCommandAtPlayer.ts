import { Mob } from "../types/Mob";
import { sanitizeCommandText } from "./sanitizeCommandText";

export const buildMobSpawnCommandAtPlayer = (
  mob: Mob,
  mobNameTag: string
): string => {
  const replacedNameTag = sanitizeCommandText(mobNameTag);
  return `summon ${mob} ${replacedNameTag} ~~~`;
};
