function remove_operator(id) {
	id.remove();
	if(fetchResultText() == "")
		clearResult();
	else
		loadHistory();
}

$("body").on('DOMSubtreeModified', ".mainSection", function () {
	updateResult(grade);
});







