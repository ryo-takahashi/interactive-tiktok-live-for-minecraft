import { WebSocket } from "ws";
import { TikTokGift } from "../types/TikTokGift";
import { LiveConfig } from "../types/LiveConfig";

export const handleReceiveGift = async (data: any, config: LiveConfig) => {
  const { nickname, uniqueId, giftId } = data;

  switch (giftId) {
    case TikTokGift.Rose:
      break;
    case TikTokGift.TikTok:
      break;
    case TikTokGift.gg:
      break;
    case TikTokGift.Dougnnut:
      break;
  }
};
