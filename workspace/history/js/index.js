function fetchHistory() {
    return $("#workspace").text();
}

function loadHistory()
{
    var resultStr = fetchHistory();
    
    $("#widgetActivity").append(resultStr,"<br/>"); 
      
}

