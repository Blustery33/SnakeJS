var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var interval = 100;

canvas.width = 400;
canvas.height = 400;

function drawSnake() {
    for (var i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#IUIUIU";
        ctx.fillRect(snake[i].x, snake[i].y, 10, 10);
    }
}

var snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 },
];

var dx = 10;
var dy = 0;
var gameStarted = false;

function startGame() {
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 },
    ];
    dx = 10;
    dy = 0;
    gameStarted = true;
    setTimeout(main, interval);
}

function moveSnake() {
    var snakeHead = { x: snake[0].x + dx, y: snake[0].y + dy };


    snake.pop();

    snake.unshift(snakeHead);
}

function gameOver() {
    alert("Game Over!");
    gameStarted = false;
}

function checkCollision() {
    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height
    ) {
        gameOver();
    }
    for (var i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            gameOver();
        }
    }
}

document.addEventListener("keydown", function (event) {
    if (!gameStarted) {
        startGame();
    } else {
        if (event.keyCode === 37) {
            // gauche
            dx = -10;
            dy = 0;
        } else if (event.keyCode === 38) {
            // haut
            dx = 0;
            dy = -10;
        } else if (event.keyCode === 39) {
            // droite
            dx = 10;
            dy = 0;
        } else if (event.keyCode === 40) {
            // bas
            dx = 0;
            dy = 10;
        }
    }
});

function main() {
    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mettre à jour la position du serpent
    moveSnake();

    // Vérifier les collisions
    checkCollision();

    // Dessiner le serpent
    drawSnake();



    if (gameStarted) {
        // Répéter la boucle
        setTimeout(main, interval);
    }
}

