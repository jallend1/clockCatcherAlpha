const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const numbers = [];
let currentHour = 0;

function draw() {
    // Clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCanvasFooter();
    drawFallingNumbers();
    requestAnimationFrame(draw);
}

function drawFallingNumbers() {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];
        ctx.fillText(number.number, number.x, number.y);
        number.y += number.speed;
        // Check if the number has reached the bottom line
        if (number.y > canvas.height - 50) {
            // Check if the number is aligned with the current hour
            if (Math.floor(number.x / (canvas.width / 24)) == currentHour) {
                // Do something neat like add points
            }
            numbers.splice(i, 1);
            i--;
        }
    }
}

function drawFooterLine() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();
}

function drawFooterHours() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    for (let i = 0; i < 24; i++) {
        ctx.fillText(i, i * (canvas.width / 24) + (canvas.width / 24) / 2, canvas.height - 20);
    }
}

function drawFooterSelectedHour() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(currentHour * (canvas.width / 24), canvas.height - 50, canvas.width / 24, 50);
}

function drawCanvasFooter() {
    drawFooterLine();
    drawFooterSelectedHour();
    drawFooterHours();
}

function generateFallingNumber() {
    let number = Math.floor(Math.random() * 10);
    let x = Math.floor(Math.random() * 24) * (canvas.width / 24) + (canvas.width / 24) / 2;
    let y = 0;
    let speed = Math.random() * 2 + 1;
    numbers.push({ number: number, x: x, y: y, speed: speed });
}

setInterval(generateFallingNumber, 1000);

draw();

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" && currentHour > 0) {
        currentHour--;
    } else if (e.code === "ArrowRight" && currentHour < 23) {
        currentHour++;
    }
});
