import { postMinecraftCommand } from "../helpers/postMinecraftCommand";
import { WebSocket } from "ws";

export const handleStreamEnd = async (actionId: number) => {
  if (actionId === 3) {
    console.log("Stream ended by user");
  }
  if (actionId === 4) {
    console.log("Stream ended by platform moderator (ban)");
  }
};
