const btn = document.getElementById("helloBtn");
const greeting = document.getElementById("greeting");

btn.addEventListener("click", () => {
    // Change the text
    greeting.textContent = "Hello, World!";
    
    // Change the button color to blue
    btn.style.backgroundColor = "blue";
    btn.style.color = "white"; // Changes the text color to make it readable
});
