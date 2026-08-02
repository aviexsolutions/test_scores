document.getElementById("calculateBtn").addEventListener("click", processScores);

function processScores() {
    let userInput = prompt("Enter test scores separated by commas.");

    if (userInput === null || userInput.trim() === "") {
        // Display message in-page when no input is provided
        document.getElementById("scoresList").textContent = "No scores were entered.";
        document.getElementById("lowScore").textContent = "";
        document.getElementById("highScore").textContent = "";
        document.getElementById("avgScore").textContent = "";
        return;
    }

    let scoresArray = parseScores(userInput);

    let low = Math.min(...scoresArray);
    let high = Math.max(...scoresArray);
    let average = calculateAverage(scoresArray);

    displayResults(scoresArray, low, high, average);
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
