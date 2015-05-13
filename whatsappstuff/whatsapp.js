var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);


function getLastMessage () 
{
	var lastMessage = $(".msg-group > .message-in > .bubble-text > .contents > .message-text-multi > .message-text > .selectable-text:last").html()
	return lastMessage;
}

setTimeout(getLastMessage, 1000);
