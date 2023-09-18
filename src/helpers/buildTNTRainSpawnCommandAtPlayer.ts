import { Mob } from "../types/Mob";

export const buildTNTRainSpawnCommandsAtPlayer = (): string[] => {
  const spawnPositions = [
    { x: -2, y: 4, z: -2 },
    { x: -2, y: 4, z: -1 },
    { x: -2, y: 4, z: 0 },
    { x: -2, y: 4, z: 1 },
    { x: -2, y: 4, z: 2 },
    { x: -1, y: 4, z: -2 },
    { x: -1, y: 4, z: -1 },
    { x: -1, y: 4, z: 0 },
    { x: -1, y: 4, z: 1 },
    { x: -1, y: 4, z: 2 },
    { x: 0, y: 4, z: -2 },
    { x: 0, y: 4, z: -1 },
    { x: 0, y: 4, z: 0 },
    { x: 0, y: 4, z: 1 },
    { x: 0, y: 4, z: 2 },
    { x: 1, y: 4, z: -2 },
    { x: 1, y: 4, z: -1 },
    { x: 1, y: 4, z: 0 },
    { x: 1, y: 4, z: 1 },
    { x: 1, y: 4, z: 2 },
    { x: 2, y: 4, z: -2 },
    { x: 2, y: 4, z: -1 },
    { x: 2, y: 4, z: 0 },
    { x: 2, y: 4, z: 1 },
    { x: 2, y: 4, z: 2 },
  ];
  const commands = spawnPositions.map((e) => {
    return `summon ${Mob.tnt} ~${e.x} ~${e.y} ~${e.z}`;
  });
  return commands;
};
