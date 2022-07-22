import { ctx } from './main.js';
import { score } from './main.js';

export default function drawScore() {
    ctx.font = "16px Poppins";
    ctx.fillStyle = "#d0f2f0";
    ctx.fillText("SCORE: "+score, 80, 20);
}