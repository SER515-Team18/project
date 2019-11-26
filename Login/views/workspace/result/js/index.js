var result = null;
function updateResult(grade) {
  var resultStr = fetchResultText();
  if (resultStr != "") evaluateResult(grade, resultStr);
}

function fetchResultText() {
  return $("#workspace")
    .text()
    .trim();
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
  evalText = evalText;
  try {
    result = math.evaluate(evalText);
  } catch (error) {
    result = null;
  }
  maxResult(evalText, result);

  if (isNegative(result)) clearResult();
  else if (!isNaN(result) && result <= 120) $("#mathResult").html(result);
  else clearResult();
}

function evalGradeSix(evalText) {
  try {
    result = math.evaluate(evalText);
    result = math.round(result, 3);

    if (checkResult(result, evalText)) clearResult();
    if (!isNaN(result)) $("#mathResult").html(result);
  } catch (e) {
    result = null;
    checkResult(result, evalText);
  }
}

function isNegative(num) {
  if (num < 0) return true;
  else return false;
}

function isEndSign(c) {
  if (c == "+" || c == "-" || c == "*" || c == "/") return true;
  else return false;
}

function checkPlusMinus(c) {
  if (c == "+" || c == "-") {
    disableOperators(true);
    disableNumbers(false);
  } else {
    disableOperators(false);
  }
}

function maxResult(num, res) {
  var c = num[num.length - 1];
  var len = res != null ? res.toString().length : 0;
  if (c == "+" || c == "-") {
    disableOperators(true);
    disableNumbers(false);
    return;
  }
  if (len > 0 || res < 3) disableOperators(false);
  if (num.length == 3 && res.toString().length == 3) {
    disableNumbers(true);
    disableOperators(false);
  } else if (res >= 120) {
    disableNumbers(true);
  } else {
    disableNumbers(false);
  }
  if (num.length == 5) {
    disableOperators(true);
    disableNumbers(true);
  }
}

function isValid() {
  if (result == null || (grade == 1 && (result > 120 || result < 0)))
    return false;
  else if (grade == 1) return true;

  if (grade == 6 && checkResult(result, fetchResultText())) return true;
  else return false;
}

function checkResult(res, txt) {
  var operators = ["+", "-", "*", "/"];
  var last = txt[txt.length - 1];
  if (last == ".") {
    $("#dot").attr("disabled",true);
    return false;
  }
  else{
    $("#dot").attr("disabled",false);
  }
  if (operators.includes(txt) || operators.includes(last)) disableOperators(true);
  else disableOperators(false);

  return true;
}
