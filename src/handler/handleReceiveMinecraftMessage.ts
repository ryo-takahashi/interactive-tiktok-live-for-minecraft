import { handleReceivePlayerDied } from "./handleReceivePlayerDied";

export const handleReceiveMinecraftMessage = async (rawData: any) => {
  try {
    const data = JSON.parse(rawData);
    const hasError = data?.body?.statusCode === -2147483648;
    if (hasError) {
      console.error(data?.body?.statusMessage);
      return;
    }

    const eventName = data?.header?.eventName;
    switch (eventName) {
      case "PlayerDied":
        handleReceivePlayerDied();
        break;
      default:
        break;
    }
  } catch (error) {
    console.error(error);
  }
};
