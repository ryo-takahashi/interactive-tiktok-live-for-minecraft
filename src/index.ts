import { WebcastPushConnection } from "tiktok-live-connector";

let tiktokUsername = "fantasyonline_official";

let tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

tiktokLiveConnection.on("chat", (data) => {
  console.log(
    `${data.uniqueId} (userId:${data.userId}) writes: ${data.comment}`
  );
});

tiktokLiveConnection.on("gift", (data) => {
  console.log(`${data.uniqueId} (userId:${data.userId}) sends ${data.giftId}`);
});
