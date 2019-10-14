function remove_operator(id) {
	var element = document.getElementById(id);
	element.parentNode.removeChild(element);
}

$("body").on('DOMSubtreeModified', ".mainSection", function() {
	var grade = 6;
	updateResult(grade);
});





