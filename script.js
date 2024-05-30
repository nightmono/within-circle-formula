const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const circleX = canvas.width / 2;
const circleY = canvas.height / 2;
const radius = 100;

let points = [];
let draggingPoint = null;

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#e0def4"; 
    ctx.stroke();
}

function drawPoints() {
    points.forEach(point => {
        const { x, y } = point;
        if (isWithinCircle(x, y, circleX, circleY, radius)) {
            ctx.fillStyle = "#f6c177";
        } else {
            ctx.fillStyle = "#908caa";
        }
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function isWithinCircle(x, y, circleX, circleY, radius) {
    const squaredDistance = (x - circleX) ** 2 + (y - circleY) ** 2;
    return squaredDistance <= radius ** 2;
}

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

canvas.addEventListener("mousedown", (event) => {
    const mousePos = getMousePos(event);
    for (let point of points) {
        const distance = Math.hypot(mousePos.x - point.x, mousePos.y - point.y);
        if (distance < 5) {
            draggingPoint = point;
            break;
        }
    }
});

canvas.addEventListener("mousemove", (event) => {
    if (draggingPoint) {
        const mousePos = getMousePos(event);
        draggingPoint.x = mousePos.x;
        draggingPoint.y = mousePos.y;
        drawCircle();
        drawPoints();
    }
});

canvas.addEventListener("mouseup", () => {
    draggingPoint = null;
});

canvas.addEventListener("click", (event) => {
    if (!draggingPoint) {
        const mousePos = getMousePos(event);
        points.push({ x: mousePos.x, y: mousePos.y });
        drawCircle();
        drawPoints();
    }   
});

drawCircle();
