import drawBall from "./ball.js";
import drawPaddle from "./paddle.js";
import drawLargeBricks from "./bricks.js";
import { drawSmallBricks } from "./bricks.js";
import drawScore from "./score.js";
import drawLives from "./lives.js";


export var canvas = document.getElementById("myCanvas");
export var ctx = canvas.getContext("2d");








// This makes canvas able to store the upcomimg 2d context


// ball props
export var color = ctx.createLinearGradient(20, 0, 220, 0);

// Add three color stops
color.addColorStop(1, 'darkblue');
color.addColorStop(0.8, 'red');
color.addColorStop(1, 'blue');
export var x = canvas.width / 2;
export var y = canvas.height - 60;
export var ballRadius = 10;



// to make the ball appear moviing 
var dx = 3;
var dy = -3;


// // for large bricks
export var largeBrickRowCount = 0;
export var largeBrickColumnCount = 0;
export var largeBrickWidth = 1000;
export var largeBrickHeight = 20;
export var largeBrickPadding = 10;
export var largeBrickOffsetTop = 30;
export var largeBrickOffsetLeft = 14;
export var largeBricks = [];

//for short bricks
export var smallBrickRowCount = 1;
export var smallBrickColumnCount = 1;
export var smallBrickWidth = 2000;
export var smallBrickHeight = 20;
export var smallBrickPadding = 10;
export var smallBrickOffsetTop = 210;
export var smallBrickOffsetLeft = 25;
export var smallBricks = [];



// for paddle
export var paddleHeight = 25;
export var paddleWidth = 150;
export var paddleX = (canvas.width - paddleWidth) / 2; // the leftmost part of the paddle 

function mediaQuery(x) {
    if (x.matches) { // If media query matches

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        largeBrickRowCount = 4;
        largeBrickColumnCount = 4;
        largeBrickWidth = 75;
        largeBrickHeight = 20;
        largeBrickPadding = 10;
        largeBrickOffsetTop = 30;
        largeBrickOffsetLeft = 25;
        largeBricks = [];

    } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        console.log(canvas.width);

    }
}
var x;
if (window.matchMedia("(max-width: 600px)")) {
    x = window.matchMedia("(max-width: 600px)");
    mediaQuery(x) // Call listener function at run time
    x.addListener(mediaQuery) // Attach listener function on state changes
}

if (window.matchMedia("(max-width: 900px)")) {
    x = window.matchMedia("(max-width: 900px)");
    mediaQuery(x) // Call listener function at run time
    x.addListener(mediaQuery) // Attach listener function on state changes
}







var rightPressed = false;
var leftPressed = false;
var startBtn = document.getElementById('startBtn');

// for score
export var score = 0;
export var score1 = 0;
export var score2 = 0;

//lives
export var lives = 200000000000000000000000000;

// for building  bricks
for (var c = 0; c < largeBrickColumnCount; c++) {
    largeBricks[c] = [];
    for (var r = 0; r < largeBrickRowCount; r++) {
        largeBricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
// for building smaller bricks
for (var c = 0; c < smallBrickColumnCount; c++) {
    smallBricks[c] = [];
    for (var r = 0; r < smallBrickRowCount; r++) {
        smallBricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// gestures
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function moveLeft() {
    leftPressed = true;

}
function moveLeftStop() {
    leftPressed = false;

}
function moveright() {
    rightPressed = true;

}
function moveRightStop() {
    rightPressed = false;

}
document.getElementById("leftBtn").addEventListener("pointerdown", moveLeft);
document.getElementById("leftBtn").addEventListener("pointerup", moveLeftStop);
document.getElementById("rightBtn").addEventListener("pointerdown", moveright);
document.getElementById("rightBtn").addEventListener("pointerup", moveRightStop);


// function moveleft(e) {
//     if (e.key == "Right" || e.key == "ArrowRight") {
//         rightPressed = true;
//     }
//     else if (e.key == "Left" || e.key == "ArrowLeft") {
//         leftPressed = true;
//     }
// }
//document.getElementById('rightBtn').addEventListener('click', moveleft)


// function moveright() {
//     const img = document.getElementById('inspo');
//     img.style.left = `${img.offsetLeft + 10}px`;
// }

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }

}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 + paddleWidth / 2 && relativeX < canvas.width - paddleWidth / 2) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
// collision with larger bricks
function largeBricksCollisionDetection() {
    for (var c = 0; c < largeBrickColumnCount; c++) {
        for (var r = 0; r < largeBrickRowCount; r++) {
            var b = largeBricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + largeBrickWidth && y > b.y && y < b.y + largeBrickHeight) {
                    dy = -dy;


                    b.status = 0;
                    score++;


                }
            }

        }
    }
}


