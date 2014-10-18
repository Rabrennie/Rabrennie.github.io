

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
//"name": new ach(id,name,desc,total,persec,perclick,jol,skelly,spider,ecto,haunt),
var achievements =
{
	"2 Spooky": new ach(0, "2 Spooky", "Earn at least two Spookies",2,0,0,0,0,0,0,0),

	"13 lumens": new ach(1, "13 lumens","Own at least one Jack O'Lantern",0,0,0,1,0,0,0,0),

	"Auto Spook": new ach(2,"Auto Spook","Have at least one Spookie per second",0,1,0,0,0,0,0,0),

	"Way 2 Spooky": new ach(3,"Way 2 Spooky","Have at least two of every item",0,0,0,2,2,2,2,2)

}

console.log(achievements);