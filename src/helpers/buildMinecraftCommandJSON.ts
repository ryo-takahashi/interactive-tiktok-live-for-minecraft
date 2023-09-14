import * as uuid from "uuid";

export const buildMinecraftCommandJSON = (command: string) => {
  return {
    header: {
      version: 1,
      requestId: uuid.v4(),
      messageType: "commandRequest",
      messagePurpose: "commandRequest",
    },
    body: {
      origin: {
        type: "player",
      },
      version: 1,
      commandLine: command,
    },
  };
};
