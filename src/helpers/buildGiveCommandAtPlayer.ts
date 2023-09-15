import { MCItem } from "../types/MCItem";

export const buildGiveCommandAtPlayer = (item: MCItem): string => {
  return `give @a ${item} 1`;
};
