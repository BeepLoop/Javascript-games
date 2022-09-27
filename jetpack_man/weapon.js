class Weapon {
  constructor(player) {
    this.location = createVector(
      player.location.x + player.width / 2,
      player.location.y + player.height / 2
    );

    this.width = 20;
    this.height = 8;
  }

  show() {
    fill("pink");
    rect(this.location.x, this.location.y, this.width, this.height);
  }

  move(player) {
    this.location.add(player.location);
  }
}
