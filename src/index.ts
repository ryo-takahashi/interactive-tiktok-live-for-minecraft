import { WebcastPushConnection } from "tiktok-live-connector";

// const tiktokUsername = "fantasyonline_official";
const tiktokUsername = "cristian_armandoo";

const tiktokLiveConnection = new WebcastPushConnection(tiktokUsername);

tiktokLiveConnection
  .connect()
  .then((state) => {
    console.info(`Connected to roomId ${state.roomId}`);
  })
  .catch((err) => {
    console.error("Failed to connect", err);
  });

tiktokLiveConnection.on("chat", (data) => {
  const { comment, nickname, uniqueId } = data;
  console.log(`${nickname}@${uniqueId}): ${comment}`);
});

tiktokLiveConnection.on("gift", (data) => {
  const { nickname, uniqueId, giftId } = data;
  console.log(`${nickname}@${uniqueId}): send gift_id = ${giftId}`);
});

tiktokLiveConnection.on("like", (data) => {
  const { likeCount, nickname, uniqueId, totalLikeCount } = data;
  console.log(
    `${nickname}@${uniqueId}): likeCount = ${likeCount}, totalLikeCount = ${totalLikeCount}`
  );
});

tiktokLiveConnection.on("follow", (data) => {
  const { nickname, uniqueId } = data;
  console.log("Followed by", `${nickname}@${uniqueId}`);
});

tiktokLiveConnection.on("share", (data) => {
  const { nickname, uniqueId } = data;
  console.log("Shared by", `${nickname}@${uniqueId}`);
});

tiktokLiveConnection.on("subscribe", (data) => {
  console.log(data.uniqueId, "subscribed!");
});
