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
	itemNames = {
		jackOLantern : "Jack O'Lantern",
		skellingtons : "Skellington",
		spookySpiders : "Spooky Spider",
		ectoplasm : "Ectoplasm",
		hauntedHouse : "Haunted House"
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
	upgradesOpen = false,
	achieved = [],
	boughtUpgrades = [],
	messages = [],
	messageTimer =0,
	messageOpacity = 0,
	images = [];


	//id: new ach(id,name,desc,total,persec,perclick,jol,skelly,spider,ecto,haunt),
var achievements =
{
	0: new ach(0, "A Little 2 Spooky", "Earn at least 2 Total Spookies",2,0,0,0,0,0,0,0),

	1: new ach(1, "13 lumens","Own at least 1 Jack O'Lantern",0,0,0,1,0,0,0,0),

	2: new ach(2,"Auto Spook","Gain at least 10 Spookies per second",0,10,0,0,0,0,0,0),

	3: new ach(3,"Slightly 2 Spooky","Own at least 2 of every item",0,0,0,2,2,2,2,2),

	4: new ach(4,"\"I've been slimed\"","Own at least 1 litre of ectoplasm",0,0,0,0,0,0,1,0),

	5: new ach(5,"Spooky Scary Skeletons","Own at least 1 Skellington",0,0,0,0,1,0,0,0),

	6: new ach(6,"4 Many Legs 6 Me","Own at least 1 Spooky Spider",0,0,0,0,0,1,0,0),

	7: new ach(7,"Creeky Floorboards","Own at least 1 Haunted House",0,0,0,0,0,0,0,1),

	8: new ach(8,"Nearly 2 Spooky","Have at least 2000 Total Spookies",2000,0,0,0,0,0,0,0),

	9: new ach(9,"2 Spooky 4 Me","Have at least 2,000,000 Total Spookies",2000000,0,0,0,0,0,0,0),

	10: new ach(10,"Efficient Spookage","Gain at least 10 Spookies per click",0,0,10,0,0,0,0,0),

	11: new ach(11,"Haunted","Have at least 50 ghosts on the screen at once",Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity),

	12: new ach(12,"Upgrader","Own at least 1 upgrade",Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity),
	
	13: new ach(13,"HALF A BILL","Have at least 500 Million Total Spookies",500000000,0,0,0,0,0,0,0),
	
	14: new ach(14,"Bill(ion) Murray","Have at least 1 Billion Total Spookies",1000000000,0,0,0,0,0,0,0)
};

	//id : new upgrade (id,"name","desc",cost,spsMulti,spcMulti,spsItems, spcItems) 
var upgrades = 
{
	0:new upgrade(0,"Lightbulb","<b>+1</b> Spookies per second and <b>+0.5</b> Spookies per click for every Jack O'Lantern you own",100,1,1,{jackOLantern:1},{jackOLantern:0.5}),

	1 : new upgrade (1,"World Wide Web","<b>+4</b> Spookies per second and <b>+2</b> Spookies per click for every Spooky Spider you own",3000,1,1,{spookySpiders:4}, {spookySpiders:2}),

	2: new upgrade (2,"Psychomagnotheric Slime","<b>+10</b> Spookies per second and <b>+5</b> Spookies per click for every litre of Ectoplasm you own",20000,1,1,{ectoplasm:10}, {ectoplasm:5}),

	
	3 : new upgrade (3,"Mansions","<b>+100</b> Spookies per second and <b>+20</b> Spookies per click for every Haunted House you own",1000000,1,1,{hauntedHouse:100}, {hauntedHouse:20}),

	4 : new upgrade (4,"Spooky Sounds","<img src='http://i3.kym-cdn.com/photos/images/newsfeed/000/407/216/693.gif'>",1000000,3,3,{}, {}) 

}

achievements[11].check = function() 
{

	if (achieved.indexOf(this.id) != -1)
	{
		this.got=true;
	}
	else if (ghosties.length >= 50)
	{
		this.get();
	};
};
achievements[12].check = function() 
{

	if (achieved.indexOf(this.id) != -1)
	{
		this.got=true;
	}
	else if (boughtUpgrades.length >= 1)
	{
		this.get();
	};
};
	
function devSpookies()
{
	spookieCount += 10000000000000;
};

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
};

