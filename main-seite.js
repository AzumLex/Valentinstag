const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let hearts = [];
let lastTime = 0;
const heartImage = new Image();
heartImage.src = "heart.png";

function Heart(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = Math.random() * 2 + 1;

    this.draw = function() {
        ctx.drawImage(heartImage, this.x, this.y, 50, 50);
    }

    this.update = function() {
        this.y += this.speedY;
        if (this.y > canvas.height) {
            this.y = -50;
            this.x = Math.random() * canvas.width;
        }
    }
}

function init() {
    hearts = [];
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * (canvas.width - 50); // Begrenze die x-Position auf den sichtbaren Bereich
        const y = Math.random() * canvas.height * 2;
        hearts.push(new Heart(x, y));
    }
}

function animate(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts.forEach(heart => {
        heart.update();
        heart.draw();
    });

    requestAnimationFrame(animate);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2;
    init();
}

window.addEventListener('resize', resizeCanvas);

window.addEventListener('load', () => {
    resizeCanvas();
    animate(0);
});