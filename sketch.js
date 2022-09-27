let player;
let weapon;
let jetpack;
let gravity;
let stars = [];
let obstacles = [];
let particles = [];
let bullets = [];
let spawnBullet = false;
let score = 0;
let spawnRate = 200;

function setup() {
  createCanvas(600, 400);
  frameRate(60);
  player = new Player();
  gravity = createVector(0, 3);
  obstacles.push(new Obstacle());
}

function draw() {
  background(0);

  if (player.health == 0) {
    noLoop();
    noStroke();
    textAlign(CENTER);
    fill("white");
    textSize(20);
    text("GAMEOVER", width / 2, height / 2);
  }

  weapon = new Weapon(player);
  jetpack = new Jetpack(player);

  if (Number.isInteger(frameCount / 40 / 60)) {
    spawnRate -= 20;
    console.log("spawn rate increased");
  }

  if (frameCount % spawnRate == 0) {
    obstacles.push(new Obstacle());
  }

  if (frameCount % 2 == 0) {
    if (stars.length < 100) {
      stars.push(new Stars());
    }
  }

  stars.forEach((star, starIndex) => {
    star.update();

    if (star.isOffScreen()) {
      stars.splice(starIndex, 1);
    }
  });

  if (spawnBullet === true) {
    bullets.push(new Bullet(weapon));
    spawnBullet = false;
  }

  player.show();
  weapon.show();
  jetpack.show();

  if (player.isGrounded() === false) {
    player.fall(gravity);
  }

  player.fly();

  if (player.flying === true) {
    gravity.y = 1;
  } else {
    gravity.y = 3;
  }

  obstacles.forEach((obstacle, obstacleIndex) => {
    obstacle.update();

    bullets.forEach((bullet, bulletIndex) => {
      let d = dist(
        bullet.location.x,
        bullet.location.y,
        obstacle.location.x,
        obstacle.location.y
      );

      if (d - obstacle.size / 2 - bullet.size / 2 < 1) {
        obstacles.splice(obstacleIndex, 1);
        bullets.splice(bulletIndex, 1);
        score += 5;
      }
    });

    if (obstacle.detectHit(player)) {
      console.log("player is hit");
      obstacles.splice(obstacleIndex, 1);
      player.health -= 10;
    }

    if (obstacle.offScreen()) {
      obstacles.splice(obstacle, 1);
      player.health -= 10;
    }
  });

  bullets.forEach((bullet, index) => {
    bullet.fire();

    if (bullet.rangeTraveled >= bullet.maxRange) {
      bullets.splice(index, 1);
    }
  });

  let gas = player.gas();

  noStroke();
  fill("blue");
  rect(width - 100, 0, 100, 80);
  textAlign(LEFT);
  fill("white");
  textSize(15);
  text("score: " + score, width - 90, 40);
  text("health: " + player.health, width - 90, 20);
  text("Gas: " + gas, width - 90, 60);
}

function keyPressed() {
  if (keyCode == 87 || keyCode == 32) {
    player.flying = true;
  }

  if (keyCode == ENTER) {
    spawnBullet = true;
  }
}

function keyReleased() {
  if (keyCode == 32 || keyCode == 87) {
    player.flying = false;
  }
}
