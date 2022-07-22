import { canvas, ctx } from './main.js';
import { paddleHeight, paddleWidth, paddleX } from "./main.js";

export default function drawPaddle() {
    let img = new Image();
    img.src = 'assets/images/paddle.png';
    ctx.imageSmoothingQuality = 'high';
     
    ctx.drawImage(img, paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
}; 