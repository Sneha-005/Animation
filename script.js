var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var circles=[];
var fixedRadius=20;
var fixedColor="orange";
myCanvas.width=window.innerWidth;
myCanvas.height=window.innerHeight;
ctx.fillText("SAVE THE BALL",15,15);

// Function to write text;

function drawText(text) {
    ctx.font = "80px bolder Vardana"; // Set the font size and style
    ctx.fillStyle = "white"; // Set the text color
    ctx.textAlign = "center"; // Center the text horizontally
    ctx.fillText(text, canvas.width / 2, canvas.height / 2); // Draw text at the center of the canvas
}

// Initialize circles with random positions
for (let i = 0; i < 27; i++) {
    let x = Math.random() * (myCanvas.width - 2 * fixedRadius) + fixedRadius; // Random x
    let y = Math.random() * (myCanvas.height - 2 * fixedRadius) + fixedRadius; // Random y
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
    drawText("SAVE THE BALL");
}

//Function to draw a single circle
function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = fixedColor;
    ctx.fill();
    ctx.closePath();
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to update the position of the circles
function updateCircles() {
    circles.forEach(function(circle) {
        // Move the circle by updating its position
        circle.x += circle.speedX;
        circle.y += circle.speedY;

        // Check for collision with the canvas edges and reverse direction if needed
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.speedX = -circle.speedX;  // Reverse x direction
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
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