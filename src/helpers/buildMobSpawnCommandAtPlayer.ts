import { MCSpawnEvent } from "../types/MCSpawnEvent";
import { Mob } from "../types/Mob";
import { sanitizeNameTagText } from "./sanitizeNameTagText";

export const buildMobSpawnCommandAtPlayer = (
  mob: Mob,
  mobNameTag: string
): string => {
  const replacedNameTag = sanitizeNameTagText(mobNameTag);
  return `summon ${mob} ${replacedNameTag} ~ ~3 ~`;
};

export const buildMobSpawnWithEventCommandAtPlayer = (
  mob: Mob,
  spawnEvent: MCSpawnEvent,
  mobNameTag: string
): string => {
  const replacedNameTag = sanitizeNameTagText(mobNameTag);
  return `summon ${mob} ~ ~3 ~ ${spawnEvent} ${replacedNameTag}`;
};
