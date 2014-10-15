
var spookieCount,
	totalSpookies,
	items = {},
	itemsCost = {
		jackOLantern : 20,
		skellingtons : 50,
		spookySpiders : 100,
		ectoplasm : 500
	},
	multiplier = 1,
	sps = 0,
	twoSpooky = false,
	timer = 0,
	ghosties = [],
	ghostiesId=0,
	time=0,
	prettyTime="00:00",
	dayornight = "day";

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
function resetGame()
{
	
	items["skellingtons"] = 0
	items["spookySpiders"] = 0
	items["jackOLantern"] = 0
	items["ectoplasm"] = 0
	
	spookieCount = 0;
	totalSpookies = 0;

	gameLoop();

	items["skellingtons"] = 0
	items["spookySpiders"] = 0
	items["jackOLantern"] = 0
	items["ectoplasm"] = 0
	
	spookieCount = 0;
	totalSpookies = 0;
}

function spookies(e)
{
	//console.log(e)
	ghosties.push(new ghostie(e.clientX, e.clientY,ghostiesId))
	if(!twoSpooky)
	{
		spookieCount += 1 * multiplier;
		totalSpookies += 1 * multiplier;
		//console.log("spooky");
	}
	else
	{
		spookieCount +=1 * multiplier * 2;
		totalSpookies += 1 * multiplier * 2;
	}
			
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
	localStorage.setItem("totalSpookies", totalSpookies);
	localStorage.setItem("time", time);		
}

function load()
{
	spookieCount = parseInt(localStorage.getItem("spookieCount"));
	items["skellingtons"] = parseInt(localStorage.getItem("skellingtons"));
	items["spookySpiders"] = parseInt(localStorage.getItem("spookySpiders"));
	items["jackOLantern"] = parseInt(localStorage.getItem("jackOLantern"));
	items["ectoplasm"] = parseInt(localStorage.getItem("ectoplasm"));
	totalSpookies = parseInt(localStorage.getItem("totalSpookies"));
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
	
	
	document.getElementById("jackOLanternCost").innerHTML = itemsCost["jackOLantern"];
	document.getElementById("skellingtonCost").innerHTML = itemsCost["skellingtons"];
	document.getElementById("spookySpiderCost").innerHTML = itemsCost["spookySpiders"];
	document.getElementById("spookyEctoplasmCost").innerHTML = itemsCost["ectoplasm"];
	
	document.getElementById("jackOLanternNumbers").innerHTML = items["jackOLantern"];
	document.getElementById("skellingtonNumbers").innerHTML = items["skellingtons"];
	document.getElementById("spookySpiderNumbers").innerHTML = items["spookySpiders"];
	document.getElementById("spookyEctoplasmNumbers").innerHTML = items["ectoplasm"];

	document.getElementById("totalSpookiesCount").innerHTML = prettyNumbers(totalSpookies);
	document.getElementById("time").innerHTML = prettyTime;

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
	requestAnimationFrame(displayUpdate);
	
	
	document.title = Math.round(spookieCount) + " Spookies"
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
function gameUpdate()
{	

	itemsCost["jackOLantern"] = 20 + Math.round(20 * Math.pow(items["jackOLantern"],1.09));
	itemsCost["skellingtons"] = 50 + Math.round(50 * Math.pow(items["skellingtons"],1.09));
	itemsCost["spookySpiders"] = 100 + Math.round(100 * Math.pow(items["spookySpiders"],1.09));
	itemsCost["ectoplasm"] = 500 + Math.round(500 * Math.pow(items["ectoplasm"],1.09));
	
	sps = items["skellingtons"]*2 + items["spookySpiders"]*4 + items["ectoplasm"]*10;
	multiplier = 1 + (0.5*items["jackOLantern"])+(2*items["ectoplasm"]);
}

window.addEventListener('load',function(){
	document.getElementById("spookyBill").addEventListener("click", spookies);
	document.getElementById("jackOLanternShop").addEventListener("click", function(){buy("jackOLantern");}, false);
	document.getElementById("skellingtonShop").addEventListener("click", function(){buy("skellingtons");}, false);
	document.getElementById("spookySpiderShop").addEventListener("click", function(){buy("spookySpiders");}, false);
	document.getElementById("spookyEctoplasmShop").addEventListener("click", function(){buy("ectoplasm");}, false);
	document.getElementById('spookyBill').ondragstart = function() { return false; };
});


var timer = window.setInterval(function(){gameLoop();}, 1000);

requestAnimationFrame(displayUpdate);
