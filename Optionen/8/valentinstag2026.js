// =============================================================
//  VALENTINSTAG 2026 – 5-Level Minispiel
// =============================================================

// ===== GLOBALER HERZEN-ZÄHLER =====
let totalHearts = 0;

// ===== AUDIO (Web Audio API – keine externen Dateien nötig) =====
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new AudioCtx();
    }
}

// --- Sanftes "Pling" beim Herzen-Fangen ---
function playPling() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.08);
    osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.6);
}

// --- Sanfte Ambient-Akkorde für Level 1 ---
let ambientOscillators = null;

function stopOscillatorGroup(group, immediate = false) {
    if (!group || !audioCtx) return;

    const now = audioCtx.currentTime;
    group.forEach(({ osc, gain }) => {
        try {
            gain.gain.cancelScheduledValues(now);
            gain.gain.setValueAtTime(gain.gain.value, now);

            if (immediate) {
                gain.gain.setValueAtTime(0, now);
                osc.stop(now + 0.02);
            } else {
                gain.gain.linearRampToValueAtTime(0.001, now + 0.8);
                osc.stop(now + 1);
            }
        } catch (_) {
            // Ignorieren, falls Oszillator bereits gestoppt wurde
        }
    });
}

function playAmbient() {
    initAudio();
    // Sanfter C-Dur Akkord als Hintergrund
    const freqs = [261.63, 329.63, 392.00, 523.25];
    ambientOscillators = [];
    freqs.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        // Leise, sanfte Lautstärke
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + 2);
        osc.start();
        ambientOscillators.push({ osc, gain });
    });
}

function stopAmbient(immediate = false) {
    if (!ambientOscillators) return;
    stopOscillatorGroup(ambientOscillators, immediate);
    ambientOscillators = null;
}

// --- Hava Nagila Melodie (vereinfacht, Web Audio) ---
function playHavaNagila() {
    initAudio();
    // Vereinfachte Hava-Nagila-Noten (Frequenzen in Hz)
    const melody = [
        // Phrase 1 (langsam startend, dann schneller)
        { f: 329.63, d: 0.25 }, // E4
        { f: 349.23, d: 0.25 }, // F4
        { f: 392.00, d: 0.20 }, // G4
        { f: 415.30, d: 0.20 }, // Ab4
        { f: 392.00, d: 0.15 }, // G4
        { f: 349.23, d: 0.15 }, // F4
        { f: 329.63, d: 0.25 }, // E4
        { f: 349.23, d: 0.15 }, // F4
        { f: 392.00, d: 0.15 }, // G4
        { f: 415.30, d: 0.20 }, // Ab4
        { f: 493.88, d: 0.20 }, // B4
        { f: 415.30, d: 0.15 }, // Ab4
        { f: 392.00, d: 0.15 }, // G4
        { f: 349.23, d: 0.15 }, // F4
        { f: 329.63, d: 0.25 }, // E4
        // Phrase 2 (schneller, höher)
        { f: 493.88, d: 0.12 }, // B4
        { f: 523.25, d: 0.12 }, // C5
        { f: 587.33, d: 0.12 }, // D5
        { f: 659.25, d: 0.12 }, // E5
        { f: 587.33, d: 0.10 }, // D5
        { f: 523.25, d: 0.10 }, // C5
        { f: 493.88, d: 0.10 }, // B4
        { f: 523.25, d: 0.10 }, // C5
        { f: 587.33, d: 0.10 }, // D5
        { f: 659.25, d: 0.10 }, // E5
        { f: 698.46, d: 0.10 }, // F5
        { f: 659.25, d: 0.10 }, // E5
        { f: 587.33, d: 0.08 }, // D5
        { f: 523.25, d: 0.08 }, // C5
        { f: 493.88, d: 0.08 }, // B4
        { f: 523.25, d: 0.08 }, // C5
        // Phrase 3 (richtig schnell & chaotisch)
        { f: 659.25, d: 0.08 }, // E5
        { f: 698.46, d: 0.08 }, // F5
        { f: 783.99, d: 0.08 }, // G5
        { f: 830.61, d: 0.08 }, // Ab5
        { f: 783.99, d: 0.07 }, // G5
        { f: 698.46, d: 0.07 }, // F5
        { f: 659.25, d: 0.07 }, // E5
        { f: 698.46, d: 0.07 }, // F5
        { f: 783.99, d: 0.06 }, // G5
        { f: 880.00, d: 0.06 }, // A5
        { f: 987.77, d: 0.06 }, // B5
        { f: 880.00, d: 0.06 }, // A5
        { f: 783.99, d: 0.06 }, // G5
        { f: 698.46, d: 0.06 }, // F5
        { f: 659.25, d: 0.06 }, // E5
        { f: 783.99, d: 0.06 }, // G5
        { f: 987.77, d: 0.10 }, // B5 (Schluss-Akzent)
        { f: 1046.50, d: 0.15 }, // C6 (Finale!)
    ];

    let time = audioCtx.currentTime + 0.1;
    melody.forEach((note) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sawtooth'; // Schräger, chaotischer Klang
        osc.frequency.setValueAtTime(note.f, time);
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + note.d * 0.9);
        osc.start(time);
        osc.stop(time + note.d);
        time += note.d;
    });

    return time - audioCtx.currentTime; // Gesamtdauer
}

