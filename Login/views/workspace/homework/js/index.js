var answers = [];
var questions = [];
$(document).ready(function() {
  $("#HWQuestions li").each(function() {
    if ($(this).attr("id") == "HWQ") questions.push($(this).text());
    else if ($(this).attr("id") == "HWA") answers.push($(this).text());
  });

  if ($("#hwspace").length > 0) {
    var questionTxt = "";
    $.each(questions, function(index, row) {
      if (index % 2 == 0) {
        questionTxt += "<div class='row asdfsd' >";
      }
      questionTxt +=
        '<p class="col question" id="q' +
        index +
        '" style="border: 0.5px solid #F1EAE0; border-radius:6px;"> ' +
        questions[index] +
        "</p>";
      if (index % 2 == 1 && index > 0 || questions.length == 1) {
        questionTxt += "</div>";
        $("#hwspace").append(questionTxt);
        if(questions.length == 1) index = 1;
        for (let idx = index - 1; idx <= index; idx++) {
          $("#q" + idx + "").html(
            $("#q" + idx + "")
              .html()
              .replace(/_/g, '<i class="aq' + idx + ' placeH">___</i>')
          );
          if(questions.length == 1) break;
        }
        questionTxt = "";
      }
    });
  }

  $("#totalMarks").text(questions.length);

  if (localStorage.getItem("grade") == 6) {
    $(".grade6").show();
  } else {
    $(".grade6").hide();
  }
});

function checkHW() {
  var listItems = $("#hwspace p");
  var count = 0;
  var aid;
  listItems.each(function(index, li) {
    if (
      $(li)
        .children()
        .children()
        .end().length > 1
    ) {
      aid = "";
      var temp = $(li)
        .children()
        .children()
        .end();
      for (let idx = 0; idx < temp.length; idx++) {
        var num =
          temp[idx].children[0] != undefined
            ? temp[idx].children[0].className.split(" ")[0]
            : "";
        if (typeof num == "string" || num != "") {
          num = num.charAt(4);

          aid = aid + num;
        }
      }
    } else {
      aid = $(li)
        .children(":first")
        .children(":first")
        .attr("class");
      if (typeof aid != "undefined") aid = aid.split(" ")[0].charAt(4);
    }

    if (answers[index] == aid) {
      $(this).css("color", "#00ad45");
      $(this).css("border", "0.5px dotted #00ad45");
      count++;
    } else if (aid != undefined && aid != "") {
      $(this).css("color", "#fe423f");
      $(this).css("border", "0.5px dotted #fe423f");
    } else if (aid == "") {
      $(this).css("color", "#5d666fe8");
      $(this).css("border", "0.5px solid #F1EAE0");
    }
  });

  pointsScored(count);
}

function pointsScored(points) {
  if (points < 0) points = 0;
  $("#score").html(points);
}

function loadhwspace(ele, id) {
  var button = document.createElement("BUTTON");
  var node = document.createTextNode(ele.value);
  button.appendChild(node);
  button.setAttribute("ondblclick", "remove_answer(this)");
  button.setAttribute(
    "class",
    "qbtn" + ele.value + " btn  btn-outline-secondary"
  );

  var work = id;
  if (work === null) work = document.getElementById(id).parentNode;
  if (!work.classList.contains("question")) {
    work.innerHTML = "";
    work.appendChild(button);
  }

  checkHW();
}

var hwspaceSection = document.querySelector(".hwSection");
var hwWidgets = document.querySelectorAll('[draggable="true"]');

for (let i = 0; i < hwWidgets.length; i++) {
  hwWidgets[i].addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("srcId", event.target.id);
  });
}

if (hwspaceSection) {
  hwspaceSection.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  hwspaceSection.addEventListener("drop", function(event) {
    event.preventDefault();
    var target = event.target;
    var data = event.dataTransfer.getData("srcId");
    var copy = document.getElementById(data).cloneNode(true);
    var className = target;
    var canDrop =
      target.classList.contains("question") ||
      className.classList.value.includes("qbtn") ||
      target.classList.value.includes("aq");
    if (target.classList.contains("question")) {
      className = target.firstElementChild;
    } else if (className.classList.value.includes("qbtn")) {
      className = target.parentNode;
    }
    if (canDrop) {
      loadhwspace(copy, className);
    }
  });
}

function remove_answer(id) {
  $(id)
    .parent()
    .parent()
    .css("color", "#5d666fe8");
  $(id)
    .parent()
    .parent()
    .css("border", "0.5px solid #F1EAE0");
  $(id)
    .parent()
    .html("___");
}
