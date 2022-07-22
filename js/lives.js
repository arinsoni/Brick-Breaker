import { canvas, ctx } from './main.js';
import { lives } from './main.js';
export default function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#d0f2f0";
    ctx.fillText("Lives: "+lives, canvas.width-10, 20);
}
