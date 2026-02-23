// Standorte
const locations = [
    "Breuers Taverne",
    "Laues Schenke",
    "Lumpis Dorfkrug",
    "Hagedorns Destille",
    "Beim Bensebums",
    "Die Freigänger"
];

let username = "";
let currentLocation = "";
let counters = {}; // Struktur: { location: { userName: count } }

// Login
function login() {
    username = document.getElementById("username").value.trim();
    if(username === "") { alert("Bitte Name eingeben!"); return; }
    document.getElementById("loginScreen").style.display = "none";
    showLocations();
}

// Standort auswählen
function showLocations() {
    document.getElementById("locationScreen").style.display = "block";
    const container = document.getElementById("locations");
    container.innerHTML = "";
    locations.forEach(loc => {
        const btn = document.createElement("button");
        btn.textContent = loc;
        btn.onclick = () => selectLocation(loc);
        container.appendChild(btn);
    });
}

function selectLocation(loc) {
    currentLocation = loc;
    if(!counters[currentLocation]) counters[currentLocation] = {};
    if(!counters[currentLocation][username]) counters[currentLocation][username] = 0;
    document.getElementById("locationScreen").style.display = "none";
    document.getElementById("counterScreen").style.display = "block";
    document.getElementById("locationName").textContent = currentLocation;
    document.getElementById("userNameDisplay").textContent = username;
    updateCounters();
}

function increment() {
    counters[currentLocation][username]++;
    updateCounters();
}

function decrement() {
    if(counters[currentLocation][username] > 0) counters[currentLocation][username]--;
    updateCounters();
}

function updateCounters() {
    document.getElementById("userCount").textContent = counters[currentLocation][username];

    // Standort Gesamt
    const locationTotal = Object.values(counters[currentLocation]).reduce((a,b)=>a+b,0);
    document.getElementById("locationTotal").textContent = locationTotal;

    // Global Gesamt
    let globalTotal = 0;
    Object.values(counters).forEach(loc => {
        globalTotal += Object.values(loc).reduce((a,b)=>a+b,0);
    });
    document.getElementById("globalTotal").textContent = globalTotal;
}

function changeLocation() {
    document.getElementById("counterScreen").style.display = "none";
    showLocations();
}