// =============================================================
//  LEVEL 1 – Romantischer Einstieg: Herzen fangen
// =============================================================
let heartsCaught = 0;
const HEARTS_NEEDED = 10;
let heartSpawnInterval;
let level1Active = false;
let audioStarted = false;

function startLevel1() {
    level1Active = true;
    heartsCaught = 0;
    updateHeartCounter();

    // Audio braucht User-Interaktion – startet beim ersten Klick
    document.addEventListener('click', function onFirstClick() {
        if (!audioStarted) {
            initAudio();
            playAmbient();
            audioStarted = true;
        }
    }, { once: true });

    // Erste Herzen direkt spawnen
    for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnHeart(), i * 400);
    }
    // Danach regelmäßig neue
    heartSpawnInterval = setInterval(spawnHeart, 900);
}

function spawnHeart() {
    if (!level1Active) return;
    const container = document.getElementById('heart-container');
    const heart = document.createElement('div');
    heart.className = 'floating-heart';

    const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝'];
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

    // Zufällige horizontale Position
    heart.style.left = (Math.random() * 85 + 5) + '%';
    heart.style.bottom = '-60px';

    // Zufällige Geschwindigkeit (4–7 Sekunden)
    const duration = Math.random() * 3 + 4;
    heart.style.animationDuration = duration + 's';

    // Zufällige Größe
    const size = Math.random() * 20 + 30;
    heart.style.fontSize = size + 'px';

    heart.addEventListener('click', (e) => {
        if (heart.classList.contains('caught')) return;
        e.stopPropagation();
        heart.classList.add('caught');
        playPling();
        heartsCaught++;
        updateHeartCounter();

        setTimeout(() => heart.remove(), 400);

        if (heartsCaught >= HEARTS_NEEDED) {
            totalHearts += HEARTS_NEEDED;
            transitionToLevel2();
        }
    });

    container.appendChild(heart);

    // Herz entfernen wenn es oben rausfliegt
    setTimeout(() => {
        if (heart.parentNode && !heart.classList.contains('caught')) {
            heart.remove();
        }
    }, duration * 1000);
}

function updateHeartCounter() {
    document.getElementById('heart-counter').textContent =
        `❤️ ${heartsCaught} / ${HEARTS_NEEDED}`;
}

// =============================================================
//  ÜBERGANG ZU LEVEL 2
// =============================================================
function transitionToLevel2() {
    level1Active = false;
    clearInterval(heartSpawnInterval);
    stopAmbient();

    const fade = document.getElementById('white-fade');
    fade.classList.add('active');

    setTimeout(() => {
        document.getElementById('level1').classList.remove('active');
        document.getElementById('level2').classList.add('active');

        setTimeout(() => {
            fade.classList.remove('active');
            startLevel2();
        }, 400);
    }, 1500);
}

// =============================================================
//  LEVEL 4 – Hava Nagila Wahnsinn
// =============================================================
const chaosEmojis = [
    '🐱', '🍆', '🤡', '💀', '🔥', '🎉', '🦄', '👽',
    '🍕', '💃', '🕺', '🎺', '🥳', '😱', '🌈', '🍌',
    '🐔', '👀', '🎸', '🌶️', '🧨', '🪩', '🫠', '🤯',
    '🐙', '🎪', '🤖', '👾', '🦆', '🫡'
];
let chaosEmojiInterval;
let chaosCounterInterval;
let loveCount = 0;

