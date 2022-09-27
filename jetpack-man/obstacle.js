class Obstacle {
  constructor() {
    this.size = 20;
    this.y = random(height);
    if (this.y < this.size) {
      this.y = this.size;
    }
    if (this.y > height - this.size) {
      this.y = height - this.size;
    }
    this.location = createVector(width, this.y);
    this.velocity = createVector(-1, 0);
    this.color = "yellow";
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.location.x, this.location.y, this.size);

    strokeWeight(2);
    stroke("red");
    line(
      this.location.x,
      this.location.y,
      this.location.x + this.size,
      this.location.y
    );
  }

  update() {
    this.show();
    this.location.add(this.velocity);
  }

  offScreen() {
    if (this.location.x + this.size <= 0) {
      return true;
    } else {
      return false;
    }
  }

  detectHit(player) {
    if (
      this.location.y > player.location.y &&
      this.location.y < player.location.y + player.height
    ) {
      if (player.location.x + player.width >= this.location.x - this.size / 2) {
        return true;
      }
    }
  }
}
