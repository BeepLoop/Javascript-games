class Player {
  constructor(ball) {
    this.location = createVector(ball.location.x, height - 20);
    this.width = 60;
    this.height = 10;
  }

  show() {
    fill("blue");
    rect(this.location.x, this.location.y, this.width, this.height);
  }

  move(ball) {
    // this.location.x = mouseX;
    this.location.x = ball.location.x - this.width / 2;

    if (this.location.x <= 0) {
      this.location.x = 0;
    }
    if (this.location.x + this.width >= width) {
      this.location.x = width - this.width;
    }
  }

  hit(ball) {
    if (
      ball.location.y + ball.diameter / 2 >=
      this.location.y - this.height / 2
    ) {
      if (
        ball.location.x + ball.diameter >= this.location.x &&
        ball.location.x - ball.diameter <= this.location.x + this.width
      ) {
        return true;
      }
    }
  }

  origin() {
    stroke("white");
    strokeWeight(2);
    line(this.location.x, this.location.y, this.location.x, height);
  }
}
