import { WebSocket, WebSocketServer } from "ws";
import * as uuid from "uuid";
import * as fs from "fs";
import { createServer } from "https";

// マイクラのソケット通信用の証明書を読み込む
const privateKey = fs.readFileSync("./certs/localhost-private-key.pem", "utf8");
const certificate = fs.readFileSync("./certs/localhost.pem", "utf8");

const server = createServer({
  key: privateKey,
  cert: certificate,
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Connected");
  const subscribeMessageJSON = {
    header: {
      version: 1,
      requestId: uuid.v4(),
      messageType: "commandRequest",
      messagePurpose: "subscribe",
    },
    body: {
      eventName: "PlayerTravelled",
    },
  };

  ws.send(JSON.stringify(subscribeMessageJSON));

  ws.on("message", (rawData) => {
    const data = JSON.parse(rawData.toString());
    console.log(data);
    if (!data.body.eventName) {
      return;
    }
    if (data.body.eventName != "PlayerTravelled") {
      return; // メッセージのイベント名がPlayerTravelledでない場合は処理を抜ける
    }
    if (ws.readyState !== WebSocket.OPEN) {
      return; // WebSocketがOPEN状態でない場合は処理を抜ける
    }

    // コマンド発行用JSONの組み立て
    const commandRequestMessageJSON = {
      header: {
        version: 1, // プロトコルのバージョン1.18.2時点では1でOK
        requestId: uuid.v4(), // UUIDv4を生成して指定
        messageType: "commandRequest", // commandRequestを指定
        messagePurpose: "commandRequest", // commandRequestを指定
      },
      body: {
        origin: {
          type: "player", // 誰がコマンドを実行するかを指定（ただし、Player以外にどの値が利用可能かは要調査）
        },
        version: 1, // プロトコルのバージョン1.18.2時点では1でOK
        commandLine: "summon chicken ~~~", // マイクラで実行したいコマンドを指定（ここではニワトリをスポーンさせるコマンドを指定）
      },
    };

    // コマンド発行用のJSONをシリアライズ（文字列化）して送信
    ws.send(JSON.stringify(commandRequestMessageJSON));
  });
});

server.on("request", (req, res) => {
  res.writeHead(200);
  res.end("All glory to WebSockets!\n");
});

server.listen(8080);
