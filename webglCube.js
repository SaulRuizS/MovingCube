// import { mat4 } from 'glMatrix';

const body = document.querySelector('body');

const canvas = document.createElement('canvas');

body.appendChild(canvas);

canvas.height = 800;
canvas.width = 800;

// const cube2d = () => {
//     const ctx2d = canvas.getContext('2d');

//     ctx2d.lineWidth = 1;

//     ctx2d.beginPath();
//     ctx2d.moveTo(200, 200);
//     ctx2d.lineTo(200, 300);
//     ctx2d.lineTo(300, 300);
//     ctx2d.lineTo(340, 280);
//     ctx2d.lineTo(340, 180);
//     ctx2d.lineTo(240, 180);
//     ctx2d.lineTo(200, 200);
//     ctx2d.lineTo(300, 200);
//     ctx2d.lineTo(340, 180);
//     ctx2d.moveTo(300, 200);
//     ctx2d.lineTo(300, 300);
//     ctx2d.moveTo(240, 180);
//     ctx2d.lineTo(240, 280);
//     ctx2d.lineTo(340, 280);
//     ctx2d.moveTo(240, 280);
//     ctx2d.lineTo(200, 300);
//     ctx2d.stroke();
// }

// cube2d();

const vsSource = `
    attribute vec4 attributeVertexPos;

    uniform mat4 uniformProjectionMatrix;
    uniform mat4 uniformModelViewMatrix;

    void main() {
        gl_Position = uniformProjectionMatrix * uniformModelViewMatrix * attributeVertexPos;
    }
`;

const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;

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

const initBuffers = (ctx) => {
    const positionBuffer = ctx.createBuffer();

    ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);

    const positions = [
        1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0,
    ];

    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

    return {
        position: positionBuffer,
    };
}

const drawScene = (ctx, programInfo, buffers) => {
    ctx.clearColor(0.3, 0.8, 0.0, 1.0);
    ctx.clearDepth(1.0);
    ctx.enable(ctx.DEPTH_TEST);
    ctx.depthFunc(ctx.LEQUAL);
    ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;

    const aspect = ctx.canvas.width / ctx.canvas.height;

    const zNear = 0.1;

    const zFar = 100.0;

    const projectionMatrix = mat4.create();

    mat4.perspective(
            projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar
        )

    const modelViewMatrix = mat4.create();

    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);

    const numComponents = 2;

    const type = ctx.FLOAT;

    const normalize = false;

    const stride = 0;
    
    const offset = 0;

    ctx.bindBuffer(ctx.ARRAY_BUFFER, buffers.position);
    
    ctx.vertexAtribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
    );
    
    ctx.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition
    );
    
    ctx.useProgram(programInfo.program)

    ctx.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
    );

    ctx.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix
    );

    {
        const offset = 0;
        const vertexCount = 4;
        ctx.drawArrays(ctx.TRIANLGE_STRIP, offset, vertexCount);
    }
}

const main = () => {
    let ctxWebl = canvas.getContext('webgl');

    if(ctxWebl === null) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    }
    // ctxWebl.clearColor(0.3, 0.9, 0.1, 1.0);
    // ctxWebl.clear(ctxWebl.COLOR_BUFFER_BIT | ctxWebl.DEPTH_BUFFER_BIT);

    const shaderProgram = initShader(ctxWebl, vsSource, fsSource);

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: ctxWebl.getAttribLocation(shaderProgram, 'attributeVertexPos'),
        },
        uniformLocations: {
            projectionMatrix: ctxWebl.getUniformLocation(shaderProgram,'uniformProjectionMatrix'),
            modelViewMatrix: ctxWebl.getUniformLocation(shaderProgram, 'uniformModelViewMatrix'),
        },
    }

    const buffers = initBuffers(ctxWebl);

    drawScene(ctxWebl, programInfo, buffers);
}

export default main;