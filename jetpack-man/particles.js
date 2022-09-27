class Particles {
  constructor(jetpack) {
    this.location = createVector(
      jetpack.location.x,
      jetpack.location.y + jetpack.height
    );
    this.velocity = createVector(random(-0.8, 0.8), random(1, 5));
    this.width = 10;
    this.alpha = 150;
  }

  show() {
    noStroke();
    fill(190, this.alpha);
    ellipse(this.location.x + this.width / 2, this.location.y, this.width);
  }

  update() {
    this.location.add(this.velocity);
    this.alpha -= 5;
  }

  hasFaded() {
    return this.alpha <= 0;
  }
}
