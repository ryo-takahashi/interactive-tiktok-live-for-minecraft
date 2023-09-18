import { MCEffect } from "../types/MCEffect";

export const buildGiveEffectCommandAtPlayer = (
  effect: MCEffect,
  seconds: number,
  amplifier: number
) => {
  return `effect @a ${effect} ${seconds} ${amplifier}`;
};
