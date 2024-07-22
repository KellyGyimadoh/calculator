document.addEventListener("DOMContentLoaded", function () {
    const screenContent = document.querySelector(".screencontent");
    const buttonSymbols = document.querySelectorAll(".btnsymbol");
    const btnClear = document.querySelector(".clear");
    const btnBackspace = document.querySelector(".back");
    const btnEquals = document.querySelector(".equals");
    const btnCalc = document.querySelectorAll(".btncalc");

    let expression = "";

    // Add event listeners for number buttons
    buttonSymbols.forEach((symbol) => {
        symbol.addEventListener("click", (e) => {
            const value = e.target.textContent;
            expression += value;
            updateScreen();
        });
    });

    // Add event listeners for operator buttons
    btnCalc.forEach((button) => {
        button.addEventListener("click", (e) => {
            const operator = e.target.textContent;
            // Avoid adding multiple operators in a row
            if (/\s[×÷+\-]\s$/.test(expression)) {
                expression = expression.slice(0, -3);
            }
            expression += ` ${operator} `;
            updateScreen();
        });
    });

    // Clear the screen and expression
    btnClear.addEventListener("click", () => {
        expression = "";
        updateScreen();
    });

    // Backspace functionality
    btnBackspace.addEventListener("click", () => {
        expression = expression.trim().slice(0, -1).trim();
        updateScreen();
    });

    // Calculate the result
    btnEquals.addEventListener("click", () => {
        try {
            const result = evaluateExpression(expression);
            expression = result.toString();
            updateScreen();
        } catch (error) {
            screenContent.textContent = "Error";
            expression = "";
        }
    });

    // Update screen content
    function updateScreen() {
        screenContent.textContent = expression;
    }

    // Evaluate the expression
    function evaluateExpression(expr) {
        // Replace division and multiplication symbols with JS operators
        const safeExpr = expr.replace(/×/g, "*").replace(/÷/g, "/");
        // Use Function to evaluate the expression safely
        return Function(`"use strict"; return (${safeExpr})`)();
    }
});
