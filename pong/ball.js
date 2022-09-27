class Ball {
  constructor() {
    this.location = createVector(width / 2, height - 40);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0.02, -0.05);
    this.TOP_SPEED = 6;
    this.diameter = 20;
  }

  show() {
    fill("white");
    ellipse(this.location.x, this.location.y, this.diameter);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.TOP_SPEED);
    this.location.add(this.velocity);
  }

  bounce() {
    if (
      this.location.x + this.diameter / 2 >= width ||
      this.location.x - this.diameter / 2 <= 0
    ) {
      this.velocity.x *= -1;
      this.acceleration.x *= -1;
    }

    if (
      this.location.y + this.diameter / 2 >= height ||
      this.location.y - this.diameter / 2 <= 0
    ) {
      this.velocity.y *= -1;
      this.acceleration.y *= -1;
    }
  }
}