function flyingImages(id,x,y,velX,velY, rot)
{

	this.img  =document.getElementById(id);
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.width = this.img.clientWidth;
	this.height = this.img.clientHeight;
	this.rot = rot;

	console.log(this.width);

}

function messageHandler()
{
	var white = ((dayornight=="day")? ((twoSpooky)? true:false):true)
	if (!white)
	{
		rgbvalue = "rgba(0,0,0,"+messageOpacity+")";
	}
	else
	{
		rgbvalue = "rgba(255,255,255,"+messageOpacity+")";
	};
	if (messages[0] != undefined && !settingsOpen && !achievesOpen && !upgradesOpen )
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
};

function ach(id,name,desc,total,persec,perclick,jol,skelly,spider,ecto,haunt)
{
	this.id=id;
	this.name = name;
	this.got=false;
	this.desc = desc;
	this.get = function()
	{
		achieved.push(this.id)
		this.got=true;
		messages.push('Achievement earned: "'+ this.name +'"')
	};

	this.check = function()
	{
		
		if (achieved.indexOf(this.id) != -1)
		{
			this.got=true;
		}
		else if (totalSpookies>=total && sps >= persec && multiplier >= perclick && items["jackOLantern"]>=jol && items["skellingtons"]>= skelly && items["spookySpiders"]>=spider && items["ectoplasm"] >= ecto && items["hauntedHouse"]>= haunt)
		{
			this.get()
		};
	};
};

function upgrade (id,name,desc,cost,spsMulti,spcMulti,spsItems, spcItems) 
{
	this.id = id;
	this.name = name;
	this.desc = desc;
	this.cost = cost;

	this.got = false;

	this.spsMulti = spsMulti;
	this.spcMulti = spcMulti;

	this.spsItems = spsItems;
	this.spcItems = spcItems;

	this.buy = function () 
	{
		if (!this.got)
		{
			if (spookieCount >= this.cost)
			{
				spookieCount -= this.cost;
				this.got = true;
				gameUpdate();
				messages.push('Upgrade bought: "'+this.name+'"' );
				boughtUpgrades.push(this.id);
			};
		};
	}
};

function resetGame()
{
	
	for(name in items)
	{
		items[name] = 0;
	};

	gameLoop();

	twoSpooky = false;
	timer = 0;
	
	spookieCount = 0;
	totalSpookies = 0;
	time=0;

	achieved = [];

	for (name in achievements) {
		achievements[name].got = false;
	};
	boughtUpgrades = [];
	for (id in upgrades) {
		upgrades[id].got=false;
	};

	messages.push("Game Reset")
};

function spookies(e)
{
	//console.log(e)
	spookieCount +=1 * multiplier;
	totalSpookies += 1 * multiplier;
	ghosties.push(new ghostie(e.clientX, e.clientY,ghostiesId))				
};

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
	this.element.addEventListener("mousedown", spookies);
	this.element.ondragstart = function() { return false; };

	this.draw = function()
	{

		this.y -= 0.5;
		this.element.style.top= this.y + "px";

	}
};

