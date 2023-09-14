# setup

```shell
# Minecraftがlocalhost にアクセスするために必要
CheckNetIsolation.exe LoopbackExempt -a -n="Microsoft.MinecraftUWP_8wekyb3d8bbwe"

npm install
```

```shell
# minecraftの設定
# setting > 暗号化されたwebsocketの要求 > OFF
# 通常のMinecraftを起動
```

# run

```shell
npm run dev
```

```minecraft
/connect localhost:8080
```

# run:live

```
npm run live
```

# resources

- https://github.com/zerodytrash/TikTok-Live-Connector
- https://gist.github.com/jocopa3/5f718f4198f1ea91a37e3a9da468675c#file-mcpe-w10-event-names
- https://www.youtube.com/watch?v=3yNnpVBc-eI
- https://minecraft.lflab.work/ws-connect
- https://streamdps.com/tiktok-widgets/gifts/
