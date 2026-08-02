document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById("runBtn");
    const clearBtn = document.getElementById("clearBtn");

    runBtn.addEventListener("click", processScores);
    clearBtn.addEventListener("click", clearResults);
});

function processScores() {
    const inputEl = document.getElementById("scoresInput");
    let userInput = (inputEl.value || "").trim();

    // If nothing typed, fall back to prompt
    if (!userInput) {
        userInput = prompt("Enter test scores separated by commas.");
    }

    if (userInput === null || userInput.trim() === "") {
        displayNoScores();
        return;
    }

    let scoresArray = parseScores(userInput);

    let low = Math.min(...scoresArray);
    let high = Math.max(...scoresArray);
    let average = calculateAverage(scoresArray);

    // populate input with what was used
    inputEl.value = userInput;

    displayResults(scoresArray, low, high, average);
}

function clearResults() {
    document.getElementById("scoresInput").value = "";
    document.getElementById("scoresList").textContent = "";
    document.getElementById("lowScore").textContent = "";
    document.getElementById("highScore").textContent = "";
    document.getElementById("avgScore").textContent = "";
}

function displayNoScores() {
    document.getElementById("scoresList").textContent = "No scores were entered.";
    document.getElementById("lowScore").textContent = "";
    document.getElementById("highScore").textContent = "";
    document.getElementById("avgScore").textContent = "";
}

function parseScores(input) {
    let stringArray = input.split(",");
    let numbersArray = [];
    
    for (let i = 0; i < stringArray.length; i++) {
        numbersArray.push(parseFloat(stringArray[i].trim()));
    }
    
    return numbersArray;
}

function calculateAverage(scores) {
    let sum = 0;
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    let avg = sum / scores.length;
    return Number(avg.toFixed(1));
}

function displayResults(scores, low, high, avg) {
    document.getElementById("scoresList").textContent = scores.join(", ");
    document.getElementById("lowScore").textContent = low;
    document.getElementById("highScore").textContent = high;
    document.getElementById("avgScore").textContent = avg;
}
