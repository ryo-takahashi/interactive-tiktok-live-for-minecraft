import { MCSound } from "../types/MCSound";

export const buildPlaysoundCommand = (sound: MCSound) => {
  return `playsound ${sound} @a`;
};
