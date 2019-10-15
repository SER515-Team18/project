function fetchHistory() {
    return $("#workspace").html();
}

function loadHistory()
{
    var resultStr = fetchHistory();
    
    $("#widgetActivity").append(resultStr,"added","<br/>"); 
      
}

