import fs from "fs";
import { liveConfigSchema } from "../types/LiveConfig";

export const fetchLiveConfig = () => {
  const file = fs.readFileSync("./liveconfig.json", "utf-8");
  const config = JSON.parse(file);
  return liveConfigSchema.parse(config);
};
