# L_D_bot
connecting between LINE and Discord

## 詳細
Glitch,GASで構成したLINEとDiscordを接続するbot
GlitchにてNode.jsで立てたサーバにてDiscordのWebhookを監視・メッセージを送信
通話状態が変更された際にGASにメッセージをPOST、GASはLINEのmessaging APIを用いてLINEにメッセージを送信