function startLevel4() {
    loveCount = 0;

    // Hava Nagila abspielen!
    playHavaNagila();

    // Screen-Shake nach kurzer Zeit
    setTimeout(() => {
        document.getElementById('level4').classList.add('shake');
    }, 1500);

    // Emojis spawnen (sehr schnell!)
    chaosEmojiInterval = setInterval(spawnChaosEmoji, 80);

    // Rasender Zähler
    chaosCounterInterval = setInterval(() => {
        loveCount += Math.floor(Math.random() * 150) + 50;
        document.getElementById('love-count').textContent = loveCount.toLocaleString('de-DE');
    }, 40);

    // Nach 12 Sekunden → Bluescreen
    setTimeout(() => {
        endChaos();
    }, 12000);
}

function spawnChaosEmoji() {
    const container = document.getElementById('chaos-container');
    const emoji = document.createElement('div');
    emoji.className = 'chaos-emoji';
    emoji.textContent = chaosEmojis[Math.floor(Math.random() * chaosEmojis.length)];

    // Zufällige Richtungen
    const directions = ['fly-right', 'fly-left', 'fly-diagonal'];
    emoji.classList.add(directions[Math.floor(Math.random() * directions.length)]);

    emoji.style.top = (Math.random() * 90) + '%';
    emoji.style.fontSize = (Math.random() * 50 + 25) + 'px';

    const speed = Math.random() * 1.2 + 0.4;
    emoji.style.animationDuration = speed + 's';

    container.appendChild(emoji);
    setTimeout(() => emoji.remove(), speed * 1000 + 100);
}

function endChaos() {
    clearInterval(chaosEmojiInterval);
    clearInterval(chaosCounterInterval);

    const level4 = document.getElementById('level4');
    level4.classList.remove('disco', 'shake');
    level4.classList.remove('active');

    // Bluescreen anzeigen
    document.getElementById('bluescreen').classList.add('active');

    // Ladebalken-Animation (smooth mit requestAnimationFrame)
    let progress = 0;
    const progressEl = document.getElementById('bsod-progress');
    let lastBsodTick = 0;
    function bsodTick(timestamp) {
        if (timestamp - lastBsodTick >= 350) {
            lastBsodTick = timestamp;
            progress += Math.floor(Math.random() * 12) + 3;
            if (progress >= 100) {
                progress = 100;
                progressEl.textContent = progress;
                setTimeout(() => transitionToLevel5(), 2000);
                return;
            }
            progressEl.textContent = progress;
        }
        requestAnimationFrame(bsodTick);
    }
    requestAnimationFrame(bsodTick);
}

// =============================================================
//  LEVEL 2 – Turbo-Herzen (schneller, mit 💔-Fallen, 20 nötig)
// =============================================================
let turboHeartsCaught = 0;
const TURBO_HEARTS_NEEDED = 20;
let turboSpawnInterval;
let level2Active = false;

function startLevel2() {
    level2Active = true;
    turboHeartsCaught = 0;
    updateTurboCounter();

    // Schnelleres Spawning
    for (let i = 0; i < 6; i++) {
        setTimeout(() => spawnTurboHeart(), i * 250);
    }
    turboSpawnInterval = setInterval(spawnTurboHeart, 500);
}

function spawnTurboHeart() {
    if (!level2Active) return;
    const container = document.getElementById('turbo-heart-container');
    const heart = document.createElement('div');
    heart.className = 'turbo-heart';

    // 20% Chance auf ein gebrochenes Herz (💔)
    const isBroken = Math.random() < 0.2;
    if (isBroken) {
        heart.textContent = '💔';
        heart.classList.add('broken');
    } else {
        const emojis = ['❤️', '💕', '💖', '💗', '💓', '💘', '💝'];
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    }

    heart.style.left = (Math.random() * 85 + 5) + '%';
    heart.style.bottom = '-60px';

    // Schneller als Level 1 (2.5–4.5 Sekunden)
    const duration = Math.random() * 2 + 2.5;
    heart.style.animationDuration = duration + 's';

    const size = Math.random() * 18 + 28;
    heart.style.fontSize = size + 'px';

    heart.addEventListener('click', (e) => {
        if (heart.classList.contains('caught')) return;
        e.stopPropagation();
        heart.classList.add('caught');

        if (isBroken) {
            // Gebrochenes Herz: -2 Punkte
            playBuzz();
            turboHeartsCaught = Math.max(0, turboHeartsCaught - 2);
            totalHearts = Math.max(0, totalHearts - 2);
        } else {
            playPling();
            turboHeartsCaught++;
            totalHearts++;
        }
        updateTurboCounter();

        setTimeout(() => heart.remove(), 400);

        if (turboHeartsCaught >= TURBO_HEARTS_NEEDED) {
            transitionToLevel3();
        }
    });

    container.appendChild(heart);
    setTimeout(() => {
        if (heart.parentNode && !heart.classList.contains('caught')) {
            heart.remove();
        }
    }, duration * 1000);
}

