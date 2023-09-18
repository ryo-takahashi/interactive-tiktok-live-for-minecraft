import { Mob } from "../types/Mob";

export const buildFireworkRainSpawnCommandsAtPlayer = (): string[] => {
  const spawnPositions = [
    { x: -2, y: 0, z: -2 },
    { x: -2, y: 0, z: -1 },
    { x: -2, y: 0, z: 0 },
    { x: -2, y: 0, z: 1 },
    { x: -2, y: 0, z: 2 },
    { x: -1, y: 0, z: -2 },
    { x: -1, y: 0, z: -1 },
    { x: -1, y: 0, z: 0 },
    { x: -1, y: 0, z: 1 },
    { x: -1, y: 0, z: 2 },
    { x: 0, y: 0, z: -2 },
    { x: 0, y: 0, z: -1 },
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: 2 },
    { x: 1, y: 0, z: -2 },
    { x: 1, y: 0, z: -1 },
    { x: 1, y: 0, z: 0 },
    { x: 1, y: 0, z: 1 },
    { x: 1, y: 0, z: 2 },
    { x: 2, y: 0, z: -2 },
    { x: 2, y: 0, z: -1 },
    { x: 2, y: 0, z: 0 },
    { x: 2, y: 0, z: 1 },
    { x: 2, y: 0, z: 2 },
  ];
  const commands = spawnPositions.map((e) => {
    return `summon ${Mob.fireworks_rocket} ~${e.x} ~${e.y} ~${e.z}`;
  });
  return commands;
};
