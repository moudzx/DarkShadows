const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const height = canvas.height;
const width = canvas.width;


// context.moveTo(0, 0);
// context.lineTo(width, height);
// context.stroke();
// &drawLine(x,y)

let start;
let x = width / 2;
let y = height / 2;

let dx = 100; // pps
let dy = 100;

function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }

    const deltaTime = (timestamp - start) / 1000;
    start = timestamp;

    x += dx * deltaTime;
    y += dy * deltaTime;

    if (x + radius > width) {
        x = width - radius;
        dx = -dx;
    } else if (x - radius < 0) {
        x = radius;
        dx = -dx;
    }

    if (y + radius > height) {
        y = height - radius;
        dy = -dy;
    } else if (y - radius < 0) {
        y = radius;
        dy = -dy;
    }

    context.clearRect(0, 0, width, height);
    fillCircle(x, y, radius, "red");

    requestAnimationFrame(step);
}

requestAnimationFrame(step);

function fillCircle(x, y, radius, color = "red") {
context.beginPath();
context.arc(x, y, radius, 0, 2 * Math.PI);
context.fillStyle = color;
context.fill();
}

const radius = 50;
context.fillRect(0, 0, width, height);
fillCircle(x, y, radius);

    