# 設定のカスタマイズ

- `liveconfig.json` ファイルを編集することでカスタマイズできます
- 編集後はツールの再起動が必要です

# フォーマット

```json
{
  "random_respawn": true,
  "trigger": {
    "like": [
      {
        "rate": 1, // 100%
        "actions": [
          {
            // ...
          }
        ]
        // ...
      }
    ],
    "chat": [
      {
        // ...
      }
    ]
    // ...
  }
}
```
