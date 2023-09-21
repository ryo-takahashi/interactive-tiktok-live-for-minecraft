# 妨害マイクラツール セットアップ方法

## 注意事項

- このツールは TikTok 側もしくは Minecraft 側の仕様変更により、動作しなくなる可能性があります
- このツールを使用したことによるいかなる損害も責任を負いません

## 動作環境

- Windows 10

## ソフトウェアのインストール

- node.js のインストール
  - https://nodejs.org/ja/download
- Visual Studio Code のインストール
  - https://azure.microsoft.com/ja-jp/products/visual-studio-code

## PC のセットアップ

- Powershell を管理者権限で起動し、以下を入力
  - ※Minecraft アプリケーションがこのツールにアクセスするために必要

```shell
CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"
```

## ツールのダウンロード

- https://github.com/ryo-takahashi/interactive-tiktok-live-for-minecraft/tree/master
- Code > Download ZIP
- 任意の場所に解凍する

## ツールのセットアップ

- 解凍したフォルダを Visual Studio Code で開く
- Visual Studio Code のターミナルで以下を入力

```shell
npm install
```

## ツールの起動

- Visual Studio Code のターミナルで以下を入力

```shell
npm run start
```

## Minecraft の設定

- Minecraft を起動
- Minecraft ゲーム内で以下を設定する
  - 設定 > 暗号化された websocket の要求 > OFF

## Minecraft でツールと接続する

### a. PC 版 Minecraft の場合

- Minecraft ゲーム内で以下のコマンドを入力
- ※ライブ配信が始まっていない場合は動作しません

```
/connect localhost:8080/{TikTok のライブ配信のID}
```

### b. PS4, Switch, iOS, Android などの Minecraft の場合

- PC の IP アドレスを確認する
- Minecraft ゲーム内で以下のコマンドを入力
- ※ライブ配信が始まっていない場合は動作しません

```
/connect {PCのIPアドレス}:8080/{TikTokのライブ配信のID}
# PCのIPアドレスが 192.168.11.6 の場合
/connect 192.168.11.6/taberukun
```

# よくある質問

## ツールが起動できない

- node.js がインストールされているか確認する
- Visual Studio Code のターミナルで以下を入力し、エラーが出ないか確認する

```shell
npm install
```

## Minecraft がツールと接続できない

- ツールが起動しているか確認する
- Minecraft の設定を確認する
  - 設定 > 暗号化された websocket の要求 > OFF
- PC の IP アドレスを確認する
- ※ライブ配信が始まっていない場合は動作しません

## カスタマイズしたい

- [カスタマイズについてはこちら](Customize.md)

## うまく動作しない

- Discord で質問してください
  - https://discord.gg/TsCytcvuh4
