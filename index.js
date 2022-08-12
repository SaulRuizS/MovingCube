const body = document.querySelector('body');

const canvas = document.createElement('canvas');

body.appendChild(canvas);

canvas.height = 800;
canvas.width = 800;

const cube2d = () => {
    const ctx2d = canvas.getContext('2d');

    ctx2d.lineWidth = 1;

    ctx2d.beginPath();
    ctx2d.moveTo(200, 200);
    ctx2d.lineTo(200, 300);
    ctx2d.lineTo(300, 300);
    ctx2d.lineTo(340, 280);
    ctx2d.lineTo(340, 180);
    ctx2d.lineTo(240, 180);
    ctx2d.lineTo(200, 200);
    ctx2d.lineTo(300, 200);
    ctx2d.lineTo(340, 180);
    ctx2d.moveTo(300, 200);
    ctx2d.lineTo(300, 300);
    ctx2d.moveTo(240, 180);
    ctx2d.lineTo(240, 280);
    ctx2d.lineTo(340, 280);
    ctx2d.moveTo(240, 280);
    ctx2d.lineTo(200, 300);
    ctx2d.stroke();
}

// cube2d();

const cube3d = () => {
    let ctxWebl = canvas.getContext('webgl');

    let x = 400;
    let y = 400;

}