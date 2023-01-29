const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
let currentValue = "",
  firstNumber = null,
  secondNumber = null,
  operation = null,
  lastResult = null;

function updateDisplay(displayValue) {
  if (displayValue.length > 16) {
    display.textContent = `${displayValue.substring(0, 15)}...`;
  } else {
    display.textContent = displayValue;
  }
}

function clickNumber(e) {
  let number = e.target.id;
  if (number == "." && currentValue % 1 != 0) {
    return;
  }
  currentValue += number;
  updateDisplay(currentValue);
}

function callOperation(e) {
  operator = e.target.id;

  if (operator !== "equals") {
    if (firstNumber == null) {
      if (lastResult && currentValue == "") {
        firstNumber = lastResult;
      } else {
        firstNumber = Number(currentValue);
      }
    } else {
      secondNumber = Number(currentValue);
      operate(firstNumber, secondNumber, operation);
      firstNumber = lastResult;
    }
    operation = operator;
    currentValue = "";
  } else {
    if (firstNumber == null) {
      return;
    } else if (secondNumber == null) {
      secondNumber = Number(currentValue);
      operate(firstNumber, secondNumber, operation);
      currentValue = "";
    }
  }
}

function clear() {
  firstNumber = null;
  secondNumber = null;
  operation = null;
  lastResult = null;
  currentValue = "";
  updateDisplay(currentValue);
}

function backspace() {
  currentValue = currentValue.slice(0, -1);
  updateDisplay(currentValue);
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b == 0) {
    alert("very funny...");
    return 0;
  }
  return a / b;
}

function operate(a, b, op) {
  let result;
  switch (op) {
    case "add":
      result = add(a, b);
      break;
    case "subtract":
      result = subtract(a, b);
      break;
    case "multiply":
      result = multiply(a, b);
      break;
    case "divide":
      result = divide(a, b);
      break;
    default:
      result = b;
      break;
  }
  updateDisplay(String(result));
  firstNumber = null;
  secondNumber = null;
  operation = null;
  lastResult = result;
}

numberButtons.forEach((button) =>
  button.addEventListener("click", clickNumber)
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", callOperation)
);

clearButton.addEventListener("click", clear);

backspaceButton.addEventListener("click", backspace);
