/*

* author: Archana Madhavan, Sai Vinay G

* version: 1.0
*/
function fetchHistory() {
  return $("#workspace").text();
}

function loadHistory() {
  if (isValid()) {
    var resultStr = fetchHistory();
    if (
      resultStr != undefined &&
      $("#actionHistory li:last-child").text() != resultStr
    )
      var strapp =
        "<li>" +
        resultStr +
        " " +
        "<span style='color:grey;'>[" +
        $("#mathResult").html() +
        "]</span> </li>";
    if (!check($.parseHTML(strapp))) $("#actionHistory").append(strapp);
  }
}
function clearHistory() {
  $("#actionHistory").empty();
}

$(window).on("beforeunload", function() {
  var historyContent = $("#actionHistory").html();
  sessionStorage.setItem("HistoryContent", historyContent);
});

$(window).on("load", function() {
  var HistoryString;
  if (sessionStorage.getItem("HistoryContent") != "") {
    HistoryString = sessionStorage.getItem("HistoryContent");
    if (HistoryString != "undefined") $("#actionHistory").html(HistoryString);
  }
});

function check(li) {
    if($("#actionHistory li").length == 0) return false;
    return $("#actionHistory li").filter(function(i, li2) {
        return $(li2).text() == li[0].innerText;
    }).length > 0;
}
