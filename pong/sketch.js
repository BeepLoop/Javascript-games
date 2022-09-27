let ball;
let player;
let cpu;
let bounced = false;
let running = false;
const FPS = 60;

function setup() {
  createCanvas(400, 500);
  ball = new Ball();
  player = new Player(ball);
  cpu = new Enemy(ball);
  frameRate(FPS);
}

function draw() {
  background(0);
  bounced = false;

  if (running == true) {
    ball.show();
    player.show();
    player.move(ball);
    cpu.show();
    cpu.move(ball);

    if (player.hit(ball)) {
      ball.velocity.y *= -1;
      ball.acceleration.y *= -1;
      bounced = true;
    }

    if (cpu.hit(ball)) {
      ball.velocity.y *= -1;
      ball.acceleration.y *= -1;
      bounced = true;
    }

    ball.move();

    if (bounced == false) {
      ball.bounce();
    }

    if (ball.location.y + ball.diameter / 2 >= height) {
      console.log("computer score");
    } else if (ball.location.y - ball.diameter / 2 <= 0) {
      console.log("player score");
    }
  } else {
    fill("white");
    textSize(20);
    textAlign(CENTER);
    text("touch to start", width / 2, height / 2);
  }
}

function touchStarted() {
  running = true;
}
