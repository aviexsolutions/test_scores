const contacts = [
    "Riley Olson|10 Main St|(555) 555-1212",
    "Ava Johnson|27 Elm St|(555) 555-2323",
    "Mason Lee|88 Oak Ave|(555) 555-3434",
    "Zoe Kim|300 Pine Rd|(555) 555-4545",
    "Noah Brown|111 Maple Dr|(555) 555-5656"
];

const startButton = document.getElementById("startBtn");
const runButton = document.getElementById("runBtn");
const clearButton = document.getElementById("clearBtn");
const commandInput = document.getElementById("commandInput");
const outputElement = document.getElementById("output");

function formatContactDetails(index) {
    const raw = contacts[index];
    const [name, address, phone] = raw.split("|");

    return [
        `Contact ${index + 1}: ${name}`,
        `Address: ${address}`,
        `Phone: ${phone}`
    ];
}

function listContacts() {
    if (contacts.length === 0) {
        renderOutput(["No contacts available."]);
        return;
    }

    const lines = contacts.map((contactString, index) => {
        const [name, address, phone] = contactString.split("|");
        return `${index + 1}. ${name} — ${address} — ${phone}`;
    });

    renderOutput(["Contact list:", ...lines]);
}

function showContact(index) {
    if (index < 0 || index >= contacts.length) {
        renderOutput([`Contact ${index + 1} not found.`]);
        return;
    }

    renderOutput(formatContactDetails(index));
}

function renderOutput(lines) {
    outputElement.innerHTML = "";
    lines.forEach((line) => {
        const item = document.createElement("li");
        item.textContent = line;
        outputElement.appendChild(item);
    });
}

function showMenuLines() {
    return [
        "Contact Viewer Commands:",
        "list — show all contacts",
        "get # — show contact #",
        "show # — show contact #",
        "exit — close the viewer"
    ];
}

function executeCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (trimmed.length === 0) {
        renderOutput(["Please enter a command or click Start Viewer for command list."]);
        return;
    }

    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const argument = parts[1];

    if (command === "exit") {
        renderOutput(["Exiting contact viewer."]);
        return;
    }

    if (command === "list") {
        listContacts();
        return;
    }

    if (command === "get" || command === "show") {
        if (!argument) {
            renderOutput(["Please include a contact number after the command."]);
            return;
        }

        const contactNumber = parseInt(argument, 10);
        if (!Number.isInteger(contactNumber) || contactNumber < 1) {
            renderOutput(["Please enter a valid contact number."]);
            return;
        }

        showContact(contactNumber - 1);
        return;
    }

    renderOutput(["Invalid command. Use list, get #, show #, or exit."]);
}

startButton.addEventListener("click", () => {
    renderOutput(showMenuLines());
    commandInput.focus();
});

runButton.addEventListener("click", () => executeCommand(commandInput.value));

commandInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        executeCommand(commandInput.value);
    }
});

clearButton.addEventListener("click", () => {
    commandInput.value = "";
    renderOutput([]);
});

renderOutput(["Ready to start the contact viewer.", "Click Start Viewer to see commands."]);
