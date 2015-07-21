function memoryTestInit()
{
    var delay = 33,
        step = 648,
        curMemory = 0,
        memory = 26732;

    $("#output").append("<p id='memoryTest'>Memory Test : <span id='memoryTestNumber'>0K</span></p>");

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
            deviceScanInit();
        };
    }

    updateMemory();
}

function deviceScanInit()
{
    var delay = 300,
        devices = ["USB", "Keyboard", "Mouse"],
        current = 0,
        dots = 0;

    $("#output").append("<p><b>Scanning For Devices</b></p>");

    function scanDevices()
    {
        var temp = "";
        if (!$("#deviceScan"+devices[current]).length)
        {
            $("#output").append("<p id='deviceScan"+devices[current]+ "'>Scanning for "+devices[current]+"<span id='dots"+devices[current]+"'></span></p>");
        }
        for (var i = 0; i < dots; i++)
        {
            //$("#dots"+devices[current]).append(".");
            temp+=".";
        }
        $("#dots"+devices[current]).html(temp);
        if (dots < 4)
        {
            dots++;
            window.setTimeout(scanDevices, delay);
        }
        else
        {
            dots = 0;
            $("#deviceScan"+devices[current]).append("  FOUND");
            if (current < devices.length-1)
            {
                current++
                window.setTimeout(scanDevices, delay);
            }
            else
            {
                $("#output").append("<br />");
                $("#output").append("<p><h3>Welcome To SpookyOS</h3></p><br />");
                showCommands();
            }
        }
    }
    scanDevices();
}

function showCommands()
{
    $("#output").append("<p>help    - Show this help</p>");
    $("#output").append("<p>projects - Show projects I've worked on</p>");
    $("#output").append("<p>github  - Open My Github Page</p>");
    $("#output").append("<p>twitter - Open My Twitter Page</p>");
    $("#output").append("<p>reddit  - Open My Reddit Page</p>");
    $("#output").append("<p>steam   - Open My Steam Page</p><br />");
    $("#inputContainer").css("visibility","visible")
    $('#i')[0].focus();
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
            case "github":
                $("#output").append("<p>Opening https://github.com/Rabrennie</p><br />");
                window.open("https://github.com/Rabrennie");
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

memoryTestInit();
