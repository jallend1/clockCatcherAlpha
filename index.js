let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let numbers = [];

function generateNumber() {
    let number = Math.floor(Math.random() * 10);
    let x = Math.floor(Math.random() * (canvas.width - 20));
    let y = 0;
    let speed = Math.random() * 2 + 1;
    numbers.push({ number: number, x: x, y: y, speed: speed });
}

setInterval(generateNumber, 1000);

let currentHour = 0;

function draw() {
    // Clears canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the bottom line of  the screen with the current hour highlighted
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 50);
    ctx.lineTo(canvas.width, canvas.height - 50);
    ctx.stroke();
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    for (let i = 0; i < 24; i++) {
        ctx.fillText(i, i * (canvas.width / 24) + (canvas.width / 24) / 2, canvas.height - 20);
    }
    ctx.fillStyle = "yellow";
    ctx.fillRect(currentHour * (canvas.width / 24), canvas.height - 50, canvas.width / 24, 50);

    // Draw the falling numbers
    ctx.fillStyle = "black";
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
    requestAnimationFrame(draw);
}

draw();

document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowLeft" && currentHour > 0) {
        currentHour--;
    } else if (event.code === "ArrowRight" && currentHour < 23) {
        currentHour++;
    }
});
