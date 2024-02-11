// Funktion zum Abrufen und Anzeigen der Regeln aus der JSON-Datei
async function displayRules() {
    const response = await fetch('https://api.github.com/azumlex.github.io/Valentinstag/Optionen/5/statuten.json');
    const data = await response.json();
    const rulesList = document.getElementById('rulesList');
    rulesList.innerHTML = ""; // Clear previous content
    for (const rule of data.regeln) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<h3>${rule.titel}</h3><p>${rule.text}</p>`;
        rulesList.appendChild(listItem);
    }
}

// Funktion zum Aktualisieren der JSON-Datei
async function updateJSON() {
    const inputTitel = document.getElementById('inputTitel').value;
    const inputText = document.getElementById('inputText').value;

    // Lade die vorhandenen Regeln
    const response = await fetch('https://api.github.com/azumlex.github.io/Valentinstag/Optionen/5/statuten.json');
    const data = await response.json();

    // Füge die neue Regel hinzu
    data.regeln.push({
        titel: inputTitel,
        text: inputText
    });

    // Aktualisiere die JSON-Datei mit der GitHub-API
    const updatedData = JSON.stringify(data);
    const responseUpdate = await fetch('https://api.github.com/azumlex.github.io/Valentinstag/Optionen/5/statuten.json', {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer YOUR_GITHUB_ACCESS_TOKEN',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: 'Update JSON file',
            content: btoa(updatedData), // Encode data as base64
            sha: data.sha // Aktuelle SHA der Datei
        })
    });

    if (responseUpdate.ok) {
        // Wenn die Aktualisierung erfolgreich war, zeige die neuen Regeln an
        displayRules();
        console.log('JSON aktualisiert.');
    } else {
        console.error('Fehler beim Aktualisieren der JSON-Datei.');
    }
}

// Initialisierung: Zeige vorhandene Regeln an
displayRules();
