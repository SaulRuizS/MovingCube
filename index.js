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

const loadShader = (ctx, shaderType, source) => {
    
    const shader = ctx.createShader(shaderType);
    ctx.shaderSource(shader, source);
    ctx.compileShader(shader);

    return shader;
}

const initShader = (ctx, vShaderSource, fShaderSource) => {

    const vertexShader = loadShader(ctx, ctx.VERTEX_SHADER, vShaderSource);
    const fragmentShader = loadShader(ctx, ctx.FRAGMENT_SHADER, fShaderSource);

    const shaderProgram = ctx.createProgram();
    ctx.attachShader(shaderProgram, vertexShader);
    ctx.attachShader(shaderProgram, fragmentShader);
    ctx.linkProgram(shaderProgram);

    return shaderProgram;
}

const main = () => {
    let ctxWebl = canvas.getContext('webgl');

    if(ctxWebl === null) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    }
    ctxWebl.clearColor(0.3, 0.9, 0.1, 1.0);
    ctxWebl.clear(ctxWebl.COLOR_BUFFER_BIT);
}

window.onload = main;