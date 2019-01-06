let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// gap: is the gap in pixel between the north pipe and south pipe
let gap = 85;

// the constant is the south pipe position, and it is calculating by adding the gap to the north pipe
let constant = pipeNorth.height + gap;

// the bird x and y position
let bX = 10;
let bY = 150;

// the bird falls by 1.5 pixels at a time
let gravity = 1.5;

// init player score
let score = 0;

// the player can control the bird using any key on the keyboard
document.addEventListener("keydown", moveUp);
document.addEventListener("touchstart", moveUp);
function moveUp() {
  bY -= 25;
  fly.play();
}

// store pipes coordinates
let pipe = [];
pipe[0] = {
  x: cvs.width,
  y: 0
};

function draw() {
  ctx.drawImage(bg, 0, 0);

  // code
  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;
    if (pipe[i].x == cvs.width - 188) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }
    // detect collision
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= cvs.height - fg.height
    ) {
      location.reload(); // reload the page
    }

    if (pipe[i].x == 5) {
      score++;
      scor.play();
    }
  }

  ctx.drawImage(fg, 0, cvs.height - fg.height);
  ctx.drawImage(bird, bX, bY);
  if (bX < cvs.width / 3) bX++;
  bY += gravity;
  ctx.fillStyle = "#000";
  ctx.font = "20px Verdana";
  ctx.fillText("Score: " + score, 10, cvs.height - 20);
  requestAnimationFrame(draw);
}

window.onload = draw;
