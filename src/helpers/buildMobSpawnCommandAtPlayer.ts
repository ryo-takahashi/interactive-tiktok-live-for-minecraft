import { Mob } from "../types/Mob";
import { sanitizeNameTagText } from "./sanitizeNameTagText";

export const buildMobSpawnCommandAtPlayer = (
  mob: Mob,
  mobNameTag: string
): string => {
  const replacedNameTag = sanitizeNameTagText(mobNameTag);
  return `summon ${mob} ${replacedNameTag} ~~~`;
};