// collision with smaller bricks
function smallBricksCollisionDetection() {
    for (var c = 0; c < smallBrickColumnCount; c++) {
        for (var r = 0; r < smallBrickRowCount; r++) {
            var b = smallBricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + smallBrickWidth && y > b.y && y < b.y + smallBrickHeight) {
                    dy = -dy;

                    b.status = 0;
                    score++;
                    if (score == 1) {

                        ballRadius = 0;
                        Swal.fire({
                            title: "!You Win",
                            iconHtml: '<img src="./assets/images/win.jpg">',
                            customClass: {
                                icon: 'no-border'
                            },
                            button:{
                                text: "Play Again",
                                value: true,
                                visible: true,
                                className: "",
                                closeModal: true,
                              }

                        }).then((result) => {
                            // Reload the Page
                            location.reload();
                        });


                    }


                }
            }

        }
    }
}




////////////
// var startBtn = document.getElementById('startBtn');
// startBtn.addEventListener('click', draw);

// var targetDiv = document.getElementById("go");
// targetDiv.style.display = "none";

// startBtn.onclick = function () {
//     targetDiv.style.display = "block";
//     targetDiv.onplaying;

// };

// document.querySelector("#startBtn").addEventListener("click", () => {
//     document.querySelector("#go").play();
// });

setTimeout(function () {
    $('#go').fadeOut('fast');
}, 4000);
//////////////////////
// var myImage = document.getElementById("mainImage");

// var imageArray = ["./assets/images/Go.png", "", ""]

// var imageIndex = 0;

// function changeImage() {

//     myImage.setAttribute("src", imageArray[imageIndex]);
//     imageIndex++;
//     if (imageIndex >= imageArray.length) {
//         clearInterval(abc)
//         imageIndex = 0;
//     }

// }

//startBtn.addEventListener('click', changeImage);

// setTimeout(function () {
//     $('#mainImage').fadeOut('fast');
// }, 3200);

// function change() {
//   document.getElementById("countdown").style.display = 'block';
//   var inst = setInterval(change, 1000);
//   var elem = document.createElement("img");

//   document.getElementById("countdown").replaceChild(text[counter], text[counter+1]);
//   elem.src = text[counter];
//   //document.getElementById("countdown").innerHTML = "";


//   counter++;
//   if (counter >=3) {
//     document.getElementById("countdown").style.display = 'none';
//     clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
//   }

// }
// function change() {

//     var inst = setInterval(change, 1000);
//     var elem = document.createElement("img");
//     document.getElementById("countdown").appendChild(elem);
//     //var elem = document.createElement("img");
//     elem.src = text[counter];


//     //image.src = './assets/images/arrow.png';
//     counter++;
//     if (counter >= text.length) {
//       document.getElementById('countdown').style.display = 'none';

//       clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
//     }
//   }







function draw() {


    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas before drawing the next ball otherwise it will look like the ballis leaving trails
    //startBtn.style.display = 'none';
    drawLargeBricks();
    drawSmallBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    largeBricksCollisionDetection();
    smallBricksCollisionDetection();
    // for right and left wall
    if (x + dx + ballRadius >= canvas.width || x + dx - ballRadius <= 0) {
        dx = -dx;
        //color = "#0095DD"

    }

    // for top and bottom wall
    if (y + dy - ballRadius <= 0) { // coordinates of top of the ball = y + dy - ballRadius
        dy = -dy;
        //color = "#0000FF";
    }

    // paddle
    else if (y + dy >= canvas.height - ballRadius - paddleHeight) {
        if (x >= paddleX && x <= paddleX + paddleWidth / 8) {
            if (x > x + dx) {
                dy = -dy
                dx = 1.5 * dx
            }
            else if (x < x + dx) {
                dy = -dy
                dx = -1.5 * dx
            }

        }
        else if (x > paddleX + paddleWidth / 8 && x <= paddleX + paddleWidth / 4) {
            if (x > x + dx) {
                dy = -dy
                dx = 1.2 * dx
            }
            else if (x < x + dx) {
                dy = -dy
                dx = -1.2 * dx
            }

        }
        else if (x > paddleX + paddleWidth / 4 && x <= paddleX + paddleWidth / 2) {
            dy = -dy
            dx = -0.6 * dx
        }
        else if (x > paddleX + paddleWidth / 2 && x <= paddleX + 3 * paddleWidth / 4) {
            dy = -dy
            dx = 0.6 * dx
        }
        else if (x > paddleX + 5 * paddleWidth / 8 && x <= paddleX + 7 * paddleWidth / 8) {
            dy = -dy
            dx = 1.2 * dx
        }
        else if (x > paddleX + 7 * paddleWidth / 8 && x <= paddleX + paddleWidth) {
            if (x > x + dx) {
                dy = -dy
                dx = -1.5 * dx

            }
            if (x < x + dx) {
                dy = -dy
                dx = 1.5 * dx

            }

        }


        else if (y + dy > canvas.height - ballRadius) {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload(); // to reload the current document

            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 60;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
            // Needed for Chrome to end game
        }

    }
    // if

    //document.getElementById("check").innerHTML = x;

    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    //a = x;
    //b = y;

    x = x + dx;

    y += dy;




    requestAnimationFrame(draw);



}


setInterval(function () { draw(); }, 4000);



// making a box to make the ball hit to it



