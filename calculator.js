// Calculator JavaScript Functions

let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';

// Function to append values to display
function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

// Function to delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Function to perform calculations
function calculate() {
    try {
        // Replace display symbols with actual operators for evaluation
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
            
        // Validate expression to prevent malicious code execution
        if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
            throw new Error('Invalid expression');
        }
        
        // Evaluate the expression
        let result = eval(expression);
        
        // Check for division by zero or invalid results
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Round result to avoid floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and decimal point
    if (/[0-9.]/.test(key)) {
        appendToDisplay(key);
    }
    // Operators
    else if (key === '+') {
        appendToDisplay('+');
    }
    else if (key === '-') {
        appendToDisplay('−');
    }
    else if (key === '*') {
        appendToDisplay('×');
    }
    else if (key === '/') {
        event.preventDefault(); // Prevent browser search
        appendToDisplay('÷');
    }
    // Enter or equals
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Escape or 'c' for clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        deleteLast();
    }
});

// Additional mathematical functions
function calculateSquareRoot() {
    try {
        let value = parseFloat(display.value);
        if (value < 0) {
            display.value = 'Error';
            return;
        }
        display.value = Math.sqrt(value);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculatePercentage() {
    try {
        let value = parseFloat(display.value);
        display.value = value / 100;
    } catch (error) {
        display.value = 'Error';
    }
}

// Initialize calculator
document.addEventListener('DOMContentLoaded', function() {
    display.value = '';
    console.log('Calculadora JavaScript cargada correctamente');
});