function movement()
{

	for (var i = images.length - 1; i >= 0; i--)
	{
		images[i].img.style.visibility = "visible";
		images[i].img.style.left = images[i].x+"px"
		images[i].img.style.top = images[i].y+"px"
		images[i].img.style.transform = "rotate("+images[i].rot+"deg)"

		if (images[i]["x"] >= window.innerWidth-images[i]["width"])
		{
			images[i]["velX"] = -images[i]["velX"];
		}
		else if (images[i]["x"]<0)
		{
			images[i]["velX"] = -images[i]["velX"];
		};

		if (images[i]["y"] >= window.innerHeight-images[i]["height"])
		{
			images[i]["velY"] = -images[i]["velY"]; 
		}
		else if (images[i]["y"]<0)
		{
			images[i]["velY"] = -images[i]["velY"];;
		};

		images[i]["y"] += images[i]["velY"];
		images[i]["x"] += images[i]["velX"];
		images[i].rot++;


	};

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
	localStorage.setItem("boughtUpgrades", JSON.stringify(boughtUpgrades))
	localStorage.setItem("time", time);
	

	if (messages.indexOf("Game Saved")==-1) {messages.push("Game Saved")};
};

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
	boughtUpgrades = JSON.parse(window.localStorage.getItem("boughtUpgrades"));
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
	if (achieved == null || achieved.constructor == Object)
	{
		achieved = [];
	};
	if (boughtUpgrades == null) 
	{
		boughtUpgrades = []
	}
	else
	{
		for (var i = 0; i < boughtUpgrades.length; i++) {
			upgrades[boughtUpgrades[i]].got=true;
		};
	};
	gameUpdate();
};

function buy(item, ten, hundred)
{
	if( item != null && item != undefined)
	{
		var n = (ten ? 10:hundred ? 100: 1)
		var count = 0;
		var cost = 0;
		for (var i = 0; i < n; i++) {

			if(spookieCount >= itemsCost[item])
			{
				spookieCount = spookieCount - itemsCost[item];
				count++;
				cost += itemsCost[item];
				items[item] += 1;
				if(items[item] % 10 == 0)
				{
					maximumSpookage();
				}
				
			}
			else
			{
				break;
			}
			gameUpdate();
		};
		var s = (count==1) ? "":"s" 
		if(count > 1)
		{
			messages.push(count + " " +  itemNames[item] + s +" bought for "+ prettyNumbers(cost) + " Spookies");
		}
		
	}
	gameUpdate();
};

function maximumSpookage()
{
	document.getElementById("spookyBill").src = "spook.gif";

	document.body.style.background = "#000000";
	document.body.style.color = "#FFFFFF";
	twoSpooky = true;
	timer += 10;
};

function gameLoop()
{	
	spookieCount += sps;
	totalSpookies += sps;

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
	if (achieved !=null) 
	{
		for (id in achievements) 
		{
			var a = achievements[id];
			if(a.got == false)
			{
				a.check();
			}
		};
	};
	document.title = prettyNumbers(spookieCount) + " Spookies"
	gameUpdate();
}

