var answers = ["1", "5", "-", "0"];

$(document).ready(function() {
  var questions = ["__ + 1 = 2", "5 - __ = 0", "5 __ 4 = 1", "0 + 0 = __"];

  $.each(questions, function(index, row) {
    $("#hwspace").append(
      '<p class="question" id="q' + index + '">' + questions[index] + "</p>"
    );
    $("#q" + index + "").html(
      $("#q" + index + "")
        .html()
        .replace("__", '<i id="aq' + index + '">__</i>')
    );
  });
});

$("body").on("DOMSubtreeModified", ".hwSection", function() {
  checkHW();
});

function checkHW() {
  var listItems = $("#hwspace p");
  var count = 0;
  listItems.each(function(index, li) {
    var aid = $(li)
      .children(":first")
      .children(":first")
      .attr("id");
    if (answers[index] == aid) {
      $(this).css("color", "green");
      count++;
    } else if (aid != undefined) {
      $(this).css("color", "red");
      count--;
    }
  });

  pointsScored(count);
}

function pointsScored(points) {
  console.log(points);
  if (points < 0) points = 0;
  $("#score").html(points);
}

function loadhwspace(ele, id) {
  var button = document.createElement("BUTTON");
  var node = document.createTextNode(ele.value);
  button.appendChild(node);
  button.setAttribute("id", ele.value);
  button.setAttribute("ondblclick", "remove_operator(this.id)");
  var work = document.getElementById("a" + id);
  console.log("a" + id, work);
  work.innerHTML = "";
  work.appendChild(button);
}

var hwspaceSection = document.querySelector(".hwSection");
var hwWidgets = document.querySelectorAll('[draggable="true"]');

for (let i = 0; i < hwWidgets.length; i++) {
  hwWidgets[i].addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("srcId", event.target.id);
  });
}

hwspaceSection.addEventListener("dragover", function(event) {
  event.preventDefault();
});

hwspaceSection.addEventListener("drop", function(event) {
  event.preventDefault();
  var target = event.target;
  var data = event.dataTransfer.getData("srcId");
  var copy = document.getElementById(data).cloneNode(true);
  var canDrop = target.classList.contains("question");
  console.log("dropped", target, data, copy, target.id);

  if (canDrop) {
    loadhwspace(copy, target.id);
  }
});
