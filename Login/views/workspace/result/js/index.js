function updateResult(grade) {
    var resultStr = fetchResultText();
    evaluateResult(grade, resultStr);
    
}

function fetchResultText() {
    return $("#workspace").text();
}

function evaluateResult(grade, evalText) {
    switch (grade) {
        case 9:
            evalGradeNine(evalText);
            break;

        default:
            evalGradeOne(evalText);
            break;
        
    }
}

function evalGradeOne(evalText) {
    try {
        var result = math.evaluate(evalText);
            if(!isNaN(result)) $("#mathResult").html(result);
    } catch (e) {
        if (e instanceof SyntaxError) {
            //...
        }
    }
}

function evalGradeNine(evalText) {
    const parser = math.parser();
    var result = null;
    try {
        var exprs = evalText.split("\n");
        $.each(exprs, function (index, val) {
            result = parser.evaluate(val);
        });
        
        $("#mathResult").html(result);
    } catch (e) {
        if (e instanceof SyntaxError) {
            $("#mathResult").html(e.message);
        }
    }
}