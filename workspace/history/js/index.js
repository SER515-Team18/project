function fetchHistory() {
    return $("#workspace").text();
}

function loadHistory()
{
    var resultStr = fetchResultText();
    $("#widgetActivity").html(resultStr+"added");   
}