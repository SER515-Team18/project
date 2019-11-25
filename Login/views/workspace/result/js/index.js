function updateResult(grade) {
  var resultStr = fetchResultText();
  evaluateResult(grade, resultStr);
}

function fetchResultText() {
  return $("#workspace").text();
}

function evaluateResult(grade, evalText) {
  switch (grade) {
    case 6:
      evalGradeSix(evalText);
      break;

    default:
      evalGradeOne(evalText);
      break;
  }
}

function evalGradeOne(evalText) {
  try {
    evalText = evalText.trim();
    console.log(evalText);
    checkPlusMinus(evalText[evalText.length - 1]);
    if (isEndSign(evalText[evalText.length - 1]))
      $("#mathResult").html("");
    var result = math.evaluate(evalText);
    if(isNegative(result)) $("#mathResult").html("");
    else if (!isNaN(result)) $("#mathResult").html(result);
  } catch (e) {
    if (e instanceof SyntaxError) {
      //...
    }
  }
}

function evalGradeSix(evalText) {
  try {
    var result = math.evaluate(evalText);
    if (!isNaN(result)) $("#mathResult").html(result);
  } catch (e) {
    if (e instanceof SyntaxError) {
      //...
    }
  }
}

function isNegative(num) {
  if (num < 0) return true;
  else return false;
}

function isEndSign(c) {
  console.log("sd", c);
  if (c == "+" || c == "-" || c == "*" || c == "/") return true;
  else return false;
}

function checkPlusMinus(c) {
  console.log("cpm", c);
  if (c == "+" || c == "-") {
    $("#subtraction").attr("disabled", true);
    $("#addition").attr("disabled", true);
  } else {
    $("#addition").removeAttr("disabled");
    $("#subtraction").removeAttr("disabled");
  }
}
