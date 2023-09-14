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
