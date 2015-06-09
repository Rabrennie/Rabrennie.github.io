function helpDisplay () 
{
	var output = "Commands available:" + "<br>";
	for(var command in input["commands"])
	{
		output += "<br>"+command;
	}
	outputHandler(output, false, false);
}

function echoCmd (args) 
{
	var output = args.join(" ")
	outputHandler(output, false, false);
}

function loadingBar(id, len,interval,callback)
{
	//loadingBar("coolio",50,500,function(){alert("LEL")})
	toggleInput();
	var inner = "["
	var spaces = len
	outputHandler("<span class='"+id+"'></span>", false, false);
	function updateBar ()
	{

		inner = "[&nbsp;"

		for (var i = spaces; i < len; i++) 
		{
			inner += "&#8211;"
		};
		for (var i = 0; i < spaces; i++) 
		{
			inner += "&nbsp;"
		};
		spaces -= 1
		inner += "]"
		inner += "&nbsp;&nbsp;"
		inner += 100-Math.round(spaces/len*100);
		inner += "%"

		$("."+id+":last").html(inner)
		if (spaces <= 0)
		{
			toggleInput();
			window.clearInterval(loadingTimer);
			callback();
		};

	}

	var loadingTimer = setInterval(updateBar,interval)
}

function listCmd ()
{
	for (var i = 0; i < dir[game["cDir"]]["dirs"].length; i++) 
	{
		outputHandler("/"+dir[game["cDir"]]["dirs"][i],false,false)
	};
	for (var i = 0; i < dir[game["cDir"]]["files"].length; i++) 
	{
		outputHandler(""+dir[game["cDir"]]["files"],false,false)
	};
}

function cdCmd (args) 
{
	if (args.length==0)
	{
		game["cDir"]=dir[game["cDir"]]["parent"]
	}
	else if (dir[game["cDir"]]["dirs"].indexOf(args[0]) >= 0)
	{
		game["cDir"] = args[0];
	};
	$("#user").html("user@"+game["cDir"]);
}

function loadingTest()
{
	loadingBar("coolio",50,200,function(){outputHandler("These loading bars tho",false,false)})
}

function unCorruptCmd(args)
{
	if (args.length == 1) 
	{

		var curfile = args[0];

		if (dir[game["cDir"]]["files"].indexOf(curfile)>=0)
		{
			loadingBar("uncorrupter",50,100,function()
			{
				files[curfile]["corrupted"] = false;
				outputHandler(curfile + " has been fixed",false,false)
			})
		}
		else
		{
			outputHandler("Cannot find file "+ curfile +" in current directory",false,false)
		};
	}
	else
	{
		outputHandler("unCorrupter takes 1 argument. <br> Example: unCorrupter example.txt",false,false)
	};
}

function clearCmd () 
{
	$("#output").html("")
}

function creditsCmd () 
{
	var output = "";
	output += "Made using:";
	output += "<ul>";
	output += "<li><a href=\"https://jquery.com/\">jQuery</a></li>"
	output += "<li><a href=\"https://www.google.com/fonts/specimen/Inconsolata\">Inconsolata Font</a></li>"

	output += "</ul>";
	outputHandler(output,false,false)
}