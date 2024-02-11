<?php
// Lade bestehende Regeln aus der JSON-Datei im Root-Verzeichnis
$rulesJson = file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/rules.json');
$rules = json_decode($rulesJson, true);

// Füge neue Regel hinzu
$newRule = $_POST['rule'];
$rules[] = $newRule;

// Aktualisiere JSON-Datei mit den neuen Regeln
file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/rules.json', json_encode($rules));

// Gib die aktualisierten Regeln als JSON zurück
echo json_encode($rules);
?>
