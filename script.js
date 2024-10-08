var Homecanvas=document.getElementById("HomeCanvas");
var Homectx=Homecanvas.getContext("2d");
var circles=[];
var fixedRadius=20;
var fixedColor="orange";
HomeCanvas.width=window.innerWidth;
HomeCanvas.height=window.innerHeight;

function displayGame() {
    document.getElementById('gamePage').style.display = 'block';
    document.getElementById('homePage').style.display = 'none';
    startGame();
}
document.getElementById('play').addEventListener('click',displayGame);

for (let i = 0; i < 27; i++) {
    let x = Math.random() * (HomeCanvas.width - 2 * fixedRadius) + fixedRadius; 
    let y = Math.random() * (HomeCanvas.height - 2 * fixedRadius) + fixedRadius; 
    let speedX=(Math.random() - 0.5)*10;
    let speedY=(Math.random() - 0.5)*10;

    
    circles.push({
        x: x,
        y: y,
        radius: fixedRadius,
        color: fixedColor,
        speedX: speedX,
        speedY: speedY

    });
}
//Function to draw all circles
function drawCircles(){
    clearCanvas();
    circles.forEach(function(circle){
        drawCircle(circle);
    });
}

//Function to draw a single circle
function drawCircle(circle) {
    Homectx.beginPath();
    Homectx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    Homectx.fillStyle = fixedColor;
    Homectx.fill();
    Homectx.closePath();
}

// Function to clear the canvas
function clearCanvas() {
    Homectx.clearRect(0, 0, Homecanvas.width, Homecanvas.height);
}

// Function to update the position of the circles
function updateCircles() {
    circles.forEach(function(circle) {
        // Move the circle by updating its position
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Check for collision with the canvas edges and reverse direction if needed
        if (circle.x + circle.radius > Homecanvas.width || circle.x - circle.radius < 0) {
            circle.speedX = -circle.speedX;  // Reverse x direction
        }
        if (circle.y + circle.radius > Homecanvas.height || circle.y - circle.radius < 0) {
            circle.speedY = -circle.speedY;  // Reverse y direction
        }
    });
}

// Function to animate the circles
function animate() {
    updateCircles();  // Update the position of circles
    drawCircles();    // Redraw the circles
    requestAnimationFrame(animate);  // Continue animation
}

// Start the animation
animate();

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
    x: canvas.width/2,
    y: canvas.height / 2,
    radius: 15,
    dx: 4,
    dy: 4,
    color: "white",
    borderColor: "black", // Border color
    borderWidth: 3 
};

let slider = {
    width: 150,
    height: 20,
    x: (canvas.width - 150) / 2,
    y: canvas.height - 50,
    color: "orange",
    speed: 0
};
let gameOver = false;
let score = 0;
let gameStarted = false; // For delaying ball movement
let startDelay = 3000;

function shadow(){
    ctx.shadowBlur = 20;  // Amount of blur for the glow
    ctx.shadowColor = "yellow";  // Color of the glow
    ctx.lineWidth = ball.borderWidth;
    ctx.strokeStyle = ball.borderColor;
    ctx.stroke();
    ctx.closePath();
    ctx.shadowBlur = 0;  // Turn off the shadow for future drawings
    ctx.shadowColor = "transparent"; 
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    shadow();
    
}

function scoreCount(){
    ctx.font ="24px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score:"+ score,30,30);
}
function drawSlider(){
    ctx.beginPath();
    ctx.rect(slider.x,slider.y,slider.width,slider.height);
    ctx.fillStyle = slider.color;
    ctx.fill();
    shadow();
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;


    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    if (ball.y + ball.radius > slider.y &&
        ball.x > slider.x && ball.x < slider.x + slider.width) {
        ball.dy = -ball.dy;
        score++;

    }
    if (ball.y + ball.radius > canvas.height) {
        gameOver = true;
        displayGameOver();
    }

}

function moveSlider() {
    slider.x += slider.speed;
    if (slider.x < 0) {
        slider.x = 0;
    } else if (slider.x + slider.width > canvas.width) {
        slider.x = canvas.width - slider.width;
    }
}

function displayGameOver() {
    document.getElementById('gameOver').style.display = 'flex';
}

function hideGameOver() {
    document.getElementById('gameOver').style.display = 'none';
}

function restartGame() {
    score=0;
    gameOver=false;
    ball.x = canvas.width / 2,
    ball.y = canvas.height / 2,
    ball.dx = 4,
    ball.dy = 4,
    hideGameOver();
    gameLoop();
    startGame();

}


canvas.addEventListener('mousemove', (event) => {
    const relativeX = event.clientX - canvas.offsetLeft;
    slider.x = relativeX - slider.width / 2;
});

document.getElementById('restart').addEventListener('click',restartGame);
document.getElementById('home').addEventListener('click' , () => {
    location.reload();
    
})
function gameLoop() {
    if(!gameOver){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawSlider();
        moveBall();
        moveSlider();
        scoreCount();
    
        requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    setTimeout(() => {
        gameStarted = true;  // Start moving the ball after delay
    }, startDelay); 
gameLoop();
}
