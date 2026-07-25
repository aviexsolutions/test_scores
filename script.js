const fizzBuzzList = document.getElementById("fizzBuzzList");

function generateFizzBuzz(limit = 20) {
    const results = [];

    for (let number = 1; number <= limit; number += 1) {
        if (number % 3 === 0 && number % 5 === 0) {
            results.push(`${number} FizzBuzz`);
        } else if (number % 3 === 0) {
            results.push(`${number} Fizz`);
        } else if (number % 5 === 0) {
            results.push(`${number} Buzz`);
        } else {
            results.push(String(number));
        }
    }

    return results;
}

function renderFizzBuzz() {
    const results = generateFizzBuzz();

    fizzBuzzList.innerHTML = "";
    results.forEach((result) => {
        const listItem = document.createElement("li");
        listItem.textContent = result;
        fizzBuzzList.appendChild(listItem);
    });

    console.clear();
    console.log("FizzBuzz Output:");
    results.forEach((result) => console.log(result));
}

renderFizzBuzz();
