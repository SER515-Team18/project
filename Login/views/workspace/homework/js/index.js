var answers = ["1", "5", "-", "0", "4"];

$(document).ready(function() {
  var questions = [
    "__ + 1 = 2",
    "5 - __ = 0",
    "5 __ 4 = 1",
    "0 + 0 = __",
    "1 + __ = 5"
  ];

  if ($("#hwspace").length > 0) {
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
  button.setAttribute("id", "qbtn" + ele.value);
  button.setAttribute("ondblclick", "remove_operator(this.id)");
  button.setAttribute("class", "btn  btn-outline-secondary");

  var work = document.getElementById("a" + id);
  if (work === null) work = document.getElementById(id).parentNode;
  console.log( id, work);
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
    var canDrop =
      target.classList.contains("question") || target.id.includes("qbtn");
      console.log(target);
    if (canDrop) {
      loadhwspace(copy, target.id);
    }
  });
}
