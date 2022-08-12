const body = document.querySelector('body');

const canvas = document.createElement('canvas');

body.appendChild(canvas);

canvas.height = 400;
canvas.width = 400;

const ctx = canvas.getContext('2d');

ctx.lineWidth = 4;

ctx.fillRect(10, 10, 110, 110);

ctx.clearRect(40, 40, 200, 200);

ctx.strokeRect(70, 70, 300, 300);

ctx.beginPath();
ctx.moveTo(200, 200);
ctx.lineTo(200, 300);
ctx.lineTo(300, 300);
ctx.lineTo(340, 280);
ctx.lineTo(340, 180);
ctx.lineTo(240, 180);
ctx.lineTo(200, 200);
ctx.lineTo(300, 200);
ctx.lineTo(340, 180);
ctx.lineTo(300, 200);
ctx.lineTo(300, 300);
// ctx.closePath();
ctx.stroke();

// alert(canvas.height);
// console.log(canvas.height);
// console.log(canvas.width);