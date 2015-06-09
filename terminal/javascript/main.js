function outputHandler (s, custom, user) 
{
	custom = typeof custom !== 'undefined' ? custom : false;
	user = typeof user !== 'undefined' ? user : true;

	var prefix = " "

	if (user) 
	{
		prefix = "<br> - "
	};

	if (!custom)
	{
		$("#output").append("<div>"+prefix+s+"</div>");
		$("#output")[0].scrollTop = $("#output")[0].scrollHeight;
	};
}

function inputHandler (s) 
{
	var com = s.toLowerCase().split(" ")[0];
	var args = s.toLowerCase().split(" ");
	args.shift();
	//console.log(com, args.length)
	var recognised = false;

	if (s != "") 
	{
		outputHandler(s);
		input["history"].push(s);
		input["historyPos"] = input["history"].length;
	};

	if (input["commands"][com])
	{
		if (input["commands"][com]["args"])
		{

			input["commands"][com]["callback"](args)

		}
		else
		{
			input["commands"][com]["callback"]()
		};
		recognised = true;
	};

	if (!recognised && dir[game["cDir"]]["files"].indexOf(com)>=0)
	{
		if (files[com]["corrupted"])
		{
			outputHandler(fakeCorrupt(files[com]["data"].length),false,false)
			outputHandler("Possible corruption of "+com ,false,false)
		}
		else
		{
			outputHandler(files[com]["data"],false,false)
		};
		
	}
	else if(!recognised && s != "")
	{
		outputHandler("Unrecognised Command", false, false);
	};
}

function toggleInput ()
{
	$("#d").toggle()
	$("#i")[0].focus();
}

function fakeCorrupt(len)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < len; i++ )
    	if (Math.random()>0.8) 
    	{
    		text += " "
    	}
    	else
    	{
    		text += possible.charAt(Math.floor(Math.random() * possible.length));
    	};
        
    return text;
}

function upHistory () 
{
	input["historyPos"] -= 1;
	if (input["historyPos"]<=0) 
	{
		input["historyPos"] = 0;
	};
	if (input["history"].length > 0) 
	{
		$("#i")[0].value = input["history"][input["historyPos"]]
	};	
}

function downHistory () 
{
	input["historyPos"] += 1;

	if (input["historyPos"]>input["history"].length)
	{
		input["historyPos"] = input["history"].length
	}
	else if (input["historyPos"]<input["history"].length) 
	{
		$("#i")[0].value = input["history"][input["historyPos"]]
	};

	if (input["historyPos"]==input["history"].length)
	{
		input["historyPos"] = input["history"].length
		$("#i")[0].value = "";
	};
}

var input = 
{
	"history":[],
	"historyPos":0,
	"commands":{}
};

var game =
{
	"cDir":"root",
};

//arrow key handler
$(document).keydown(function(e) 
{
    switch(e.which) {
        case 38: // up
        upHistory();
        break;

        case 40:
        downHistory();
        break;

        default: return;
    }
    e.preventDefault();
});

//input enter key handler
$( "#i" ).keypress(function(e) 
{
	if (e.keyCode == 13)
	{
		inputHandler(this.value);
		this.value = "";
	};
});


//keeps focus on input element
var el = $('#i')[0];
el.focus();
el.onblur = function () {
    setTimeout(function () {
        el.focus();
    });
};

//changes name of input
$("#user").html("user@"+game["cDir"]);