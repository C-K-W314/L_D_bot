var GLITCH_URL = "[GlitchのURL]";

function wakeGlitch(){
 var json = {
   'type':'wake'
 };
 sendGlitch(GLITCH_URL, json);
}
function sendGlitch(uri, json){
 var params = {
   'contentType' : 'application/json; charset=utf-8',
   'method' : 'post',
   'payload' : json,
   'muteHttpExceptions': true
 };
 response = UrlFetchApp.fetch(uri, params);
}