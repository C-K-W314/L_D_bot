const http = require('http');
const querystring = require('querystring');
const axiosBase = require('axios');
const discord = require('discord.js');
const client = new discord.Client();

const mainChannelId = "687267790637236225";
const voiceChannelId = "685489964976177152";

const url = "/macros/s/AKfycbzW8u-ZOVNQdcoXaDX3D7P2LVdPH2wQMlIHda5kF3ccPnc6CsXIxxo7nQ/exec";

http.createServer( (req, res) =>{
	if (req.method === 'POST'){
		let data = "";
		req.on('data', (chunk) =>{
			data += chunk;
		});

		req.on('end', () =>{
			if (!data){
				console.log("No post data");
				res.end();
				return;
			}

			let dataObject = querystring.parse(data);
			console.log("post:" + dataObject.type);

			if (dataObject.type === "wake"){
				console.log("Woke up in post");
				res.end();
				return;
			}

			res.end();

		});
	}
	else if (req.method === 'GET'){
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Discord Bot is active now\n');
	}
}).listen(3000);

client.on('ready', message =>{
	console.log("Bot is ready");
	client.user.setPresence({ activity: { name: 'げーむ' } });
});

client.on('message', message =>{
	if (message.author.bot){
		return;
	}
  
	if (message.mentions.users.has(client.user.id)){
		sendReply(message, "呼びましたか？");
		return;
  }
  
	if (message.content === "ぬるぽ"){
		let text = "ガッ";
		sendMsg(message.channel.id, text);
		return;
	}
});

client.on('voiceStateUpdate', (oldState, newState) =>{
	if (oldState.channel === null && newState.channel !== null && newState.channelID === voiceChannelId){
		if (newState.channel.members.size === 1){
			sendGAS(newState.member.user.username + "が通話を開始しました");
		}
		else if (newState.channel.members.size > 1){
			sendGAS(newState.member.user.username + "が通話に参加しました");
			sendGAS("現在の人数は" +　String(newState.channel.members.size) + "人です");
		}
	}
	else if (oldState.channel !== null && newState.channel === null && oldState.channelID === voiceChannelId){
		if (oldState.channel.members.size === 0){
			sendGAS("通話が終了しました")
		}
		else if (oldState.channel.members.size !== 0){
			sendGAS(oldState.member.user.username + "が通話から抜けました");
			sendGAS("現在の人数は" +　String(oldState.channel.members.size) + "人です");
		}

	}
});

if(process.env.DISCORD_BOT_TOKEN == undefined){
	console.log('DISCORD_BOT_TOKENが設定されていません。');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

function sendReply(message, text){
	message.reply(text)
		.then(console.log("リプライ送信: " + text))
		.catch(console.error);
}

function sendMsg(channelId, text){
	client.channels.cache.get(channelId).send(text)
		.then(console.log("メッセージ送信: " + text))
		.catch(console.error);
}

const axios = axiosBase.create({
	baseURL: "https://script.google.com",
	headers: {
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
	responseType: "json"
});

function sendGAS(msg){
	let data = {
		events: [
			{
				type: "discord",
				name : "bot",
				message: msg
			}
		]
	};

	axios.post(url, data)
		.then(async function (response) {
			const responsedata = response.data;
		})
		.catch(function (error) {
			console.log("ERROR!! occurred in Backend.");
			console.log(error);
		});
}