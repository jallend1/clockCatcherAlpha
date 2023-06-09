const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth ;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const numbers = [];
const DISPLAYED_HOURS = 24;
let currentHour = 0;

function draw() {
    // Clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawCanvasFooter();
    drawFallingNumbers();
    requestAnimationFrame(draw);
}

function drawFallingNumbers() {
    ctx.fillStyle = "green";
    ctx.textAlign = "center";
    ctx.font = "16px Arial";
    for (let i = 0; i < numbers.length; i++) {
        let number = numbers[i];
        ctx.fillText(number.number, number.x, number.y);
        number.y += number.speed;
        // Check if the number has reached the bottom line
        if (number.y > canvas.height - 50) {
            // Check if the number is aligned with the current hour
            if (Math.floor(number.x / (canvas.width / DISPLAYED_HOURS)) == currentHour) {
                // Do something neat like add points
            }
            numbers.splice(i, 1);
            i--;
        }
    }
}

function drawFooterLine() {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();
}

function drawFooterHours() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    for (let i = 0; i < 24; i++) {
        ctx.fillText(i, i * (canvas.width / DISPLAYED_HOURS) + (canvas.width / DISPLAYED_HOURS) / 2, canvas.height - 20);
    }
}

function drawFooterSelectedHour() {
    ctx.fillStyle = "orange";
    ctx.fillRect(currentHour * (canvas.width / DISPLAYED_HOURS), canvas.height - 50, canvas.width / DISPLAYED_HOURS, 50);
}

function drawCanvasFooter() {
    drawFooterLine();
    drawFooterSelectedHour();
    drawFooterHours();
}

function generateFallingNumber() {
    const number = Math.floor(Math.random() * DISPLAYED_HOURS);
    const number2 = Math.floor(Math.random() * DISPLAYED_HOURS);
    const number3 = Math.floor(Math.random() * DISPLAYED_HOURS);
    const x = Math.floor(Math.random() * DISPLAYED_HOURS) * (canvas.width / DISPLAYED_HOURS) + (canvas.width / DISPLAYED_HOURS) / 2;
    const y = 0;
    let speed = Math.floor(Math.random() * 20) + 1;
    numbers.push({ number, x, y, speed }, { number: number2, x, y, speed }, { number: number3, x, y, speed });
}

setInterval(generateFallingNumber, 10);

draw();

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft" && currentHour > 0) {
        currentHour--;
    } else if (e.code === "ArrowRight" && currentHour < DISPLAYED_HOURS - 1) {
        currentHour++;
    }
});
