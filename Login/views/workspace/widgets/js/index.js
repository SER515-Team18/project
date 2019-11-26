/*
 * author Hari Krishnan Puthiya Veetil,Sai Vinay G
 * version :1.0
 */

var selected;

function addvalueToWorkSpace(id) {
  if ((grade == 1 && $("#workspace").children().length < 5) || grade == 6) {
    var ele = document.getElementById(id);
    if (id === "help-new") createNewLine();
    else {
      var element = getElement(ele);
      var work = document.getElementById("workspace");
      work.appendChild(element);
    }
  }
  loadHistory();
}
function getElement(ele) {
  var button = document.createElement("BUTTON");
  var node = document.createTextNode(ele.value);
  button.appendChild(node);
  button.setAttribute("id", ele.value);
  button.setAttribute("ondblclick", "remove_operator(this)");
  button.setAttribute("class", "btn  btn-outline-secondary wk-btn");
  button.setAttribute("draggable", "true");
  button.setAttribute("ondragend", "dragEnd()");
  button.setAttribute("ondragover", "dragOver(event)");
  button.setAttribute("ondragstart", "dragStart(event)");
  return button;
}

function createNewLine() {
  $("#workspace").append("</br> \n");
}
function clearWorkspace() {
  $("#workspace").empty();
  disableNumbers(false);
  if(localStorage.getItem('grade') == 1)
  disableOperators(true);
  clearResult();
}

clearWorkspace();

function clearResult() {
  $("#mathResult").empty();
}

function disableNumbers(flag) {
	if(flag)
	{
		$("#Numbers")
		.find("[draggable=true]")
		.attr("disabled", true);
	}
	else{
		$("#Numbers")
		.find("[draggable=true]")
		.attr("disabled", false);
	}
}

function disableOperators(flag) {
	if(flag)
	{
		$("#subtraction").attr("disabled", true);
    $("#addition").attr("disabled", true);
    if(grade == 6){
      $("#multiplication").attr("disabled", true);
      $("#division").attr("disabled", true);
    }
	}
	else{
		$("#subtraction").attr("disabled", false);
    $("#addition").attr("disabled", false);
    if(grade == 6){
      $("#multiplication").attr("disabled", false);
      $("#division").attr("disabled", false);
    }

	}
}

var workspaceSection = document.querySelector(".mainSection");
var workspace = document.getElementById("workspace");
var widgets = document.querySelectorAll('[draggable="true"]');

for (let i = 0; i < widgets.length; i++) {
  widgets[i].addEventListener("dragstart", function(event) {
    event.dataTransfer.setData("srcId", event.target.id);
  });
}
if (workspace) {
  workspace.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  workspace.addEventListener("drop", function(event) {
    event.preventDefault();
    var target = event.target;
    var data = event.dataTransfer.getData("srcId");
    if (document.getElementById(data) != null) {
      var copy = document.getElementById(data).cloneNode(true);
      var element = getElement(copy);
      var canDrop =
        target.id == "workspace" || target.classList.contains(".mainSection");

      if (canDrop) {
        var work = document.getElementById("workspace");
        if (
          (grade == 1 && $("#workspace").children().length < 5) ||
          grade == 6
        ) {
          work.appendChild(element);
        }
      } else if (target.parentNode.id == "workspace") {
        event.target.parentNode.insertBefore(element, event.target.nextSibling);
      }
      loadHistory();
    }
  });
}

function dragOver(event) {
  var res = isBefore(selected, event.target);
  if (res === "true")
    event.target.parentNode.insertBefore(selected, event.target);
  else if (res === "false" || res == undefined) {
    event.target.parentNode.insertBefore(selected, event.target.nextSibling);
  }
  loadHistory();
}

function dragEnd() {
  selected = null;
}

function dragStart(event) {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", null);
  selected = event.target;
}

function isBefore(element1, element2) {
  var cur;
  if (element1 == null || typeof element1 == "undefined") {
    return "null";
  } else if (element2.parentNode === element1.parentNode) {
    for (cur = element1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === element2) return "true";
    }
  } else return "false";
}
