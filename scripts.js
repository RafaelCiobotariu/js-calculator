let inserted_operations = 0;
const keys = document.querySelectorAll(".key");
const currentNumber = document.querySelector(".current_number");
const previousNumber = document.querySelector(".previous_number");
let operation = document.querySelector(".operation");
let input = "";

function add(number1, number2) {
  return number1 + number2;
}

function substraction(number1, number2) {
  return number1 - number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function operate(operand, number1, number2) {
  switch (operand) {
    case "+":
      inserted_operations = 1;
      return add(number1, number2);
    case "-":
      inserted_operations = 1;
      return substraction(number1, number2);
    case "/":
      inserted_operations = 1;
      return divide(number1, number2);
    case "*":
      inserted_operations = 1;
      return multiply(number1, number2);
    default:
      return "You did not insert a propper operation";
  }
}

for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    console.log(value);
    if (value === "clear") {
      input = "";
      currentNumber.innerHTML = "";
      previousNumber.innerHTML = "";
    } else if (value === "backspace") {
      input = input.slice(0, -1);
      previousNumber.innerHTML = cleanInput(input);
    } else if (value === "=") {
      let number = parseFloat(input, 10);
      let secondNumber = parseFloat(getSecondNumber(input), 10);
      // verifyOperation(input);
      // let result = eval(input);
      let result = operate(verifyOperation(input), number, secondNumber);
      if (result !== NaN && result !== undefined && result !== null) {
        currentNumber.innerHTML = cleanOutput(result);
      } else {
        currentNumber.innerHTML = "You did in insert a propper operation";
      }
    } else {
      if (validateInput(value)) {
        input += value;
        previousNumber.innerHTML = cleanInput(input);
      }
    }
  });
}

function cleanInput(input) {
  let input_array = input.split("");
  let input_aray_lenght = input_array.length;

  for (let i = 0; i < input_aray_lenght; i++) {
    if (input_array[i] == "*") {
      input_array[i] = `<span class="key operation" data-key="*"> x <span>`;
    } else if (input_array[i] == "/") {
      input_array[i] = `<span class="key operation" data-key="/"> ÷ <span>`;
    } else if (input_array[i] == "+") {
      input_array[i] = `<span class="key operation" data-key="+"> + <span>`;
    } else if (input_array[i] == "-") {
      input_array[i] = `<span class="key operation" data-key="-"> - <span>`;
    }
  }
  return input_array.join("");
}

function cleanOutput(currentNumber) {
  let output_string = currentNumber.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");
  if (inserted_operations == 1) {
    if (output_array.length > 3) {
      for (let i = output_array.length - 3; i > 0; i -= 3) {
        output_array.splice(i, 0, ",");
      }
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function validateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function verifyOperation(value) {
  let last_operation;
  let ok = 0;
  let i = value.length - 1;
  while (ok == 0 && i > 0) {
    switch (value[i]) {
      case "+":
        last_operation = "+";
        ok = 1;
        break;
      case "-":
        last_operation = "-";
        ok = 1;
        break;
      case "*":
        last_operation = "*";
        ok = 1;
        break;
      case "/":
        last_operation = "/";
        ok = 1;
        break;
      default:
        break;
    }
    i--;
  }

  return last_operation;
}

function getSecondNumber(input) {
  let numbers = input.split(`${verifyOperation(input)}`);
  return numbers[numbers.length - 1];
}