function updateTurboCounter() {
    document.getElementById('turbo-counter').textContent =
        `❤️ ${turboHeartsCaught} / ${TURBO_HEARTS_NEEDED}`;
    document.getElementById('total-hearts-2').textContent =
        `Gesamte Herzen: ${totalHearts}`;
}

// --- Buzz-Sound für 💔 ---
function playBuzz() {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.3);
}

// =============================================================
//  ÜBERGANG ZU LEVEL 3 (Goldene Herzen)
// =============================================================
function transitionToLevel3() {
    level2Active = false;
    clearInterval(turboSpawnInterval);
    stopAmbient();

    const fade = document.getElementById('white-fade');
    fade.classList.add('active');

    setTimeout(() => {
        document.getElementById('level2').classList.remove('active');
        document.getElementById('level3').classList.add('active');

        setTimeout(() => {
            fade.classList.remove('active');
            startLevel3();
        }, 800);
    }, 1500);
}

// =============================================================
//  LEVEL 3 – Goldene Herzen (Wellen-Bewegung, Gold = 2x)
// =============================================================
let goldPoints = 0;
const GOLD_POINTS_NEEDED = 30;
let goldSpawnInterval;
let level3Active = false;

function startLevel3() {
    level3Active = true;
    goldPoints = 0;
    updateGoldCounter();
    playAmbientGold();

    for (let i = 0; i < 5; i++) {
        setTimeout(() => spawnGoldHeart(), i * 350);
    }
    goldSpawnInterval = setInterval(spawnGoldHeart, 600);
}

function spawnGoldHeart() {
    if (!level3Active) return;
    const container = document.getElementById('gold-heart-container');
    const heart = document.createElement('div');
    heart.className = 'gold-heart';

    // 25% Chance auf goldenes Herz (doppelte Punkte)
    const isGolden = Math.random() < 0.25;
    if (isGolden) {
        heart.textContent = '💛';
        heart.classList.add('golden');
        heart.style.fontSize = (Math.random() * 15 + 38) + 'px';
    } else {
        const emojis = ['❤️', '💕', '💖', '🩷', '💓'];
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.fontSize = (Math.random() * 16 + 28) + 'px';
    }

    heart.style.left = (Math.random() * 80 + 8) + '%';
    heart.style.bottom = '-60px';

    // Wellenförmige Bewegung
    const duration = Math.random() * 2.5 + 3;
    heart.style.animation = `floatWavy ${duration}s linear`;

    heart.addEventListener('click', (e) => {
        if (heart.classList.contains('caught')) return;
        e.stopPropagation();
        heart.classList.add('caught');

        const points = isGolden ? 2 : 1;
        goldPoints += points;
        totalHearts += points;
        playPlingGold(isGolden);

        // Punkte-Popup anzeigen
        showPointPopup(heart, isGolden ? '+2' : '+1');

        updateGoldCounter();

        setTimeout(() => heart.remove(), 500);

        if (goldPoints >= GOLD_POINTS_NEEDED) {
            transitionToLevel4();
        }
    });

    container.appendChild(heart);
    setTimeout(() => {
        if (heart.parentNode && !heart.classList.contains('caught')) {
            heart.remove();
        }
    }, duration * 1000);
}

function updateGoldCounter() {
    document.getElementById('gold-counter').textContent =
        `💛 ${goldPoints} / ${GOLD_POINTS_NEEDED}`;
    document.getElementById('total-hearts-3').textContent =
        `Gesamte Herzen: ${totalHearts}`;
}

function showPointPopup(heart, text) {
    const popup = document.createElement('div');
    popup.className = 'point-popup';
    popup.textContent = text;
    popup.style.left = heart.style.left;
    popup.style.top = heart.offsetTop + 'px';
    document.getElementById('gold-heart-container').appendChild(popup);
    setTimeout(() => popup.remove(), 800);
}

// --- Ambient Gold (etwas majestätischer) ---
let ambientGoldOsc = null;

function playAmbientGold() {
    initAudio();
    const freqs = [293.66, 369.99, 440.00, 587.33]; // D-Dur
    ambientGoldOsc = [];
    freqs.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 2);
        osc.start();
        ambientGoldOsc.push({ osc, gain });
    });
}

function stopAmbientGold(immediate = false) {
    if (!ambientGoldOsc) return;
    stopOscillatorGroup(ambientGoldOsc, immediate);
    ambientGoldOsc = null;
}

