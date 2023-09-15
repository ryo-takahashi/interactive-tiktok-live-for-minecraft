import { Mob } from "../types/Mob";

export const buildMobSpawnCommandAtPlayer = (
  mob: Mob,
  mobNameTag: string
): string => {
  // replace space, <, >, @, ', ", /, -, *, ~ with _
  const replacedNameTag = mobNameTag.replace(/[\s<>@'"/\-*~]/g, "_");
  return `summon ${mob} ${replacedNameTag} ~~~`;
};
