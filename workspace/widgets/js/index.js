function addvalueToWorkSpace (id) {
    	
	var ele = document.getElementById(id);
    loadworkspace(ele);
}

function loadworkspace (ele){

	
	var button=document.createElement("BUTTON");
	var node=document.createTextNode(ele.value);
	button.appendChild(node);
	var work=document.getElementById("workspace");
    work.appendChild(button);

}
