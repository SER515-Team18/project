var answers = [];
var questions = [];
$(document).ready(function() {
  $("#HWQuestions li").each(function() {
    if ($(this).attr("id") == "HWQ") questions.push($(this).text());
    else if ($(this).attr("id") == "HWA") answers.push($(this).text());
  });

  if ($("#hwspace").length > 0) {
    $.each(questions, function(index, row) {
      $("#hwspace").append(
        '<p class="question" id="q' + index + '">' + questions[index] + "</p>"
      );
      $("#q" + index + "").html(
        $("#q" + index + "")
          .html()
          .replace(/_/g, '<i class="aq' + index + '">__</i>')
      );
    });
  }
});

function checkHW() {
  var listItems = $("#hwspace p");
  var count = 0;
  listItems.each(function(index, li) {
    var aid = $(li)
      .children(":first")
      .children(":first")
      .attr("id");
    if (typeof aid != "undefined") aid = aid.charAt(4);

    if (answers[index] == aid) {
      $(this).css("color", "green");
      count++;
    } else if (aid != undefined) {
      $(this).css("color", "red");
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
  button.setAttribute("ondblclick", "remove_operator(this.id)");
  button.setAttribute(
    "class",
    "qbtn" + ele.value + " btn  btn-outline-secondary"
  );

  var work = id;
  if (work === null) work = document.getElementById(id).parentNode;
  console.log(id, work);
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
    console.log(target.classList);
    var canDrop =
      target.classList.contains("question") || className.classList.value.includes("qbtn") || target.classList.value.includes("aq");
    if (target.classList.contains("question")) {
      className = target.firstElementChild;
    } else if (className.classList.value.includes("qbtn")) {
      className = target.parentNode;
    }
    console.log(className,canDrop);
    if (canDrop) {
      loadhwspace(copy, className);
    }
  });
}
