/*
* author Sai Vinay G 
* version :1.0
*/
function addvalueToWorkSpace(id) {
	var ele = document.getElementById(id);
	if (id === "help-new")
		createNewLine();
	else
		loadworkspace(ele);
}

function loadworkspace(ele) {
	var button = document.createElement("BUTTON");
	var node = document.createTextNode(ele.value);
	button.appendChild(node);
	button.setAttribute("id", ele.value);
	button.setAttribute("ondblclick", "remove_operator(this.id)");
	var work = document.getElementById("workspace");
	button.setAttribute("class","btn  btn-outline-secondary wk-btn");
	work.appendChild(button);
}

function createNewLine() {
	$("#workspace").append("</br> \n");
}
function clearWorkspace() {
	$("#workspace").empty();
  }
var workspaceSection = document.querySelector(".mainSection");
var widgets = document.querySelectorAll('[draggable="true"]');


for (let i = 0; i < widgets.length; i++) {
	widgets[i].addEventListener("dragstart", function (event) {
		event.dataTransfer.setData("srcId", event.target.id);
	});

}

workspaceSection.addEventListener('dragover', function (event) {
  event.preventDefault()
})



workspaceSection.addEventListener('dragover', function (event) {
	event.preventDefault();
});

workspaceSection.addEventListener('drop', function (event) {
	event.preventDefault();
	var target = event.target;
	var data = event.dataTransfer.getData("srcId");
	var copy = document.getElementById(data).cloneNode(true);
	var canDrop = target.classList.contains('mainSection');

	if (canDrop) {
		loadworkspace(copy);
	}
});

