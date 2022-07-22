import { ctx } from './main.js';
import { largeBrickWidth, largeBrickHeight, largeBricks, largeBrickColumnCount, largeBrickRowCount, largeBrickPadding, largeBrickOffsetLeft, largeBrickOffsetTop} from './main.js';
// import { smallBrickWidth, smallBrickHeight, smallBricks, smallBrickColumnCount, smallBrickRowCount, smallBrickPadding, smallBrickOffsetLeft, smallBrickOffsetTop} from './main.js';



// draw large bricks
export default function drawLargeBricks() {
    for(var c=0; c<largeBrickColumnCount; c++) {
        for(var r=0; r<largeBrickRowCount; r++) {
            if(largeBricks[c][r].status == 1){
            var largeBrickX = (c*(largeBrickWidth+largeBrickPadding))+largeBrickOffsetLeft;
            var largeBrickY = (r*(largeBrickHeight+largeBrickPadding))+largeBrickOffsetTop;
            largeBricks[c][r].x = largeBrickX;
            largeBricks[c][r].y = largeBrickY;
            ctx.beginPath();
            
            ctx.rect(largeBrickX, largeBrickY, largeBrickWidth, largeBrickHeight);
            ctx.fillStyle = "#001933";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

//draw small bricks
// export function drawSmallBricks() {
//     for(var c=0; c<smallBrickColumnCount; c++) {
//         for(var r=0; r<smallBrickRowCount; r++) {
//             if(smallBricks[c][r].status == 1){
//             var smallBrickX = (c*(smallBrickWidth+smallBrickPadding))+smallBrickOffsetLeft;
//             var smallBrickY = (r*(smallBrickHeight+smallBrickPadding))+smallBrickOffsetTop;
//             smallBricks[c][r].x = smallBrickX;
//             smallBricks[c][r].y = smallBrickY;
//             ctx.beginPath();
            
//             ctx.rect(smallBrickX, smallBrickY, smallBrickWidth, smallBrickHeight);
//             ctx.fillStyle = "#247300";
//             ctx.fill();
//             ctx.closePath();
//             }
//         }
//     }
// }




