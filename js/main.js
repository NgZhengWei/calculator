const buttons = document.querySelectorAll('.buttons > *');
let displayValue = '';
const operators = ['−', '+', '×', '÷'];

for (i = 0; i < buttons.length; i++) {
    if (buttons[i].innerText === "=") { //operate functionality
        buttons[i].addEventListener('click', e => {
            if (operators.includes(displayValue[displayValue.length - 1])) {
                
            }
            else {
                updateDisplayAnswer(displayValue);
            }
        });
        continue;
    }
    if (buttons[i].innerText === "C") { //clear all functonality
        buttons[i].addEventListener('click', e => {
            displayValue = '';
            document.querySelector('.display-text').innerText = '';
            document.querySelector('.solution-text').innerText = '';
        });
        continue;
    }
    if (buttons[i].innerText === ".") { //decimal functionality(doesn't allow more than 1 decimal in a number)
        buttons[i].addEventListener('click', e => {
            if (!lastNumberIsFloat()) {
                let buttonValue = e.target.innerText;
                displayValue += buttonValue;
                displayOnScreen(displayValue);
            }
        });
        continue;
    }
    buttons[i].addEventListener('click', e => {
        let buttonValue = e.target.innerText;
        displayValue += buttonValue;
        displayOnScreen(displayValue);
    });
}

function updateDisplayAnswer(input) {
    answerValue = input.match(/(\d+\.?\d*)[−+×÷]/)[1];
    console.log('Initial Number: ' + answerValue);
    operationSets = [...input.matchAll(/([−+×÷])(\d+\.?\d*)/g)];
    for (i = 0; i < operationSets.length; i++) {
        let operator = operationSets[i][1];
        let secondNum = operationSets[i][2];
        console.log(`operator: ${operator}, Snum: ${secondNum}`);
        if (divideBy0(operator, secondNum)) {
            answerValue = 'No dividing by 0';
            break;
        }
        answerValue = operate(operator, answerValue, secondNum);
    }
    document.querySelector('.solution-text').innerText = answerValue;//roundToTwo(answerValue);
}

function displayOnScreen(value) {
    const display = document.querySelector('.display-text');
    display.innerText = value;
}

function divideBy0(operator, num) {
    if (operator === '÷' && num === '0') {
        return true;
    }
    return false;
}

function lastNumberIsFloat() {
    numbers = displayValue.split(/[−+×÷]/); //returns array of numbers split by operators
    return numbers[numbers.length - 1].includes('.');
}

function operate(operator, x, y){
    if (operator === '+') {
        return add(x, y);
    }
    else if (operator === '−') {
        return subtract(x, y);
    }
    else if (operator === '×') {
        return multiply(x, y);
    }
    else if (operator === '÷') {
        return divide(x, y);
    }
}

function add(x, y) {
    return parseFloat(x) + parseFloat(y);
}

function subtract(x, y) {
    return parseFloat(x) - parseFloat(y);
}

function multiply(x, y){
    return parseFloat(x) * parseFloat(y);
}

function divide(x, y) {
    return parseFloat(x) / parseFloat(y);
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

//keyboard functionality
document.addEventListener('keydown', e => {
    const numberArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    var key = e.key;
    if (numberArr.includes(key)){
        displayValue += key;
        displayOnScreen(displayValue);
    }
    else if (key == "/") {
        displayValue += '÷';
        displayOnScreen(displayValue);
    }
    else if (key == "*") {
        displayValue += '×';
        displayOnScreen(displayValue);
    }
    else if (key == "+") {
        displayValue += '+';
        displayOnScreen(displayValue);
    }
    else if (key == "-") {
        displayValue += '−';
        displayOnScreen(displayValue);
    }
    else if (key == "Enter") {
        if (operators.includes(displayValue[displayValue.length - 1])) {
            
        }
        else {
            updateDisplayAnswer(displayValue);
        }
    }
    else if (key == "Backspace") {
        displayValue = '';
        document.querySelector('.display-text').innerText = '';
        document.querySelector('.solution-text').innerText = '';
    }
});