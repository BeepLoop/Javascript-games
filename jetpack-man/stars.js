class Stars {
  constructor() {
    this.size = random(2);
    this.velocity = createVector(-0.4, 0);
    this.location = createVector(random(width), random(height));
  }

  show() {
    noStroke();
    fill("white");
    ellipse(this.location.x, this.location.y, this.size);
  }

  update() {
    this.show();
    this.location.add(this.velocity);
  }

  isOffScreen() {
    if (this.location.x + this.size < 0) {
      return true;
    } else {
      return false;
    }
  }
}
