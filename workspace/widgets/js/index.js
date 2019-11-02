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
	work.appendChild(button);

}

function createNewLine() {
	$("#workspace").append("</br> \n");

}