// --- Gold-Pling (höher für Gold) ---
function playPlingGold(isGolden) {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    if (isGolden) {
        osc.frequency.setValueAtTime(1046.50, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1568, audioCtx.currentTime + 0.08);
        osc.frequency.exponentialRampToValueAtTime(2093, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    } else {
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.08);
        osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    }
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.5);
}

// =============================================================
//  ÜBERGANG ZU LEVEL 4 (Hava Nagila Wahnsinn)
// =============================================================
function transitionToLevel4() {
    level3Active = false;
    clearInterval(goldSpawnInterval);
    stopAmbientGold(true);
    stopAmbient(true);

    const fade = document.getElementById('white-fade');
    fade.classList.add('active');

    setTimeout(() => {
        document.getElementById('level3').classList.remove('active');
        document.getElementById('level4').classList.add('active');
        document.getElementById('level4').classList.add('disco');

        setTimeout(() => {
            fade.classList.remove('active');
            startLevel4();
        }, 400);
    }, 1500);
}

// =============================================================
//  HINTERGRUND-MUSIK (MP3)
// =============================================================
const bgMusic = new Audio('3 Doors Down - Here Without You.mp3');
bgMusic.loop = true;
bgMusic.volume = 0;

function fadeInMusic(targetVolume = 0.4, duration = 3000) {
    bgMusic.play().catch(() => {});
    const steps = 30;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;
    const fadeInterval = setInterval(() => {
        currentStep++;
        bgMusic.volume = Math.min(volumeStep * currentStep, targetVolume);
        if (currentStep >= steps) clearInterval(fadeInterval);
    }, stepTime);
}

// =============================================================
//  ÜBERGANG ZU LEVEL 5 (Das Herzstück)
// =============================================================
function transitionToLevel5() {
    const fade = document.getElementById('white-fade');
    fade.classList.add('active');

    setTimeout(() => {
        document.getElementById('bluescreen').classList.remove('active');
        document.getElementById('level5').classList.add('active');

        setTimeout(() => {
            fade.classList.remove('active');
            startLevel5();
        }, 800);
    }, 1500);
}

// =============================================================
//  LEVEL 5 – Das Herzstück
// =============================================================
function startLevel5() {
    // Musik leise einblenden
    fadeInMusic(0.4, 4000);

    // Gesamt-Herzen anzeigen
    document.getElementById('final-total').textContent =
        `💕 Herzen gesammelt: ${totalHearts}`;

    const text = 'Okay, Spaß beiseite. Du bringst mein Herz zum Rasen ' +
        '(wie in 3). Ich bin froh, dass es dich gibt. ' +
        `Zusammen haben wir ${totalHearts} Herzen gesammelt – ` +
        'und jedes einzelne gehört dir. Happy Valentinstag 2026. ❤️';

    const element = document.getElementById('typewriter-text');
    const chars = buildTypewriterChars(element, text);

    typeWriterReveal(chars, 0, () => {
        // Nach dem Typewriter → Liebesbrief / Gutschein einblenden
        setTimeout(() => {
            document.getElementById('love-letter').classList.remove('hidden');
        }, 1200);
    });
}

function buildTypewriterChars(element, text) {
    element.innerHTML = '';
    element.classList.add('typing');

    const tokens = text.split(/(\s+)/);
    const chars = [];

    tokens.forEach(token => {
        if (token === '') return;

        if (/^\s+$/.test(token)) {
            const space = document.createElement('span');
            space.className = 'tw-char tw-space';
            space.textContent = token;
            element.appendChild(space);
            chars.push(space);
            return;
        }

        const word = document.createElement('span');
        word.className = 'tw-word';

        Array.from(token).forEach(ch => {
            const charSpan = document.createElement('span');
            charSpan.className = 'tw-char';
            charSpan.textContent = ch;
            word.appendChild(charSpan);
            chars.push(charSpan);
        });

        element.appendChild(word);
    });

    return chars;
}

function typeWriterReveal(chars, index, callback) {
    if (index < chars.length) {
        chars[index].classList.add('visible');

        const ch = chars[index].textContent;
        const delay = ch === '.' || ch === ',' ? 120 : 45;

        requestAnimationFrame(() => {
            setTimeout(() => typeWriterReveal(chars, index + 1, callback), delay);
        });
        return;
    }

    const typewriterText = document.getElementById('typewriter-text');
    typewriterText.classList.remove('typing');

    if (callback) callback();
}

// =============================================================
//  START
// =============================================================
window.addEventListener('load', () => {
    startLevel1();
});
