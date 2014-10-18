(function() {
var spookieCount,
	totalSpookies,
	items = {},
	itemsCost = {
		jackOLantern : 20,
		skellingtons : 50,
		spookySpiders : 100,
		ectoplasm : 500,
		hauntedHouse : 100000
	},
	multiplier = 1,
	sps = 0,
	twoSpooky = false,
	timer = 0,
	ghosties = [],
	ghostiesId=0,
	time=0,
	prettyTime="00:00",
	dayornight = "day",
	settingsOpen = false,
	achievesOpen = false,
	achieved = {},
	messages = [],
	messageTimer =0,
	messageOpacity = 0;


	//"name": new ach(id,name,desc,total,persec,perclick,jol,skelly,spider,ecto,haunt),
var achievements =
{
	"2 Spooky": new ach(0, "2 Spooky", "Earn at least two Spookies",2,0,0,0,0,0,0,0),

	"13 lumens": new ach(1, "13 lumens","Own at least one Jack O'Lantern",0,0,0,1,0,0,0,0),

	"Auto Spook": new ach(2,"Auto Spook","Have at least one Spookie per second",0,1,0,0,0,0,0,0),

	"Way 2 Spooky": new ach(3,"Way 2 Spooky","Have at least two of every item",0,0,0,2,2,2,2,2)

}
	

function prettyNumbers(n)
{
	//stolen from cookie clicker #NoShame
	var base = 0;
	var formats = 
	[
		'',
		' Million',
		' Billion',
		' Trillion',
		' Quadrillion',
		' Quintillion',
		' Sextillion',
		' Septillion',
		' Octillion',
		' Nonillion',
		' Decillion'
	]

	if(n >= 1000000 && isFinite(n))
	{
		n /= 1000
		while(Math.round(n) >= 1000)
		{
			n /= 1000;
			base++;
		}
		n = Math.round(n*Math.pow(10,2))/Math.pow(10,2);
		if (base > formats.length) {return 'Infinity';} else { return n + formats[base];}
	}
	else
	{
		return Math.floor(n);
	}
}
function messageHandler()
{
	if (dayornight == "day")
	{
		rgbvalue = "rgba(0,0,0,"+messageOpacity+")";
	}
	else
	{
		rgbvalue = "rgba(255,255,255,"+messageOpacity+")";
	};
	if (messages[0] != undefined)
	{
		document.getElementById("message").style.color= rgbvalue;
		document.getElementById("message").innerHTML = messages[0];
		messageTimer+=1;
		if (messageOpacity<1 && messageTimer<=100)
		{
			messageOpacity+= 0.03;
		}
		else if (messageOpacity>0 && messageTimer>100)
		{
			messageOpacity-= 0.03;
		};
		

		if (messageTimer%200 == 0)
		{
			document.getElementById("message").innerHTML = messages.shift()
			messageTimer = 0;
			messageOpacity= 0;
		};
	}
	else
	{
		document.getElementById("message").innerHTML = ""
	};
	
}
function ach(id,name,desc,total,persec,perclick,jol,skelly,spider,ecto,haunt)
{
	this.id=id;
	this.name = name;
	this.got=false;
	this.desc = desc;
	this.get = function()
	{
		achieved[name] = {"id":id,"name":name,"desc":desc}
		this.got=true;
		messages.unshift('Achievement earned: "'+ this.name +'"')
	};

	this.check = function()
	{
		if (achieved[this.name] != null)
		{
			this.got=true;
		}
		else if (totalSpookies>=total && sps >= persec && multiplier >= perclick && items["jackOLantern"]>=jol && items["skellingtons"]>= skelly && items["spookySpiders"]>=spider && items["ectoplasm"] >= ecto && items["hauntedHouse"]>= haunt)
		{
			this.get()
		};
	};
}

function resetGame()
{
	
	for(name in items)
	{
		items[name] = 0;
	};
	achieved = {};

	gameLoop();

	achieved = {};
	for (name in achievements) {
		achievements[name].got = false;
	};
	
	spookieCount = 0;
	totalSpookies = 0;

	messages.push("Game Reset")
}

function spookies(e)
{
	//console.log(e)
	ghosties.push(new ghostie(e.clientX, e.clientY,ghostiesId))
	var extraMultiplier = twoSpooky ? 2:1;
	spookieCount +=1 * multiplier * extraMultiplier;
	totalSpookies += 1 * multiplier * extraMultiplier;
			
}

function ghostie(x,y, id)
{
	//console.log(x,y)
	this.x = x += Math.random()*200-100;
	this.y = y;
	this.id = id;
	ghostiesId++;
	this.class = "ghostie";
	this.element = document.createElement("img");
	this.element.src = "creepy.png";
	this.element.class=this.class;
	this.element.id = this.id;

	this.element = document.body.appendChild(this.element);
	this.element.style.position = "absolute";
	this.element.style.left = this.x + "px";
	this.element.style.top = this.y + "px";
	this.element.style.cursor = "pointer"
	this.element.addEventListener("click", spookies);
	this.element.ondragstart = function() { return false; };

	this.draw = function()
	{

		this.y -= 0.5;
		this.element.style.top= this.y + "px";

	}
}

function save()
{
	localStorage.setItem("spookieCount", spookieCount);
	localStorage.setItem("skellingtons", items["skellingtons"]);
	localStorage.setItem("spookySpiders", items["spookySpiders"]);
	localStorage.setItem("jackOLantern", items["jackOLantern"]);
	localStorage.setItem("ectoplasm", items["ectoplasm"]);
	localStorage.setItem("hauntedHouse", items["hauntedHouse"]);
	localStorage.setItem("totalSpookies", totalSpookies);
	localStorage.setItem("achieved", JSON.stringify(achieved))
	localStorage.setItem("time", time);
	messages.push("Game Saved")
}

function load()
{
	spookieCount = parseInt(localStorage.getItem("spookieCount"));
	items["skellingtons"] = parseInt(localStorage.getItem("skellingtons"));
	items["spookySpiders"] = parseInt(localStorage.getItem("spookySpiders"));
	items["jackOLantern"] = parseInt(localStorage.getItem("jackOLantern"));
	items["ectoplasm"] = parseInt(localStorage.getItem("ectoplasm"));
	items["hauntedHouse"] = parseInt(localStorage.getItem("hauntedHouse"));
	totalSpookies = parseInt(localStorage.getItem("totalSpookies"));
	achieved = JSON.parse(window.localStorage.getItem("achieved"));
	time = parseInt(localStorage.getItem("time"));

	if(isNaN(spookieCount))
	{
		spookieCount = 0;
	}
	
	for(item in items)
	{
		if(isNaN(items[item]))
		{
			items[item] = 0
		}
	}

	if(isNaN(totalSpookies))
	{
		totalSpookies = spookieCount;
	}
	if(isNaN(time))
	{
		time = 0;
	}
	if (achieved == null)
	{
		achieved = {};
	};
	gameUpdate();
}

function buy(item)
{
	if( item != null && item != undefined)
	{
		if(spookieCount >= itemsCost[item])
		{
			spookieCount = spookieCount - itemsCost[item];
			items[item] += 1;
			if(items[item] % 10 == 0)
			{
				maximumSpookage();
			}
		}
	}
	gameUpdate();
}
function maximumSpookage()
{
	document.getElementById("spookyBill").src = "spook.gif";

	document.body.style.background = "#000000";
	document.body.style.color = "#FFFFFF";
	twoSpooky = true;
	timer += 10;
}
function gameLoop()
{	
	var stuff = dayNight();
	prettyTime = stuff[1].slice(0,2)+":"+ stuff[1].slice(-2);
	dayornight = stuff[0];
	if (time%600==0)
	{
		save();
	};
	if(twoSpooky)
	{
		
		
		if(timer > 0)
		{
			timer = timer -1;
			if(timer%2)
			{
				document.getElementById("maximumSpookage").style.color= "#FFFFFF";
			}
			else
			{
				document.getElementById("maximumSpookage").style.color= "#000000";
			}
		}
		else
		{
			twoSpooky = false;
			
		}
	}
	if (dayornight == "night" && !twoSpooky)
	{
		document.getElementById("spookyBill").src = "spookybill.jpg"
		document.body.style.background = "#000000";
		document.body.style.color = "#FFFFFF";
		document.getElementById("maximumSpookage").style.color= "#000000";
		spookieCount += (sps*2);
		totalSpookies += (sps*2);
	}
	else if (dayornight == "night" && twoSpooky)
	{
		document.body.style.background = "#000000";
		document.body.style.color = "#FFFFFF";
		spookieCount += (sps*2);
		totalSpookies += (sps*2);
	}
	else if(dayornight == "day" && !twoSpooky)
	{
		document.getElementById("spookyBill").src = "spookybill.jpg";
		document.body.style.background = "#FFFFFF";
		document.body.style.color = "#000000";
		document.getElementById("maximumSpookage").style.color= "#FFFFFF";
		spookieCount += sps;
		totalSpookies += sps;
	}
	else if(dayornight == "day" && twoSpooky)
	{
		document.body.style.background = "#000000";
		document.body.style.color = "#FFFFFF";
		document.getElementById("maximumSpookage").style.color= "#FFFFFF";
		spookieCount += sps;
		totalSpookies += sps;
	}
	else
	{	

		document.body.style.background = "#0000000";
		document.body.style.color = "#FFFFFF";
	};
	document.title = Math.round(spookieCount) + " Spookies"
	if (achieved !=null) 
	{
		for (name in achievements) 
		{
			var a = achievements[name];
			if(a.got == false)
			{
				a.check();
			}
		};
	};
	gameUpdate();
}

function displayUpdate()
{

	
	document.getElementById("spookiesCount").innerHTML = prettyNumbers(spookieCount);
	if (dayornight == "night")
	{
		document.getElementById("spookiesPerSecondCount").innerHTML = sps*2;
	}
	else
	{
		document.getElementById("spookiesPerSecondCount").innerHTML = sps;
	};
	if(twoSpooky)
	{
		document.getElementById("spookiesPerClickCount").innerHTML = multiplier*2;
	}
	else
	{
		document.getElementById("spookiesPerClickCount").innerHTML = multiplier;
	}
	
	document.getElementById("totalSpookiesCount").innerHTML = prettyNumbers(totalSpookies);
	document.getElementById("time").innerHTML = prettyTime;

	for(item in items)
	{
		var temp = item+"Cost";
		document.getElementById(temp.trim()).innerHTML = itemsCost[item];
	}
	for(item in items)
	{
		var temp = item+"Numbers";
		document.getElementById(temp.trim()).innerHTML = items[item];
	}

	for (var i = ghosties.length - 1; i >= 0; i--) {
		if (ghosties[i] != undefined)
		{
			ghosties[i].draw();

			if(ghosties[i].y < 0)
			{
				document.body.removeChild(ghosties[i].element);
				delete ghosties[i]
			}
		}
	};
	var temp = ""
	for(name in achieved)
	{
		var a = achieved[name];

		temp += "<div><h3>"+name+"</h3><p>"+a.desc+"</p></div>";
	}
	if (temp == "")
	{
		temp = "<div><h3>No achievements yet :(</div></h3>";
	};
	document.getElementById("achieved").innerHTML= temp;
	requestAnimationFrame(displayUpdate);
	
	
	document.title = Math.round(spookieCount) + " Spookies"
	messageHandler();
}
function dayNight()
{

	time += 5;
	var temp = time+"";
	if (time >= 2400)
	{
		time =0;
	};
	if(temp.slice(-2) == 60)
	{
		time+=40;
	}
	if (time+600 <1000)
	{
		var currentTime = "0"+(time+600);
	}
	else if(time+600 > 2400)
	{
		if (((time-2400)+600)<100)
		{
			var currentTime = "00" + ((time-2400)+600);
		}
		else
		{
			var currentTime = "0" + ((time-2400)+600);
		};

	}
	else
	{
		var currentTime = time+600+"";
	}
	if (time+600< 100)
	{
		var currentTime = "00"+(time+600);
	}


	
	if (time < 1500 || time > 2300 )
	{
		return ["day", currentTime];
	}
	else if (time >= 1500 && time <= 2300)
	{
		return ["night", currentTime];
	};
}
function settings (e, thing) 
{
	if (e=="help")
	{
		document.getElementById("helpPopup").style.visibility ="visible";
	}
	else if(e=="save")
	{
		save();
	}
	else if (e=="reset")
	{
		if (window.confirm("Are you sure you want to reset your game?"))
		{
			resetGame();
		}
	}
	else if(settingsOpen==true && achievesOpen == false)
	{
		document.getElementById("cover").style.visibility ="hidden";
		document.getElementById("settings").style.visibility ="hidden";
		document.getElementById("helpPopup").style.visibility ="hidden";
		settingsOpen = false;
	}
	else if (settingsOpen==false)
	{
		document.getElementById("cover").style.visibility ="visible";
		document.getElementById("settings").style.visibility ="visible";
		settingsOpen = true;
	};
}
function showAchieves()
{
	if (achievesOpen == false)
	{
		achievesOpen = true;
		document.getElementById("cover2").style.visibility ="visible";
		document.getElementById("achievementPopup").style.visibility ="visible";
	}
	else if (achievesOpen == true)
	{
		achievesOpen = false;
		document.getElementById("cover2").style.visibility ="hidden";
		document.getElementById("achievementPopup").style.visibility ="hidden";
	};
}
function gameUpdate()
{	

	itemsCost["jackOLantern"] = 20 + Math.round(20 * Math.pow(items["jackOLantern"],1.09));
	itemsCost["skellingtons"] = 50 + Math.round(50 * Math.pow(items["skellingtons"],1.09));
	itemsCost["spookySpiders"] = 100 + Math.round(100 * Math.pow(items["spookySpiders"],1.09));
	itemsCost["ectoplasm"] = 500 + Math.round(500 * Math.pow(items["ectoplasm"],1.09));
	itemsCost["hauntedHouse"] = 100000 + Math.round(100000 * Math.pow(items["hauntedHouse"],1.09));

	
	sps = items["skellingtons"]*2 + items["spookySpiders"]*4 + items["ectoplasm"]*10 + items["hauntedHouse"]*100;
	multiplier = 1 + (0.5*items["jackOLantern"])+(2*items["ectoplasm"]) + (20*items["hauntedHouse"]);
}

window.addEventListener('load',function(){
	load();
	document.getElementById("jackOLanternShop").addEventListener("click", function(){buy("jackOLantern");}, false);
	document.getElementById("skellingtonsShop").addEventListener("click", function(){buy("skellingtons");}, false);
	document.getElementById("spookySpidersShop").addEventListener("click", function(){buy("spookySpiders");}, false);
	document.getElementById("ectoplasmShop").addEventListener("click", function(){buy("ectoplasm");}, false);
	document.getElementById("hauntedHouseShop").addEventListener("click", function(){buy("hauntedHouse");}, false);
	document.getElementById("spookyBill").addEventListener("click", spookies);
	document.getElementById("settingsButton").addEventListener("click", function(){settings()}, false);
	document.getElementById("achievementButton").addEventListener("click", function(){showAchieves()}, false);
	document.getElementById("cover").addEventListener("click", function(){settings();}, false);
	document.getElementById("cover2").addEventListener("click", function(){showAchieves();}, false);
	document.getElementById("reset").addEventListener("click", function(){settings("reset")}, false);
	document.getElementById("cross").addEventListener("click", function(){settings();}, false);
	document.getElementById("save").addEventListener("click", function(){settings("save");}, false);
	document.getElementById("help").addEventListener("click", function(){settings("help");}, false);
	document.getElementById('spookyBill').ondragstart = function() { return false;spookies(); };
});
window.addEventListener('unload',function(){save();});

var timer = window.setInterval(function(){gameLoop();}, 1000);

requestAnimationFrame(displayUpdate);
})()
	
	
