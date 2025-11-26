// Load drivers from localStorage
let drivers = JSON.parse(localStorage.getItem("drivers")) || [];

function saveDrivers() {
  localStorage.setItem("drivers", JSON.stringify(drivers));
}

// ------------------------------
// ADD DRIVER
// ------------------------------
function addDriver() {
  const name = document.getElementById("driverName").value.trim();
  if (!name) return alert("Enter a name");

  if (drivers.find(d => d.name === name)) {
    return alert("Driver already exists");
  }

  drivers.push({
    name,
    raceData: [] // store lap times, places, laps
  });

  saveDrivers();
  displayDrivers();
}

// ------------------------------
// SHOW DRIVER LIST
// ------------------------------
function displayDrivers() {
  const list = document.getElementById("driverList");
  if (!list) return;

  list.innerHTML = "";

  drivers.forEach(d => {
    const div = document.createElement("div");
    div.textContent = d.name;
    div.onclick = () => {
      window.location.href = `profile.html?user=${d.name}`;
    };
    list.appendChild(div);
  });
}

displayDrivers();

// ------------------------------
// PROFILE PAGE
// ------------------------------
function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");
  if (!user) return;

  document.getElementById("driverTitle").textContent = user;

  const driver = drivers.find(d => d.name === user);
  if (!driver) return;

  const tbody = document.getElementById("raceTableBody");
  tbody.innerHTML = "";

  driver.raceData.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${r.lap}</td>
      <td>${r.place}</td>
      <td>${r.laps}</td>
    `;
    tbody.appendChild(row);
  });
}

loadProfile();

// ------------------------------
// ADD RACE DATA
// ------------------------------
function addRaceData() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");

  const lapTime = document.getElementById("lapTime").value;
  const racePlace = document.getElementById("racePlace").value;
  const laps = document.getElementById("laps").value;

  const driver = drivers.find(d => d.name === user);

  driver.raceData.push({
    lap: lapTime,
    place: racePlace,
    laps: laps
  });

  saveDrivers();
  loadProfile();
}

// ------------------------------
// FINISH RACE (CLEAR RACE DATA)
// ------------------------------
function finishRace() {
  const params = new URLSearchParams(window.location.search);
  const user = params.get("user");

  const driver = drivers.find(d => d.name === user);

  driver.raceData = []; // delete all race data

  saveDrivers();
  loadProfile();
}
