# L_D_bot  
connecting between LINE and Discord  

## 詳細  
Glitch,GASで構成したLINEとDiscordを接続するbot  
GlitchにてNode.jsで立てたサーバにてDiscordのWebhookを監視・メッセージを送信  
通話状態が変更された際にGASにメッセージをPOST、GASはLINEのmessaging APIを用いてLINEにメッセージを送信  

## 機能  
Discordの通話に参加/脱退した人がいた場合LINEに通知  
Discordでbotにリプライを送ると返信する  
Discordのテキストチャンネルで「ぬるぽ」と発言した場合「ガッ」を返す  
LINEのグループで「ぬるぽ」と発言した場合「ガッ」を返す  

![bot](https://user-images.githubusercontent.com/76941709/103762145-2650af00-505b-11eb-8a64-8ebbd41f88ec.png)
