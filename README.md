# Interactive-TikTok-Live-For-Minecraft

- TikTok のライブ配信内のイベントを元に Minecraft へコマンドを送信するツール
- PC(Windows) にてツールを起動し、Minecraft 側からツールに接続します。
- [いますぐツールを使ってみたい方はこちら (クイックスタート)](QuickStart.md)

# Todo

- [x] customized from liveconfig.json file
- [ ] testable
- [ ] error handling
- [ ] fetch remote liveconfig.json file

# Requirements

- Minecraft 統合版
  - Switch, PS4, Xbox, Windows 10, Android, iOS など対応
  - プレビュー版でも動作しますが、製品版での利用を推奨
- Windows 10
- [node.js](https://nodejs.org/ja/download)

# Setup

```shell
# ※Minecraftがこのツールにアクセスするために必要
CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"

npm install
```

```shell
# minecraftの設定
# minecraftを起動 > 設定 > 暗号化されたwebsocketの要求 > OFF
```

# Usage

```shell
npm run start
```

```
# Minecraftで以下のコマンドを入力
# ライブ配信が始まっていない場合はエラーが出ます
/connect {PCのIPアドレス}:8080/{TikTokのライブ配信のID}
```

# Customize

- [カスタマイズについてはこちら](Customize.md)

# Resources

- https://github.com/zerodytrash/TikTok-Live-Connector
- https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c#file-mcpe-w10-event-names
- https://www.youtube.com/watch?v=3yNnpVBc-eI
- https://minecraft.lflab.work/ws-connect
- https://streamdps.com/tiktok-widgets/gifts/
