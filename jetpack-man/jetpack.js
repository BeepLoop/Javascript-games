class Jetpack {
  constructor(player) {
    this.width = 15;
    this.height = player.height / 2;
    this.location = createVector(
      player.location.x - this.width,
      player.location.y + player.height / 4
    );

    this.gas = 100;
    this.boost = [];
  }

  show() {
    noStroke();
    fill("green");
    rect(this.location.x, this.location.y, this.width, this.height);

    this.boost.forEach((particle) => {
      particle.show();
      particle.update();

      if (particle.hasFaded()) {
        this.boost.splice(particle, 1);
      }
    });
  }

  update(player) {
    this.show();
    this.location.x = player.location.x - this.width;
    this.location.y = player.location.y + player.height / 4;

    if (this.location.x <= 0) {
      this.location.x = 0;
      player.right = false;
    }

    if (frameCount % 60 == 0 && player.flying == true && this.gas > 0) {
      this.gas -= 10;
    }

    if (this.gas < 100 && player.flying == false) {
      if (this.gas != 100 && frameCount % 40 == 0) {
        this.gas += 10;
      }
    }
  }

  showBoost(player) {
    if (player.flying) {
      this.boost.push(new Particles(this));
    }
  }
}
