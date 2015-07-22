function biosTestInit()
{
    var delay = 33,
        step = 648,
        curMemory = 0,
        memory = 26732,
        counter = 0,
        lines = ["SpookyBIOS V2.42 (c) 2015 Spooky Corporation.",
                "BIOS Date : 22/07/2015, 20:05:45",
                "<br />",
                "Main Processor : Qualvidia III 2GHz",
                "CPU Power : 1.21 Jiggawatts",
                "<br />",
                "Total Memory : 27216K"];

    function printLines()
    {

        $("#output").append("<p>"+lines[counter]+"</p>");
        if (counter < lines.length-1)
        {
            counter++
            window.setTimeout(printLines, 300);
        }
        else
        {
            window.setTimeout(initMemory, 300);
        };
    }

    function initMemory()
    {
        $("#output").append("<p id='memoryTest'>Memory Test : <span id='memoryTestNumber'>0K</span></p>");
        updateMemory();
    }

    function updateMemory()
    {
        curMemory += step;
        $("#memoryTestNumber").html(curMemory+"K");
        if (curMemory < memory)
        {
            window.setTimeout(updateMemory, delay);
        }
        else
        {
            $("#memoryTest").append(" OK");
            $("#output").append("<br />");

            window.setTimeout(function(){clearScreen(randomStuff);}, 500);
        };
    }

    printLines();
}

function clearScreen(callback)
{
    $("#output").html("");
    callback();
}

function randomStuff()
{
    var delay = 300,
        strings = ["Setting parameters of disk 1", "Loading kernel modules","Cleaning up temporary files","Scanning for devices","Waiting for devices to settle","<br /> Starting SpookyOS"],
        current = 0,
        dots = 0;


    function showStuff()
    {
        var temp = "";
        if (!$("#random"+current).length)
        {
            $("#output").append("<p id='random"+current+ "'>"+strings[current]+"<span id='dots"+current+"'></span></p>");
        }
        for (var i = 0; i < dots; i++)
        {
            //$("#dots"+devices[current]).append(".");
            temp+=".";
        }
        $("#dots"+current).html(temp);
        if (dots < 4)
        {
            dots++;
            window.setTimeout(showStuff, delay+Math.random()*100-50);
        }
        else
        {
            dots = 0;
            $("#random"+current).append("  DONE");
            if (current < strings.length-1)
            {
                current++
                window.setTimeout(showStuff, delay+Math.random()*100-50);
            }
            else
            {
                window.setTimeout(function(){clearScreen(spookyOs);}, 500);
            }
        }
    }
    showStuff();
}
function spookyOs()
{
    $("#output").append("<p><h3>Welcome To SpookyOS</h3></p>");
    $("#output").append("<p><h5>SpookyOS [Version 2.4.3600] Copyright (c) 2015 Spooky Corporation. All Rights Reserved.</h5></p>");
    showCommands();
}
function showCommands()
{
    $("#output").append("<p><b>Commands</b></p>");
    $("#output").append("<p>help    - Show this help</p>");
    $("#output").append("<p>about    - Some information about me</p>");
    $("#output").append("<p>projects - Show projects I've worked on</p>");
    $("#output").append("<p>github  - Open My Github Page</p>");
    $("#output").append("<p>twitter - Open My Twitter Page</p>");
    $("#output").append("<p>reddit  - Open My Reddit Page</p>");
    $("#output").append("<p>steam   - Open My Steam Page</p><br />");
    $("#inputContainer").css("visibility","visible")
    $('#i')[0].focus();
}

function showProjects()
{
    $("#output").append("<p><b>ChromeBait</b> - <<a href='https://github.com/Rabrennie/ChromeBait'>https://github.com/Rabrennie/ChromeBait</a>></p>");
    $("#output").append("<p>- A chrome extension that turns the clickbait dial to 11.</p><br />");
    $("#output").append("<p><b>Spookie Clicker</b> - <<a href='http://rabrennie.com/spookies'>http://rabrennie.com/spookies</a>></p>");
    $("#output").append("<p>- A Small incremental game about Bill Murray, Spiders and Spooky Skellingtons</p><br />");
}
function showInfo()
{
    $("#output").append("<p>Hi, I am a 17 year old Software Development Student in Scotland. You can find my projects on github. You can contact me through email at rennierab@gmail.com or through any of the sites I have provided links for.</p><br />");
}
function openURL(url)
{
    $("#output").append("<p>Opening "+url+"</p><br />");
    window.open(url);
}
function showSkellington()
{
    $("#output").append("<p>▒▒▒░░░░░░░░░░▄▐░░░░</p>");
    $("#output").append("<p>▒░░░░░░▄▄▄░░▄██▄░░░</p>");
    $("#output").append("<p>░░░░░░▐▀█▀▌░░░░▀█▄░</p>");
    $("#output").append("<p>░░░░░░▐█▄█▌░░░░░░▀█▄</p>");
    $("#output").append("<p>░░░░░░░▀▄▀░░░▄▄▄▄▄▀▀</p>");
    $("#output").append("<p>░░░░░▄▄▄██▀▀▀▀░░░░░</p>");
    $("#output").append("<p>░░░░█▀▄▄▄█░▀▀░░░░░░</p>");
    $("#output").append("<p>░░░░▌░▄▄▄▐▌▀▀▀░░░░░</p>");
    $("#output").append("<p>░▄░▐░░░▄▄░█░▀▀░░░░░</p>");
    $("#output").append("<p>░▀█▌░░░▄░▀█▀░▀░░░░░</p>");
    $("#output").append("<p>░░░░░░░░▄▄▐▌▄▄░░░░░</p>");
    $("#output").append("<p>░░░░░░░░▀███▀█░▄░░░</p>");
    $("#output").append("<p>░░░░░░░▐▌▀▄▀▄▀▐▄░░░</p>");
    $("#output").append("<p>░░░░░░░▐▀░░░░░░▐▌░░</p>");
    $("#output").append("<p>░░░░░░░█░░░░░░░░█░░</p>");
    $("#output").append("<p>░░░░░░▐▌░░░░░░░░░█░ </p><br />");
}
function inputHandler(s)
{
    if (s != "")
    {
        $("#output").append("<p>> "+s+"</p>");
        switch (s)
        {
            case "help":
                showCommands();
                break;
            case "about":
                showInfo();
                break;
            case "github":
                openURL("https://github.com/Rabrennie");
                break;
            case "twitter":
                openURL("https://twitter.com/SpookyCo");
                break;
            case "reddit":
                openURL("https://www.reddit.com/user/SpookyCo/");
                break;
            case "steam":
                openURL("http://steamcommunity.com/id/spookyco");
                break;
            case "projects":
                showProjects();
                break;
            case "spooky":
                showSkellington();
                break;
            default: $("#output").append("<p>Unknown Command</p>");
        }
    }
}

$( "#i" ).keypress(function(e)
{
	if (e.keyCode == 13)
	{
		inputHandler(this.value);
		this.value = "";
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height()});
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

biosTestInit();
