function updateResult(grade) {
    var resultStr = fetchResultText();
    evaluateResult(grade, resultStr);

}

function fetchResultText() {
    return $("#workspace").text();
}

function evaluateResult(grade, evalText) {
    switch (grade) {
        case 1,6:
            evalGradeOne(evalText);
            break;

        default:
            break;
    }
}

function evalGradeOne(evalText) {
    try {
        var result = eval(evalText);
        $("#mathResult").html(result);
    } catch (e) {
        if (e instanceof SyntaxError) {
            $("#mathResult").html(e.message);
        }
    }
}