window.canvasconsole = 
(
	function()
	{


		function CanvasConsole(c,ctx)
		{

			this.c = c
			this.ctx = ctx
			this.ib = document.getElementById("canvasConsoleInputBox");
			this.cOpen = false;
			this.inputs = [];
			this.frameCount = 0;
			this.blink = "|";
			this.text = "";
			this.commands = {}
			var _this = this;

			this.ib.oninput=function(){_this.text = _this.ib.value};

			this.inputHandler(_this);


		}

		var canvasconsole = 
		{
			init: function(c,ctx)
			{
				var thing = document.createElement('input');
				thing.type = "text";
				thing.id = "canvasConsoleInputBox";
				document.body.appendChild(thing);
				return new CanvasConsole(c,ctx);
			}
		}

		CanvasConsole.prototype.on = function(el,evt,fn) 
		{
			return el.addEventListener(evt, fn, false); 
		};

		CanvasConsole.prototype.inputHandler = function(_this) 
		{
			document.addEventListener
				("keyup",

					function(e)
					{

						if(e.keyCode==222)
						{
							
							if (_this.cOpen)
							{
								_this.c.focus();
								_this.ib.value = "";
								_this.text=""
							}
							else
							{
								_this.ib.value = "";
								_this.text=""
								_this.ib.focus();
							};
							_this.cOpen = !_this.cOpen;

						}
						else if(e.keyCode==13)
						{
							if (_this.cOpen)
							{
								_this.parseInput(_this.ib.value);
								_this.inputs.unshift(_this.ib.value);
								_this.ib.value = "";
								_this.text=""
							};
							
						}
						else
						{
							if (_this.cOpen)
							{
								if (document.activeElement != _this.ib)
								{
									_this.ib.focus()
								};
							};
						}
						
					}

				);
		}

		CanvasConsole.prototype.render = function() 
		{

			var oldStyle = this.ctx.fillStyle;
			this.frameCount++;
			

			if (this.frameCount%30 <15)
			{
				this.blink = "|"
			}
			else
			{
				this.blink = ""
			};

			this.ctx.fillStyle = "black"

			

			if (this.cOpen)
			{
				this.ctx.fillStyle = "rgba(0,0,0,0.5)"
				this.ctx.fillRect(0,this.c.height - 100, this.c.width,100)
				this.ctx.fillStyle = "white"
				this.ctx.font="12px Georgia";
				this.ctx.fillText("> " + this.text + this.blink,10,this.c.height - 10);

				for (var i = 4; i >= 0; i--) {
					if (this.inputs[i] != undefined)
					{
						this.ctx.fillText("> " + this.inputs[i],10,this.c.height - 25 - (i*15));
					};
					
				};
			};
			this.ctx.fillStyle = oldStyle;
		};
		
		CanvasConsole.prototype.newCommand = function(s, callback) 
		{
			this.commands[s] = callback;
		};

		CanvasConsole.prototype.parseInput = function(s)
		{
			for (command in this.commands)
			{

				if (s.indexOf(command)==0)
				{
					this.commands[command](s);
				};
			}
		}


		return canvasconsole;
	}


());