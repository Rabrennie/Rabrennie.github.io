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
        }
    }
    scanDevices();
}

memoryTestInit();
