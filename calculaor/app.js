
let lastKeyPressIsOperator = false;

function appendToDisplay(value) {
    if (lastKeyPressIsOperator && isOperator(value)) {
        // Do not allow consecutive operators
        return;
    }

    document.getElementById('display').value += value;
    lastKeyPressIsOperator = isOperator(value);
}

function calculate() {
    try {
        const expression = document.getElementById('display').value;

        // Use a regular expression to validate the expression
        if (!/^[\d+\-*/. ]+$/.test(expression)) {
            throw new Error('Invalid expression');
        }

        const result = eval(expression);

        // Check if the result is a valid number
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('Invalid calculation result');
        }

        document.getElementById('display').value = result;
        lastKeyPressIsOperator = false;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

function clearLast() {
    const currentDisplay = document.getElementById('display').value;
    document.getElementById('display').value = currentDisplay.slice(0, -1);
    lastKeyPressIsOperator = false;
}

function reset() {
    document.getElementById('display').value = '';
    lastKeyPressIsOperator = false;
}

// Keyboard support
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '/' || key === '*' || key === '-' || key === '+') {
        appendToDisplay(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        clearLast();
    }
});