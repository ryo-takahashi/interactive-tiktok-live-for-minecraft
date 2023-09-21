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
npm run start
```

```
# Minecraftで以下のコマンドを入力
# ライブ配信が始まっていない場合はエラーが出ます
/connect {PCのIPアドレス}:8080/{TikTokのライブ配信のID}

# 例1 (Windows版Minecraftの場合): /connect localhost:8080/taberukun
# 例2 (Switch版Minecraftの場合で、PCのIPアドレスが192.168.11.6の場合): /connect 192.168.11.6:8080/taberukun
```

# Customize

- プログラムを変更することでカスタマイズできます。
  - ※設定ファイルからカスタマイズできる機能を提供予定です。
- 現在の設定
  - ライブに参加
    - 100% 村人のスポーン
  - いいね
    - 100% クリーパーのスポーン
    - 0.333% TNT 15 個のスポーン
    - 0.03% エリトラの付与
    - 0.03% 帯電クリーパーのスポーン
  - フォロー, シェア
    - 100% TNT 15 個のスポーン
  - コメント
    - 1: TNT のスポーン
    - 2: ダイヤモンドの付与
    - 3: 採掘速度上昇効果の付与
    - 4: ダメージ耐性の付与
    - 5: 移動速度上昇効果の付与
    - 6: コンジットパワーの付与
    - 7: 暗視効果の付与
    - 8: 黒曜石の付与
    - 9: 金のりんごの付与
    - 0: エンダーアイの付与

# Roadmap

- α 版
  - プログラム上でのみ動作変更が可能
- β 版
  - 設定ファイルから動作変更が可能
- 正式版
  - TBW

# Resources

- https://github.com/zerodytrash/TikTok-Live-Connector
- https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c#file-mcpe-w10-event-names
- https://www.youtube.com/watch?v=3yNnpVBc-eI
- https://minecraft.lflab.work/ws-connect
- https://streamdps.com/tiktok-widgets/gifts/
