class Pacman {
    constructor(masterWidth, masterHeight) {
        this.radius = (masterHeight / 2.25);
        this.positionX = this.radius;
        this.positionY = masterHeight / 2;
        this.mouthPosition = 0;
        this.speed = 4
    }

    move() {
        this.positionX += this.speed;
    }
}


function renderPacman(pacman, ctx) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();

    let angle;
    switch (true) {
        case pacman.mouthPosition < 6:
            angle = 45;
            break;
        case pacman.mouthPosition < 8:
            angle = 24;
            break;
        case pacman.mouthPosition < 12:
            angle = 360;
            break;
        case pacman.mouthPosition >= 12:
            angle = 360;
            pacman.mouthPosition = 0;
            break;
    }

    ctx.arc(pacman.positionX, pacman.positionY, pacman.radius, degToRad(-angle), degToRad(angle), true);
    ctx.lineTo(pacman.positionX - (pacman.radius / 2), pacman.positionY);

    ctx.fill();
}

function handleEndOfWindow(pacman, ctx, gameWidth, gameHeight) {
    const pacmanEndPosition = pacman.positionX + pacman.radius - gameWidth;
    if (pacmanEndPosition >= 0) {
        const pacman2 = new Pacman(gameWidth, gameHeight);
        pacman2.positionX = pacmanEndPosition - pacman2.radius;
        pacman2.mouthPosition = pacman.mouthPosition;
        renderPacman(pacman2, ctx);

        if ((pacman.positionX - pacman.radius) >= (gameWidth)) {
            pacman.positionX = pacman2.positionX
        }
    }
}

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

document.querySelectorAll('.pacmanAnimation').forEach(canvas => {
    const canvasStyleProps = window.getComputedStyle(canvas);
    const gameWidth = parseInt(canvasStyleProps.width);
    const gameHeight = parseInt(canvasStyleProps.height);

    canvas.width = gameWidth;
    canvas.height = gameHeight;

    const mainPacman = new Pacman(gameWidth, gameHeight);
    const ctx = canvas.getContext('2d');

    function render() {
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, gameWidth, gameHeight);
        renderPacman(mainPacman, ctx);
        mainPacman.mouthPosition++;
        mainPacman.move();
        handleEndOfWindow(mainPacman, ctx, gameWidth, gameHeight);

        window.requestAnimationFrame(render);
    }

    render()
});
