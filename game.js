const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const width = window.innerWidth;
const height = window.innerHeight;
canvas.width = width;
canvas.height = height;
const radius = 20;
const speed = 200;

class V2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(that){
        return new V2(this.x + that.x, this.y + that.y);
    }
    subtract(that){
        return new V2(this.x - that.x, this.y - that.y);
    }
    scale(s){
        return new V2(this.x * s, this.y * s);
    }
}

let position = new V2(radius + 10, radius + 10);
let velocity = new V2(0, 0);

function fillCircle(context, position, radius, color = "red"){
    context.beginPath();
    context.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}

let start;
function step(timestamp){
    if (start === undefined) start = timestamp;
    const deltaTime = (timestamp - start) / 1000;
    start = timestamp;

    // if (x + radius >= width || x - radius <= 0) dx = -dx;
    // if (y + radius >= height || y - radius <= 0) dy = -dy;
    // x += dx * deltaTime;
    // y += dy * deltaTime;

    position = position.add(velocity.scale(deltaTime));

    context.clearRect(0, 0, width, height);
    fillCircle(context, position, radius, "red");

    window.requestAnimationFrame(step);
}

let directionMap = {
    "ArrowUp": new V2(0, -speed),
    "w": new V2(0, -speed),

    "ArrowDown": new V2(0, speed),
    "s": new V2(0, speed),

    "ArrowLeft": new V2(-speed, 0),
    "a": new V2(-speed, 0),

    "ArrowRight": new V2(speed, 0),
    "d": new V2(speed, 0)
};


document.addEventListener("keydown", event => {
    if (event.key in directionMap){
        velocity = velocity.add(directionMap[event.key]);
    }
});

document.addEventListener("keyup", event => {
    if (event.key in directionMap){
        velocity = velocity.subtract(directionMap[event.key]);
    }
});

document.addEventListener("click", () => {
    document.getElementById("bgm").play();
}, { once: true });

window.requestAnimationFrame(step);