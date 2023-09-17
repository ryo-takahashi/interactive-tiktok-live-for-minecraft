import { MCItem } from "../types/MCItem";

export const buildGiveCommandAtPlayer = (
  item: MCItem,
  count: number
): string => {
  return `give @a ${item} ${count}`;
};
