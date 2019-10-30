function fetchHistory() {
    return $("#workspace").text();
}

function loadHistory(){
    var resultStr = fetchHistory();
    $("#widgetActivity").append(resultStr,"<br/>"); 
      
}

$(window).on('beforeunload', function(){    
    var historyContent=$("#widgetActivity").text();
    //var historyContent="hello"
    $.cookie('HistoryContent',historyContent)
    //console.log("unload")
});

$(window).on('load',function() {
    if($.cookie("HistoryContent")==""){
        $.cookie("HistoryContent",$("#widgetActivity").html());
        
    }   
    else{
        $("#widgetActivity").html($.cookie("HistoryContent"));
    }
     var HistoryString=$.cookie('HistoryContent')
    $("#widgetActivity").append(HistoryString);
    
});

