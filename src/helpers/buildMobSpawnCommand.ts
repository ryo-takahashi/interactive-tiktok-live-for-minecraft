import { Mob } from "../types/Mob";

type Position = {
  x: number;
  y: number;
  z: number;
};

export const buildMobSpawnCommand = (mob: Mob, position: Position): string => {
  const { x, y, z } = position;
  return `summon ${mob} ${x} ${y} ${z}`;
};
