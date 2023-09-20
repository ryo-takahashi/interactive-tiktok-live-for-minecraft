# Interactive-TikTok-Live-For-Minecraft

- TikTok のライブ配信内のイベントを元に Minecraft へコマンドを送信するツール
- PC(Windows) にてツールを起動し、Minecraft 側からツールに接続するようなイメージです。

# Requirements

- Minecraft 統合版
  - Switch, PS4, Xbox, Windows 10, Android, iOS など対応
  - プレビュー版でも動作しますが、製品版での利用を推奨
- Windows 10
- [node.js](https://nodejs.org/ja/download)

# Setup

```shell
# Powershellを管理者権限で起動し、以下のコマンドを入力
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
# Powershell等で以下のコマンドを入力
npm run dev
```

```
# Minecraftで以下のコマンドを入力
# ライブ配信が始まっていない場合はエラーが出ます
/connect {PCのIPアドレス}:8080/{TikTokのライブ配信のID}

# 例1 (Windows版Minecraftの場合): /connect localhost:8080/taberukun
# 例2 (Switch版Minecraftの場合で、PCのIPアドレスが192.168.11.6の場合): /connect 192.168.11.6:8080/taberukun
```

# Resources

- https://github.com/zerodytrash/TikTok-Live-Connector
- https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c#file-mcpe-w10-event-names
- https://www.youtube.com/watch?v=3yNnpVBc-eI
- https://minecraft.lflab.work/ws-connect
- https://streamdps.com/tiktok-widgets/gifts/
