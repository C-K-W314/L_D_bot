let channel_access_TOKEN = "[LINEのチャネルアクセストークン]"
let groupID = "[LINEグループのグループID]";

function doPost(e){
	let events = JSON.parse(e.postData.contents).events;
	events.forEach(function(event){
		if (event.type == "discord"){
			sendToLine(event);
		} else if (event.type == "message"){
      nullPointerReply(event);
    }
	});
}

function nullPointerReply(e){
  const msg =  e.message.text
  if (msg == "ぬるぽ"){
    let reply = "ガッ";
    event = {
      name: "bot",
      message: reply
    };
    sendToLine(event);
  }
}

function sendToLine(e){
  let message = {
    "to" : groupID,
    "messages" : [
      {
        "type" : "text",
        "text" : e.message
      }
    ]
  };

  let replyData = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + channel_access_TOKEN
    },
    "payload" : JSON.stringify(message)
  };

  let response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", replyData);

  return response.getResponseCode();
}