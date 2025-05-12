const diver = document.getElementById('diver');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const endScreen = document.getElementById('endScreen');
const finalScoreEl = document.getElementById('finalScore');
const clickSound = new Audio('fishSound.mp3'); // Path to your sound file

let score = 0;
let timeLeft = 60;
let gameInterval;
let timerInterval;

// Emojis for creatures
const creatureEmojis = [
    '🐠', // Fish
    '🦑', // Octopus
    '🐙', // Squid
    '🐢', // Turtle
    '🐋', // Whale
    '🦈'  // Shark (new)
];

document.addEventListener('mousemove', (e) => {
    diver.style.left = e.clientX + 'px';
    diver.style.top = e.clientY + 'px';
});

document.addEventListener('click', (e) => {
    for (let i = 0; i < 5; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 10 + 10;
        bubble.style.width = bubble.style.height = size + 'px';
        bubble.style.left = (e.clientX + Math.random() * 20 - 10) + 'px';
        bubble.style.top = (e.clientY + Math.random() * 20 - 10) + 'px';
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 4000);
    }
});

function spawnCreature() {
    const creature = document.createElement('div');
    creature.className = 'ocean-creature';
    creature.style.top = `${Math.random() * 80 + 10}%`;
    creature.style.left = `${Math.random() * 90}%`;

    // Randomly select a creature
    const isShark = Math.random() < 0.2; // 20% chance to spawn a shark
    creature.textContent = isShark ? '🦈' : creatureEmojis[Math.floor(Math.random() * (creatureEmojis.length - 1))];

    // Add click behavior
    creature.addEventListener('click', () => {
        if (isShark) {
            score = Math.max(0, score - 1); // Prevent negative scores
            clickSound.play(); // Play the same sound
        } else {
            score++;
            clickSound.play();
        }
        scoreEl.textContent = score;
        creature.remove();
    });

    document.body.appendChild(creature);
    setTimeout(() => creature.remove(), 8000);
}

function startGame() {
    score = 0;
    timeLeft = 60;
    scoreEl.textContent = score;
    timerEl.textContent = timeLeft;
    endScreen.style.display = 'none';

    gameInterval = setInterval(spawnCreature, 800);
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            showEndScreen();
        }
    }, 1000);
}

function showEndScreen() {
    finalScoreEl.textContent = `You caught ${score} creature${score !== 1 ? 's' : ''}!`;
    endScreen.style.display = 'flex';
}

function restartGame() {
    document.querySelectorAll('.ocean-creature').forEach(c => c.remove());
    startGame();
}

// Start on load
startGame();