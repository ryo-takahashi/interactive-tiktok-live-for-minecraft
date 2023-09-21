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

- `liveconfig.json` ファイルを編集することでカスタマイズできます
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
    - 8: ネザライトインゴット、鍛冶台、鍛冶テンプレートの付与
    - 9: 金のりんごの付与
    - 0: エンダーアイの付与

# Resources

- https://github.com/zerodytrash/TikTok-Live-Connector
- https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c#file-mcpe-w10-event-names
- https://www.youtube.com/watch?v=3yNnpVBc-eI
- https://minecraft.lflab.work/ws-connect
- https://streamdps.com/tiktok-widgets/gifts/
