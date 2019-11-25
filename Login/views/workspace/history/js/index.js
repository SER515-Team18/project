/*

* author: Archana Madhavan, Sai Vinay G

* version: 1.0
*/
function fetchHistory() {
    return $("#workspace").text();
}

function loadHistory() {

    var resultStr = fetchHistory();
    if (resultStr != undefined && $("#actionHistory li:last-child").text() != resultStr)
        $("#actionHistory").append("<li>"+resultStr+ "</li>");
}
function clearHistory() {
    $("#actionHistory").empty();

}

$(window).on('beforeunload', function () {

    var historyContent = $("#actionHistory").html();
    sessionStorage.setItem('HistoryContent', historyContent)
    
});

$(window).on('load', function () {
    var HistoryString;
    if (sessionStorage.getItem("HistoryContent") != "") {
        HistoryString = sessionStorage.getItem('HistoryContent');
        if (HistoryString != "undefined" )
            $("#actionHistory").html(HistoryString);
    }
});

