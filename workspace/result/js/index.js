function updateResult(grade) {
    var resultStr = fetchResultText();
    evaluateResult(grade, resultStr);

}

function fetchResultText() {
    return $("#workspace").text();
}

function evaluateResult(grade, evalText) {
    switch (grade) {
        case 1:
            evalGradeOne(evalText);
            break;

        default:
            break;
    }
}

function evalGradeOne(evalText) {
    var result = eval(evalText);
    $("#mathResult").html(result);
}