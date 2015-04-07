window.windowsxp = (function () {
	function WindowsXP () 
	{
		this.mousedown = []
	}

	var windowsxp = 
	{

		boot: function()
		{
			console.log("booting")
			return new WindowsXP();
		}

	}

	WindowsXP.prototype.on = function (el,evt,fn) 
	{
		
		el.addEventListener(evt, fn, false);        
	        
	}

	WindowsXP.prototype.setBG = function() {
		document.body.style.backgroundImage = "url('img/background.jpg')";
		return this;
	};

	WindowsXP.prototype.newWindow = function(x,y,w,h,title) {
		

		content = 'content';
		title = title;
		div = document.createElement('div');
		titleBar = document.createElement('div');
		titleControl = document.createElement('span');
		s = div.style;
		ts = titleBar.style;
		tcs = titleControl.style;

		titleBar.className = "titleBar"
		
		s.margin = 0;
		s.padding = 0;
		
		titleControl.innerHTML = '<img src="img/iconmin.png"><img src="img/iconmax.png"><img src="img/iconclose.png">'
		titleBar.innerHTML = '<img src="img/icondrive.png"> ' + title ;
		s.position = "fixed";
		s.backgroundColor = "#ffffff";
		s.width = w+"px";
		s.height = h+"px";
		s.top = y + "px";
		s.left = x+"px";
		s.borderRadius = "2px";
		s.overflow = "hidden";
		s.boxShadow = "0px 0px 0px 2px rgba(3,86,229,1)";
		s.fontFamily = "MS Sans Serif, Verdana, Segoe, sans-serif";;

		//ts.backgroundColor = "#0355e5"
		ts.backgroundImage = "url('img/titlebg.jpeg')";
		ts.backgroundRepeat="repeat-x";
		ts.height = "30px";
		ts.padding = "2px 2px 0px 0px";
		ts.color = "#ffffff";
		ts.fontFamily = "MS Sans Serif, Verdana, Segoe, sans-serif";
		ts.fontWeight = "500";
		ts.fontSize = "15px";
		ts.lineHeight = "1";
		ts.overflow = "hidden";

		tcs.float = "right";
		titleBar.childNodes[0].style.verticalAlign = "bottom";
		titleControl.childNodes[0].style.margin = "4px 2px 0px 0px";
		titleControl.childNodes[1].style.margin = "4px 2px 0px 0px";
		titleControl.childNodes[2].style.margin = "4px 2px 0px 0px";
		

		document.body.appendChild(div);
		div.appendChild(titleBar);
		titleBar.appendChild(titleControl);



		div.innerHTML = div.innerHTML+ content;
		this.on(div.childNodes[0], "mousemove" , function(e){

			
			if (e.which == 1)
			{
				e.path[1].style.left=parseInt(e.path[1].style.left.split("p")[0]) +e.webkitMovementX +"px"
			e.path[1].style.top=parseInt(e.path[1].style.top.split("p")[0]) +e.webkitMovementY +"px"
			};
			

			

		})
		
	};

	return windowsxp;
}());
