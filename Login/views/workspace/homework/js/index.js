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
      if (index % 2 == 1 && index > 0) {
        questionTxt += "</div>";
        $("#hwspace").append(questionTxt);
        for (let idx = index - 1; idx <= index; idx++) {
          console.log(idx);
          $("#q" + idx + "").html(
            $("#q" + idx + "")
              .html()
              .replace(/_/g, '<i class="aq' + idx + '">___</i>')
          );
        }
        questionTxt = "";
      }
    });
  }

  $("#totalMarks").text(questions.length);
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
      aid = null;
      var temp = $(li)
        .children()
        .children()
        .end();
      console.log(temp[0].children[0]);
      for (let idx = 0; idx < temp.length; idx++) {
        var num =
          temp[idx].children[0] != undefined
            ? temp[idx].children[0].className.split(" ")[0]
            : null;
        if (typeof num == "string" || num != null) {
          num = num.charAt(4);

          aid = aid * 10 + ~~num;
          console.log(num, aid);
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
      $(this).css("color", "green");
      count++;
    } else if (aid != undefined && aid != null) {
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
      target.classList.contains("question") ||
      className.classList.value.includes("qbtn") ||
      target.classList.value.includes("aq");
    if (target.classList.contains("question")) {
      className = target.firstElementChild;
    } else if (className.classList.value.includes("qbtn")) {
      className = target.parentNode;
    }
    console.log(className, canDrop);
    if (canDrop) {
      loadhwspace(copy, className);
    }
  });
}
