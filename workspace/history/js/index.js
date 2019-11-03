/*
* author: Archana Madhavan
* version: 1.0
*/
function fetchHistory() {
    return $("#workspace").text();
}

function loadHistory() {

    var resultStr = fetchHistory();
    $("#widgetActivity").append(resultStr, "<br/>");

}

$(window).on('beforeunload', function () {

    var historyContent = $("#widgetActivity").html();
    sessionStorage.setItem('HistoryContent', historyContent)
    
});

$(window).on('load', function () {
    if (sessionStorage.getItem("HistoryContent") != "") {
        var HistoryString = sessionStorage.getItem('HistoryContent');
        if (HistoryString != null )
            $("#widgetActivity").append(HistoryString);
    }
});

