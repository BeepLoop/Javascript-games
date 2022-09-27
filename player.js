class Player {
  constructor() {
    this.width = 20;
    this.height = 40;
    this.health = 100;
    this.flying = false;
    this.lift = createVector(0, -2.4);
    this.location = createVector(50, height - this.height);
    this.moveSpeed = 2;
    this.jetpack = new Jetpack(this);
    this.color = "red";
  }

  show() {
    noStroke();
    fill(this.color);
    rect(this.location.x, this.location.y, this.width, this.height);
    this.jetpack.update(this);

    // noStroke();
    // textAlign(LEFT);
    // fill("white");
    // textSize(15);
    // text("Gas: " + this.jetpack.gas, 10, 60);
  }

  gas() {
    return this.jetpack.gas;
  }

  fly() {
    if (this.flying == true && this.jetpack.gas > 0) {
      this.location.add(this.lift);
      this.jetpack.showBoost(this);
    }

    if (this.location.y <= 0) {
      this.location.y = 0;
    }
  }

  fall(gravity) {
    this.location.add(gravity);
  }

  isGrounded() {
    if (this.location.y + this.height >= height) {
      return true;
    } else {
      return false;
    }
  }
}
