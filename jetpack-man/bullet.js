class Bullet {
  constructor(weapon) {
    this.location = createVector(
      weapon.location.x + weapon.width,
      weapon.location.y + weapon.height / 2
    );
    this.velocity = createVector(4, 0);
    this.size = 6;
    this.rangeTraveled = 0;
    this.maxRange = width / 2 - this.location.x;
  }

  spawn() {
    noStroke();
    fill("orange");
    ellipse(this.location.x, this.location.y, this.size);
  }

  fire() {
    this.spawn();
    this.location.add(this.velocity);
    this.rangeTraveled += 1;
  }

  collide(obstacle) {
    if (obstacle.location.x + obstacle.size <= this.location.x) {
      if (
        obstacle.location.y <= this.location.y + this.height &&
        obstacle.location.y + obstacle.size >= this.location.y
      ) {
        return true;
      }
    } else {
      return false;
    }
  }
}