function displayUpdate()
{

	
	document.getElementById("spookiesCount").innerHTML = prettyNumbers(spookieCount);
	document.getElementById("spookiesCount").title=Math.floor(spookieCount) + " Spookies"

	document.getElementById("spookiesPerSecondCount").innerHTML = sps;
	document.getElementById("spookiesPerClickCount").innerHTML = multiplier;
	
	document.getElementById("totalSpookiesCount").innerHTML = prettyNumbers(totalSpookies);
	document.getElementById("totalSpookiesCount").title=Math.floor(totalSpookies) + " Spookies"
	document.getElementById("time").innerHTML = prettyTime;

	for(item in items)
	{
		var temp = item+"Cost";
		document.getElementById(temp.trim()).innerHTML = prettyNumbers(itemsCost[item]);

		if (itemsCost[item] > 1000000)
		{
			document.getElementById(temp.trim()).title = itemsCost[item] + " Spookies";
		};
	}
	for(item in items)
	{
		var temp = item+"Numbers";
		document.getElementById(temp.trim()).innerHTML = items[item];
	}
	if (dayornight == "night" && !twoSpooky)
	{
		document.getElementById("spookyBill").src = "spookybill.jpg"
		document.body.style.background = "#000000";
		document.body.style.color = "#FFFFFF";
		document.getElementById("maximumSpookage").style.color= "#000000";
	}
	else if (dayornight == "night" && twoSpooky)
	{
		document.body.style.background = "#000000";
		document.body.style.color = "#FFFFFF";
		
	}
	else if(dayornight == "day" && !twoSpooky)
	{
		document.getElementById("spookyBill").src = "spookybill.jpg";
		document.body.style.background = "#FFFFFF";
		document.body.style.color = "#000000";
		document.getElementById("maximumSpookage").style.color= "#FFFFFF";
		
	}
	else if(dayornight == "day" && twoSpooky)
	{
		document.body.style.background = "#000000";
		document.body.style.color = "#FFFFFF";
		document.getElementById("maximumSpookage").style.color= "#FFFFFF";
		
	}
	else
	{	

		document.body.style.background = "#0000000";
		document.body.style.color = "#FFFFFF";
	};
	if (twoSpooky)
	{
		movement();
	}
	else
	{
		for (var i = images.length - 1; i >= 0; i--)
		{
			images[i].img.style.visibility = "hidden";
		}
	};
	

	for (var i = ghosties.length - 1; i >= 0; i--) {
		if (ghosties[i] != undefined)
		{
			ghosties[i].draw();

			if(ghosties[i].y < 0)
			{
				document.body.removeChild(ghosties[i].element);
				ghosties.splice(i, 1);
			}
		}
	};
	var temp = ""
	for (var i = 0; i < achieved.length; i++) 
	{
		var a = achievements[achieved[i]];

		temp += "<div><h3>"+a.name+"</h3><p>"+a.desc+"</p></div>";
	}
	if (temp == "")
	{
		temp = "<div><h3>No achievements yet :(</div></h3>";
	};

	document.getElementById("achievementCount").innerHTML = achieved.length;

	document.getElementById("achieved").innerHTML= temp;


	requestAnimationFrame(displayUpdate);
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
function showUpgrades() 
{
	if (upgradesOpen == false)
	{
		upgradesOpen = true;
		document.getElementById("cover3").style.visibility ="visible";
		document.getElementById("upgradesPopup").style.visibility ="visible";
	}
	else if (upgradesOpen == true)
	{
		upgradesOpen = false;
		document.getElementById("cover3").style.visibility ="hidden";
		document.getElementById("upgradesPopup").style.visibility ="hidden";
	};
}
function lel(id)
{
	var	id=id
	return function(id){console.log(id)};
}
function gameUpdate()
{	
	itemsCost["jackOLantern"] = 20 + Math.round(20 * Math.pow(items["jackOLantern"],1.09));
	itemsCost["skellingtons"] = 50 + Math.round(50 * Math.pow(items["skellingtons"],1.09));
	itemsCost["spookySpiders"] = 100 + Math.round(100 * Math.pow(items["spookySpiders"],1.09));
	itemsCost["ectoplasm"] = 500 + Math.round(500 * Math.pow(items["ectoplasm"],1.09));
	itemsCost["hauntedHouse"] = 100000 + Math.round(100000 * Math.pow(items["hauntedHouse"],1.09));

	var temp = ""
	document.getElementById("upgrades").innerHTML = temp;
	for (id in upgrades) 
	{
		var u = upgrades[id]

		if(!u.got)
		{
			var idtemp = "u"+u.id;
			var id = u.id;
			temp = document.createElement("div");
			temp.id= idtemp;
			temp.innerHTML = "<h3>"+u.name+"</h3><p>Cost: "+u.cost+" Spookies</p><p>"+u.desc+"</p>";

			document.getElementById("upgrades").appendChild(temp);

		    if (typeof window.addEventListener === 'function'){
		        (function (_id) {
		            temp.addEventListener('click', function(){
		                upgrades[_id].buy();
		            });
		        })(u.id);
		    }
			
			
		}


	}
	if (temp == "")
	{
		temp = "<div><h3>You own all the upgrades :)</div></h3>";
		document.getElementById("upgrades").innerHTML= temp;
	};

	
	spookyMath();	
}

function spookyMath()
{

	sps = 0;
	multiplier = 1;
	var baseSpS = 
	{
		jackOLantern 	: 0,
		skellingtons 	: 2,
		spookySpiders 	: 4,
		ectoplasm 		: 10,
		hauntedHouse 	: 100
	};
	var baseSpC = 
	{
		jackOLantern 	: 0.5,
		skellingtons 	: 1,
		spookySpiders 	: 2,
		ectoplasm 		: 5,
		hauntedHouse 	: 20
	};

	var multiplierSpS = 1,
		multiplierSpC = 1;

	multiplierSpS += ((dayornight=="day") ? 0:1)
	multiplierSpC += twoSpooky ? 1:0;

	for (upgrade in upgrades) {
		var u = upgrades[upgrade];
		if (u.got)
		{
			multiplierSpS *= u.spsMulti;
			multiplierSpC *= u.spcMulti;

			for (item in u.spsItems) {
				baseSpS[item] += u.spsItems[item];
			};
			for (item in u.spcItems) {
				baseSpC[item] += u.spcItems[item];
			};
		};
	};

	for(item in items)
	{
		sps += items[item]*baseSpS[item];
	};

	for(item in items)
	{
		multiplier += items[item]*baseSpC[item];
	};

	sps *= multiplierSpS;

	multiplier *= multiplierSpC;
}

window.addEventListener('load',function(){
	load();

	images = 
	[
		new flyingImages("1spooky",200,420,-5,-5,30),
		new flyingImages("2spooky", 200,220,8,3,10),
		new flyingImages("3spooky",0,0,4,8,0),
	
	]
	
	document.getElementById("jackOLanternShop").addEventListener("click", function(e)
	{
		buy("jackOLantern", e.ctrlKey,e.shiftKey);

	}, false);
	document.getElementById("skellingtonsShop").addEventListener("click", function(e){buy("skellingtons",e.ctrlKey,e.shiftKey);}, false);
	document.getElementById("spookySpidersShop").addEventListener("click", function(e){buy("spookySpiders",e.ctrlKey,e.shiftKey);}, false);
	document.getElementById("ectoplasmShop").addEventListener("click", function(e){buy("ectoplasm",e.ctrlKey,e.shiftKey);}, false);
	document.getElementById("hauntedHouseShop").addEventListener("click", function(e){buy("hauntedHouse",e.ctrlKey,e.shiftKey);}, false);
	document.getElementById("spookyBill").addEventListener("mousedown", spookies);
	document.getElementById("settingsButton").addEventListener("click", function(){settings()}, false);
	document.getElementById("achievementButton").addEventListener("click", function(){showAchieves()}, false);
	document.getElementById("upgradesButton").addEventListener("click", function(){showUpgrades()}, false);
	document.getElementById("cover").addEventListener("click", function(){settings();}, false);
	document.getElementById("cover2").addEventListener("click", function(){showAchieves();}, false);
	document.getElementById("cover3").addEventListener("click", function(){showUpgrades();}, false);
	document.getElementById("reset").addEventListener("click", function(){settings("reset")}, false);
	document.getElementById("cross").addEventListener("click", function(){settings();}, false);
	document.getElementById("save").addEventListener("click", function(){settings("save");}, false);
	document.getElementById("help").addEventListener("click", function(){settings("help");}, false);
	//document.getElementById("version").addEventListener("click", devSpookies);
	document.getElementById('spookyBill').ondragstart = function() { return false; };
	document.getElementById('spookySkellington').ondragend = function() {spookies(); };
});
window.addEventListener('unload',function(){save();});

var timer = window.setInterval(function(){gameLoop();}, 1000);

requestAnimationFrame(displayUpdate);
})()
	
	
