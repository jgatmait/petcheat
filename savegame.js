// =============================
// Global game state (client-side)
// =============================

// Coins and happiness are fully client-controlled
// (no server, no signature, no encryption)
let coins = parseInt(localStorage.getItem("coins") || "50");
let happiness = parseInt(localStorage.getItem("happy") || "50");

function updateUI() {
    const coinsSpan = document.getElementById("coins");
    if (coinsSpan) coinsSpan.innerText = coins;

    const happySpan = document.getElementById("happy");
    if (happySpan) happySpan.innerText = happiness;
}

// Initialize on load
updateUI();

// =============================
// Pet actions
// =============================
function earnCoins() {
    coins++;
    localStorage.setItem("coins", coins);
    updateUI();
}

function petHappy() {
    happiness++;
    localStorage.setItem("happy", happiness);
    updateUI();
}

// =============================
// Shop logic
// =============================
function buyItem(price) {
    if (coins >= price) {
        coins -= price;
        localStorage.setItem("coins", coins);
        updateUI();
        alert("You bought something!");
    } else {
        alert("Not enough coins!");
    }
}

// =============================
// Save / Load – OWASP A02 Demo
// =============================

// Save format: Base64-encoded JSON (no encryption, no MAC/signature)
function downloadSave() {
    const saveObj = {
        coins: coins,
        happiness: happiness
    };

    const json = JSON.stringify(saveObj);
    const b64 = btoa(json); // Base64 encode

    const a = document.createElement("a");
    a.href = "data:text/plain;base64," + b64;
    a.download = "savegame.txt";
    a.click();
}

function loadSave() {
    const input = prompt("Paste your save file content:");

    if (!input) return;

    try {
        // Just decode and trust it blindly → no integrity protection
        const json = atob(input);
        const obj = JSON.parse(json);

        coins = obj.coins;
        happiness = obj.happiness;

        localStorage.setItem("coins", coins);
        localStorage.setItem("happy", happiness);
        updateUI();
        alert("Save loaded!");
    } catch (e) {
        alert("Invalid save file.");
    }
}

