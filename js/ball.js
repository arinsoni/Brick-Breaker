import { ctx } from './main.js';
import {x, y, color, ballRadius} from './main.js'



export default function drawBall() {
    ctx.beginPath(); // when we have to create a new path
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;// stores the color used by fill()
    ctx.fill();
    ctx.closePath();
}