const mealCostInput = document.getElementById("mealCost");
const tipPercentInput = document.getElementById("tipPercent");
const calculateBtn = document.getElementById("calculateBtn");
const mealCostDisplay = document.getElementById("mealCostDisplay");
const tipPercentDisplay = document.getElementById("tipPercentDisplay");
const tipAmountDisplay = document.getElementById("tipAmountDisplay");
const totalCostDisplay = document.getElementById("totalCostDisplay");

function formatCurrency(value) {
    return `$${value.toFixed(2)}`;
}

function formatPercent(value) {
    return `${value.toFixed(0)}%`;
}

function calculateTip() {
    const mealCost = Number(mealCostInput.value);
    const tipPercent = Number(tipPercentInput.value);

    if (!mealCostInput.value || !tipPercentInput.value) {
        mealCostDisplay.textContent = "$0.00";
        tipPercentDisplay.textContent = "0%";
        tipAmountDisplay.textContent = "$0.00";
        totalCostDisplay.textContent = "$0.00";
        return;
    }

    if (Number.isNaN(mealCost) || Number.isNaN(tipPercent) || mealCost < 0 || tipPercent < 0 || tipPercent > 100) {
        mealCostDisplay.textContent = "$0.00";
        tipPercentDisplay.textContent = "0%";
        tipAmountDisplay.textContent = "$0.00";
        totalCostDisplay.textContent = "$0.00";
        return;
    }

    const tipAmount = mealCost * (tipPercent / 100);
    const totalCost = mealCost + tipAmount;

    mealCostDisplay.textContent = formatCurrency(mealCost);
    tipPercentDisplay.textContent = formatPercent(tipPercent);
    tipAmountDisplay.textContent = formatCurrency(tipAmount);
    totalCostDisplay.textContent = formatCurrency(totalCost);
}

calculateBtn.addEventListener("click", calculateTip);

[mealCostInput, tipPercentInput].forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            calculateTip();
        }
    });
});

mealCostInput.addEventListener("input", calculateTip);
tipPercentInput.addEventListener("input", calculateTip);

calculateTip();
