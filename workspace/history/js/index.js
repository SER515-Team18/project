/*
* author: Archana Madhavan
* version: 1.0
*/
function fetchHistory() {
    return $("#workspace").text();
}

function loadHistory() {

    var resultStr = fetchHistory();
    if (resultStr != undefined)
        $("#widgetActivity").append(resultStr, "<br/>");

}

$(window).on('beforeunload', function () {

    var historyContent = $("#widgetActivity").html();
    sessionStorage.setItem('HistoryContent', historyContent)
    
});

$(window).on('load', function () {
    var HistoryString;
    if (sessionStorage.getItem("HistoryContent") != "") {
        HistoryString = sessionStorage.getItem('HistoryContent');
        if (HistoryString != null )
            $("#widgetActivity").html(HistoryString);
    }
});

