let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';

const calculatorScreen = document.querySelector('.calculator-screen');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');
const clearBtn = document.querySelector('.all-clear');
const decimal = document.querySelector('.decimal');
const percentage = document.querySelector('.percentage');

const updateScreen = (number) => {
    calculatorScreen.value = number;
};

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
};

const inputOperator = (operator) => {
    if (calculationOperator !== '') {
        calculate();
    }
    calculationOperator = operator;
    prevNumber = currentNumber;
    currentNumber = '0';
};

const calculate = () => {
    let result = '';
    switch (calculationOperator) {
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            break;
        case '/':
            if (currentNumber === '0') {
                alert("Cannot divide by zero!");
                clearAll();
                updateScreen(currentNumber);
                return;
            }
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            break;
        case '%':
            result = parseFloat(currentNumber) * 0.01;
            break;
        default:
            return;
    }
    const hasDecimal = result % 1 !== 0;
    if (hasDecimal) {
        result = parseFloat(result.toFixed(9));
    }

    currentNumber = result.toString();
    calculationOperator = '';
};

const clearAll = () => {
    prevNumber = '';
    calculationOperator = '';
    currentNumber = '0';
};

const inputDecimal = (dot) => {
    if (currentNumber.includes('.')) {
        return;
    }
    currentNumber += dot;
};

numbers.forEach((number) => {
    number.addEventListener('click', (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
        inputOperator(event.target.value);
    });
});

equalSign.addEventListener('click', () => {
    calculate();
    updateScreen(currentNumber);
});

clearBtn.addEventListener('click', () => {
    clearAll();
    updateScreen(currentNumber);
});

decimal.addEventListener('click', (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
});

percentage.addEventListener('click', () => {
    if (calculationOperator === '') {
        currentNumber = parseFloat(currentNumber) / 100;
        updateScreen(currentNumber);
    } else {
        let percentageValue = parseFloat(currentNumber) / 100;
        let result = '';
        switch (calculationOperator) {
            case '+':
                result = parseFloat(prevNumber) + (parseFloat(prevNumber) * percentageValue);
                break;
            case '-':
                result = parseFloat(prevNumber) - (parseFloat(prevNumber) * percentageValue);
                break;
            case '*':
                result = parseFloat(prevNumber) * percentageValue;
                break;
            case '/':
                if (percentageValue === 0) {
                    alert("Cannot divide by zero!");
                    clearAll();
                    updateScreen(currentNumber);
                    return;
                }
                result = parseFloat(prevNumber) / percentageValue;
                break;
            default:
                return;
        }
        currentNumber = result.toString();
        calculationOperator = '';
        updateScreen(currentNumber);
    }
});

