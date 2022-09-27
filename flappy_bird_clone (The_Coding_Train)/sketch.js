let bird;
let pipes = new Array();
// let mic;
let score = 0;

function setup() {
  createCanvas(400, 500);
  // mic = new p5.AudioIn();
  // mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  // let volume = mic.getlevel();

  if (frameCount % 200 == 0) {
    pipes.push(new Pipe());
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hitBird(bird) || bird.y >= height) {
      let gameover = "GameOver";
      let restart = "refresh page to restart";

      textSize(32);
      fill("white");
      textAlign(CENTER);
      text(gameover, width / 2, height / 2);
      textSize(20);
      text(restart, width / 2, height / 2 + 40);
      noLoop();
    }

    if (pipes[i].x < 0) {
      pipes.splice(i, 1);
      score++;
      console.log(score);
    }

    textSize(32);
    fill("white");
    textAlign(LEFT);
    text(score, 10, 30);
  }

  bird.show();
  bird.update();

  //Volume visuals
  // fill("green");
  // let y = map(volume, 0, 1, height, 0);
  // rect(width - 50, y, 50, height - y);
}

class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;
    this.gravity = 0.5;
    this.lift = -10;
    this.velocity = 0;
    this.diameter = 20;
  }

  show() {
    fill("yellow");
    noStroke();
    ellipse(this.x, this.y, this.diameter);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.velocity *= 0.9;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

class Pipe {
  constructor() {
    this.gap = 100;
    this.top = random(height / 2);
    this.bottom = this.top + this.gap;
    this.x = width;
    this.w = 40;
    this.speed = 1;
    this.highlight = false;
  }

  show() {
    fill("green");
    if (this.highlight == true) {
      fill("red");
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height);
  }

  update() {
    this.x -= this.speed;
  }

  hitBird(bird) {
    if (
      bird.y + 10 < this.top ||
      bird.y + 10 > this.bottom ||
      bird.y - 10 < this.top ||
      bird.y - 10 > this.bottom
    ) {
      if (bird.x + 10 > this.x && bird.x + 10 < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
  }
}

function keyPressed() {
  if (key == " ") {
    bird.up();
  }
}
