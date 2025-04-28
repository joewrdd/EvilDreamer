class SpriteSheet {
  constructor(src, width, height, frames) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
    this.frames = frames;
    this.frameIndex = 0;
    this.lastUpdate = Date.now();
    this.timePerFrame = 60;
  }

  reset() {
    this.frameIndex = 0;
    this.lastUpdate = Date.now();
  }

  update() {
    if (Date.now() - this.lastUpdate >= this.timePerFrame) {
      this.frameIndex = (this.frameIndex + 1) % this.frames;
      this.lastUpdate = Date.now();
    }
  }

  draw(ctx, x, y) {
    const frameWidth = this.width / this.frames;
    ctx.drawImage(
      this.image,
      this.frameIndex * frameWidth,
      0,
      frameWidth,
      this.height,
      x,
      y,
      frameWidth,
      this.height
    );
  }
}
function checkCollision(sprite1, sprite2) {
  return (
    sprite1.x < sprite2.x + sprite2.width &&
    sprite1.x + sprite1.width > sprite2.x &&
    sprite1.y < sprite2.y + sprite2.height &&
    sprite1.y + sprite1.height > sprite2.y
  );
}

class Menu extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  init() {
    let myBackground = new Background(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      "public/background/pinkBG.png"
    );
    let myGameTitle = new GameTitle(
      310,
      20,
      421,
      142,
      "public/theme/gamename.png"
    );
    let myButton = new Button(
      335,
      200,
      316,
      76,
      "public/theme/play.png",
      this.game,
      () => {
        this.game.changeLevel(1);
      }
    );
    let myButton2 = new Button(
      335,
      300,
      324,
      77,
      "public/theme/tutorial.png",
      this.game,
      () => {
        this.game.changeLevel(3);
      }
    );

    this.game.addSprite(myBackground);
    this.game.addSprite(myGameTitle);
    this.game.addSprite(myButton);
    this.game.addSprite(myButton2);
  }
}

class Level1 extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  init() {
    let myBackground = new Background(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      "public/background/platformer_background_1.png"
    );
    let myHero = new Hero(100, 410, this.game);
    let myEnemyGenerator = new EnemyGenerator(
      120,
      this.game.canvas.width,
      this.game.canvas.height,
      this.game
    );
    let myLives = new Lives(this.game);
    let myScore = new Score(this.game);

    this.game.addSprite(myBackground);
    this.game.addSprite(myHero);
    this.game.addSprite(myEnemyGenerator);
    this.game.addSprite(myLives);
    this.game.addSprite(myScore);
  }
}

class Level2 extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  init() {
    let myBackground = new Background(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      "public/background/platformer_background_1.png"
    );
    let myHero = new Hero(100, 410, this.game);
    let myEnemyGenerator2 = new EnemyGenerator2(
      80,
      this.game.canvas.width,
      this.game.canvas.height,
      this.game
    );
    let myLives = new Lives(this.game);
    let myScore = new Score(this.game);

    this.game.addSprite(myBackground);
    this.game.addSprite(myHero);
    this.game.addSprite(myEnemyGenerator2);
    this.game.addSprite(myLives);
    this.game.addSprite(myScore);
  }
}

class Tutorial extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  init() {
    let myBackground = new Background(
      0,
      0,
      this.game.canvas.width,
      this.game.canvas.height,
      "public/background/pinkBGTrans.png"
    );

    let tutorialTitle = new GameTitle(
      300,
      -60,
      380,
      250,
      "public/theme/howToPlay.png"
    );

    let controlsText = {
      items: [
        { key: "ARROW KEYS / A,D", action: "Move Left & Right" },
        { key: "SPACE", action: "Jump" },
        { key: "UP ARROW", action: "Shoot" },
        { key: "GOAL", action: "Defeat Enemies & Survive!" },
      ],
      x: 300,
      y: 160,
      lineHeight: 40,
      keyFont: "28px 'boorsok'",
      actionFont: "20px 'boorsok'",
      keyColor: "#FF69B4",
      actionColor: "#FFFFFF",
      draw: function (ctx) {
        ctx.save();

        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];
          const yPos = this.y + i * this.lineHeight;

          ctx.font = this.keyFont;
          ctx.fillStyle = this.keyColor;
          ctx.textAlign = "right";
          ctx.shadowColor = "rgb(0, 0, 0)";
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;
          ctx.fillText(item.key, this.x, yPos);

          ctx.font = this.actionFont;
          ctx.fillStyle = this.actionColor;
          ctx.textAlign = "left";
          ctx.fillText(" - " + item.action, this.x + 10, yPos);
        }

        ctx.restore();
      },
      update: function () {
        return false;
      },
    };

    let enemyText = {
      title: "ENEMY TYPES:",
      items: [
        { name: "Ground Enemy", desc: "Can Be Jumped On or Shot" },
        { name: "Flying Enemy", desc: "Shoots Bullets, Must Be Shot" },
        {
          name: "Cloud Platform",
          desc: "Shoots in All Directions When Activated",
        },
      ],
      x: 300,
      y: 320,
      lineHeight: 35,
      titleFont: "28px 'boorsok'",
      itemFont: "20px 'boorsok'",
      titleColor: "#FF69B4",
      nameColor: "#0CC0DF",
      descColor: "#FFFFFF",
      draw: function (ctx) {
        ctx.save();

        ctx.font = this.titleFont;
        ctx.fillStyle = this.titleColor;
        ctx.textAlign = "left";
        ctx.shadowColor = "rgb(0, 0, 0)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.fillText(this.title, this.x, this.y);

        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];
          const yPos = this.y + 30 + i * this.lineHeight;

          ctx.font = this.itemFont;
          ctx.fillStyle = this.nameColor;
          ctx.fillText("• " + item.name + ":", this.x, yPos);

          ctx.fillStyle = this.descColor;
          ctx.fillText(" " + item.desc, this.x + 180, yPos);
        }

        ctx.restore();
      },
      update: function () {
        return false;
      },
    };

    let backButton = new Button(
      400,
      450,
      160,
      90,
      "public/theme/return2.png",
      this.game,
      () => {
        this.game.changeLevel(0);
      }
    );

    this.game.addSprite(myBackground);
    this.game.addSprite(tutorialTitle);
    this.game.addSprite(controlsText);
    this.game.addSprite(enemyText);
    this.game.addSprite(backButton);
  }
}

class Button extends Sprite {
  constructor(x, y, width, height, image, game, onClick) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.game = game;
    this.onClick = onClick;
    this.isHovered = false;
  }

  update(sprites, keys) {
    const mouse = this.game.mouse;
    this.isHovered =
      mouse.x >= this.x &&
      mouse.x <= this.x + this.width &&
      mouse.y >= this.y &&
      mouse.y <= this.y + this.height;

    if (this.isHovered && mouse.clicked) {
      mouse.clicked = false;

      if (this.onClick) {
        this.onClick();
      }
    }

    return false;
  }

  draw(ctx) {
    if (this.isHovered) {
      ctx.globalAlpha = 0.8;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.globalAlpha = 1.0;
  }
}

class GameTitle extends Sprite {
  constructor(x, y, width, height, image) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
  }

  update(sprites, keys) {
    return false;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Hero extends Sprite {
  constructor(x, y, game) {
    super();
    this.x = x;
    this.y = y;
    this.game = game;
    this.speed = 1.5;
    this.verticalSpeed = 0;
    this.gravity = 0.3;
    this.jumpPower = -8;
    this.isJumping = false;
    this.grounded = true;
    this.groundLevel = 410;
    this.isShooting = false;
    this.shootCooldown = 0;
    this.isAlive = true;
    this.width = 32;
    this.height = 33;
    this.hurtTimer = 0;
    this.isHurt = false;
    this.jumpKillCooldown = 0;

    this.states = {
      idle: new SpriteSheet("public/hero/Pink_Monster_Idle_4.png", 128, 33, 4),
      running: new SpriteSheet(
        "public/hero/Pink_Monster_Run_6.png",
        192,
        33,
        6
      ),
      jumping: new SpriteSheet(
        "public/hero/Pink_Monster_Jump_8.png",
        256,
        33,
        8
      ),
      shooting: new SpriteSheet(
        "public/hero/Pink_Monster_Throw_4.png",
        128,
        33,
        4
      ),
      hurt: new SpriteSheet("public/hero/Pink_Monster_Hurt_4.png", 128, 33, 4),
      dead: new SpriteSheet("public/hero/Pink_Monster_Death_8.png", 256, 33, 8),
    };

    this.currentState = "idle";
  }

  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();

      if (state === "hurt") {
        this.isHurt = true;
        this.hurtTimer = 60;
      }
    }
  }

  update(sprites, keys) {
    if (!this.isAlive) {
      this.states[this.currentState].update();
      return false;
    }

    if (this.isHurt) {
      this.hurtTimer--;
      if (this.hurtTimer <= 0) {
        this.isHurt = false;
        this.setState("idle");
      }
    }

    if (this.jumpKillCooldown > 0) {
      this.jumpKillCooldown--;
    }

    if (keys[" "] && this.grounded) {
      this.verticalSpeed = this.jumpPower;
      this.grounded = false;
      this.isJumping = true;
      let jumpSound = new Audio("public/audio/jump.mp3");
      jumpSound.play();
    }

    this.verticalSpeed += this.gravity;
    this.y += this.verticalSpeed;

    let onCloudPlatform = false;
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (sprite instanceof CloudPlatform && !sprite.isRemoved) {
        if (
          this.y + this.height <= sprite.y + 5 &&
          this.y + this.height + this.verticalSpeed >= sprite.y &&
          this.x + this.width > sprite.x &&
          this.x < sprite.x + sprite.width
        ) {
          this.y = sprite.y - this.height;
          this.verticalSpeed = 0;
          this.grounded = true;
          this.isJumping = false;
          onCloudPlatform = true;
          break;
        }
      }
    }

    if (!onCloudPlatform && this.y >= this.groundLevel) {
      this.y = this.groundLevel;
      this.verticalSpeed = 0;
      this.grounded = true;
      this.isJumping = false;
    }

    if (keys["ArrowUp"] && this.shootCooldown == 0) {
      this.game.addSprite(new Rock(this.x + 20, this.y + 10, 16, 16, 1.5, 0));
      this.isShooting = true;
      this.shootCooldown = 20;
      let throwSound = new Audio("public/audio/shoot.mp3");
      throwSound.play();
    }

    if (this.shootCooldown > 0) {
      this.shootCooldown--;
      if (this.shootCooldown <= 15) {
        this.isShooting = false;
      }
    }

    let newState = "idle";
    if (this.isHurt) {
      newState = "hurt";
    } else if (this.isJumping) {
      newState = "jumping";
    } else if (
      keys["ArrowLeft"] ||
      keys["ArrowRight"] ||
      keys["a"] ||
      keys["d"]
    ) {
      newState = "running";
    } else if (this.isShooting) {
      newState = "shooting";
    }

    this.setState(newState);

    this.states[this.currentState].update();

    if (keys["ArrowLeft"] || keys["a"]) {
      this.x -= this.speed;
    }
    if (keys["ArrowRight"] || keys["d"]) {
      this.x += this.speed;
    }

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (sprite instanceof EnemyEasy && !sprite.isDead) {
        let scoreSprite = sprites.find((sprite) => sprite instanceof Score);
        if (checkCollision(this, sprite)) {
          if (
            this.verticalSpeed > 0 &&
            this.y + this.height < sprite.y + sprite.height / 2
          ) {
            sprite.isDead = true;
            sprite.setState("dead");
            this.verticalSpeed = this.jumpPower / 2;
            this.jumpKillCooldown = 10;
            scoreSprite.addScore(2);
            let killSound = new Audio("public/audio/jump.mp3");
            killSound.play();
          } else if (this.jumpKillCooldown === 0) {
            this.isAlive = false;
            this.setState("dead");
          }
          break;
        }
      } else if (
        (sprite instanceof FlyingEnemy && !sprite.isDead) ||
        (sprite instanceof FlyingEnemyBullet && !sprite.isRemoved)
      ) {
        if (checkCollision(this, sprite)) {
          this.isAlive = false;
          this.setState("dead");

          if (sprite instanceof FlyingEnemyBullet) {
            sprite.isRemoved = true;
          }
          break;
        }
      }
    }

    return false;
  }

  draw(ctx) {
    this.states[this.currentState].draw(ctx, this.x, this.y);
  }
}

class Background extends Sprite {
  constructor(x, y, width, height, image) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = image;
    this.speed = 0.5;
  }

  update() {
    if (this.image == "public/background/platformer_background_1.png") {
      this.x -= this.speed;
      if (this.x <= -this.width) {
        this.x = 0;
      }
    } else {
      return;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width - 1,
      this.y,
      this.width,
      this.height
    );
  }
}

class Rock extends Sprite {
  constructor(x, y, width, height, speedX, speedY = 0) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.image = new Image();
    this.image.src = "public/hero/Rock2.png";
    this.isRemoved = false;
  }

  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > 960 || this.x < 0 || this.y > 540 || this.y < 0) {
      return true;
    }

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (
        (sprite instanceof EnemyEasy && !sprite.isDead) ||
        (sprite instanceof FlyingEnemy && !sprite.isDead) ||
        (sprite instanceof FlyingEnemyBullet && !sprite.isRemoved) ||
        (sprite instanceof Boss1Enemy && !sprite.isDead)
      ) {
        let scoreSprite = sprites.find((sprite) => sprite instanceof Score);
        if (checkCollision(this, sprite)) {
          if (sprite instanceof EnemyEasy) {
            sprite.isDead = true;
            sprite.setState("dead");
            scoreSprite.addScore(1);
          } else if (sprite instanceof FlyingEnemy) {
            sprite.isDead = true;
            sprite.setState("dead");
            scoreSprite.addScore(2);
          } else if (sprite instanceof Boss1Enemy) {
            sprite.health -= 1;
            if (sprite.health <= 0) {
              sprite.isDead = true;
              sprite.setState("dead");
              scoreSprite.addScore(15);
              let bossDeathSound = new Audio("public/audio/bossDeath.mp3");
              bossDeathSound.play();
            } else {
              if (sprite.health % 5 === 0) {
                // TODO: Add Sound
                let bossHitSound = new Audio("public/audio/boss-hit.mp3");
                bossHitSound.play();
              }
            }
          } else {
            sprite.isRemoved = true;
          }
          this.isRemoved = true;
          break;
        }
      }
    }

    return false;
  }

  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

class EnemyEasy extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.isDead = false;
    this.isRemoved = false;
    this.states = {
      walking: new SpriteSheet("public/enemy/enemyEasy.png", 132, 33, 4),
      dead: new SpriteSheet("public/enemy/enemyEasyDead.png", 144, 33, 4),
    };
    this.currentState = "walking";
  }

  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();
    }
  }

  update(sprites, keys) {
    this.x += this.speed;
    this.states[this.currentState].update();

    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }

    if (this.isDead) {
      return false;
    }

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (
        sprite instanceof Rock &&
        !sprite.isRemoved &&
        checkCollision(this, sprite)
      ) {
        this.isDead = true;
        this.setState("dead");
        sprite.isRemoved = true;
        break;
      }
    }

    return false;
  }

  draw(ctx) {
    this.states[this.currentState].draw(ctx, this.x, this.y);
  }
}

class FlyingEnemy extends Sprite {
  constructor(x, y, width, height, speed, game) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.autoShoot = false;
    this.shootCooldown = 60;
    this.game = game;
    this.isDead = false;
    this.isRemoved = false;

    this.states = {
      flying: new SpriteSheet("public/enemy/flyingEnemy.png", 474, 16, 12),
      shooting: new SpriteSheet(
        "public/enemy/flyingEnemyAttack.png",
        114,
        15,
        4
      ),
      dead: new SpriteSheet("public/enemy/FlyingDeadEnemy.png", 97, 48, 3),
    };

    this.states.dead.timePerFrame = 200;
    this.currentState = "flying";
  }

  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();
    }
  }

  update(sprites, keys) {
    this.x += this.speed;
    this.states[this.currentState].update();

    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }

    if (this.isDead) {
      return false;
    }

    if (
      this.currentState === "shooting" &&
      this.states[this.currentState].frameIndex ===
        this.states[this.currentState].frames - 1
    ) {
      this.setState("flying");
    }

    if (this.shootCooldown > 0) {
      this.shootCooldown--;
    }

    if (this.shootCooldown === 0 && !this.isDead) {
      this.autoShoot = true;
      this.shootCooldown = 500;

      this.game.addSprite(
        new FlyingEnemyBullet(
          this.x + this.width / 2 - 6,
          this.y + this.height,
          12,
          16.5,
          -1
        )
      );
      this.setState("shooting");
    }

    return false;
  }

  draw(ctx) {
    this.states[this.currentState].draw(ctx, this.x, this.y);
  }
}

class FlyingEnemyBullet extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 16.5;
    this.speedX = speed;
    this.speedY = 0.5;
    this.image = new Image();
    this.image.src = "public/enemy/flyingBullet.png";
    this.isRemoved = false;
  }

  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > 960 || this.y < 0 || this.y > 540) {
      return true;
    }

    let hero = null;
    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i] instanceof Hero) {
        hero = sprites[i];
        break;
      }
    }

    if (hero && hero.isAlive) {
      const bulletBox = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      };

      const heroBox = {
        x: hero.x,
        y: hero.y,
        width: 32,
        height: 33,
      };

      if (checkCollision(bulletBox, heroBox)) {
        hero.isAlive = false;
        hero.setState("dead");
        this.isRemoved = true;
        return true;
      }
    }

    return false;
  }

  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

class Boss1Enemy extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.isDead = false;
    this.isRemoved = false;
    this.states = {
      walking: new SpriteSheet(
        "public/bossDragon/bossWalkDragon.png",
        1290,
        258,
        5
      ),
      shooting: new SpriteSheet(
        "public/bossDragon/bossAttackDragon.png",
        1032,
        258,
        4
      ),
      dead: new SpriteSheet(
        "public/bossDragon/bossDeathDragon.png",
        1290,
        258,
        5
      ),
      idle: new SpriteSheet(
        "public/bossDragon/bossIdleDragon.png",
        774,
        258,
        3
      ),
    };
    this.currentState = "walking";
    this.initialX = x;
    this.walkDistance = 250;
    this.attackCooldown = 0;
    this.attackInterval = 400;
    this.health = 100;
    this.maxHealth = 100;
    this.game = null;
    this.hitFlashTimer = 0;
    this.flameSpawnTimer = 0;
    this.flameSpawnInterval = 15;
    this.flameSpawnPositions = [100, 300, 500];
    this.currentFlamePosition = 0;
    this.hasSpawnedFlame = false;
  }

  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();

      if (state === "shooting") {
        this.flameSpawnTimer = 0;
        this.hasSpawnedFlame = false;
      }
    }
  }

  update(sprites, keys) {
    this.states[this.currentState].update();

    if (!this.game) {
      for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] instanceof Hero) {
          this.game = sprites[i].game;
          break;
        }
      }
    }

    if (this.hitFlashTimer > 0) {
      this.hitFlashTimer--;
    }

    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }

    if (this.isDead) {
      return false;
    }

    if (this.currentState === "walking") {
      this.x += this.speed;

      if (this.initialX - this.x >= this.walkDistance) {
        this.setState("idle");
      }
    } else if (this.currentState === "idle") {
      if (this.attackCooldown > 0) {
        this.attackCooldown--;
      } else {
        this.setState("shooting");
        this.attackCooldown = this.attackInterval;
      }
    } else if (this.currentState === "shooting") {
      if (this.game && this.flameSpawnTimer <= 0 && !this.hasSpawnedFlame) {
        this.spawnSkyFlame();
        this.hasSpawnedFlame = true;
      } else {
        this.flameSpawnTimer--;
      }

      if (
        this.states[this.currentState].frameIndex ===
        this.states[this.currentState].frames - 1
      ) {
        this.setState("idle");
      }
    }

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (
        sprite instanceof Rock &&
        !sprite.isRemoved &&
        checkCollision(this, sprite)
      ) {
        this.hitFlashTimer = 10;
        sprite.isRemoved = true;
      }

      if (
        sprite instanceof Hero &&
        sprite.isAlive &&
        checkCollision(this, sprite)
      ) {
        sprite.isAlive = false;
        sprite.setState("dead");
      }
    }

    if (
      this.isBossFight &&
      this.bossSpawned &&
      this.game.levelIndex === 1 &&
      !this.game.sprites.some((sprite) => sprite instanceof Boss1Enemy)
    ) {
      this.game.changeLevel(2);
    }

    return false;
  }

  spawnSkyFlame() {
    if (!this.game) return;

    const spawnX = this.flameSpawnPositions[this.currentFlamePosition];

    this.currentFlamePosition =
      (this.currentFlamePosition + 1) % this.flameSpawnPositions.length;

    this.game.addSprite(new SkyFlame(spawnX, 0, 143, 75, 1.5));

    // TODO: Add Sound
    let flameSound = new Audio("public/audio/flame.mp3");
    flameSound.volume = 0.3;
    flameSound.play();
  }

  draw(ctx) {
    if (this.hitFlashTimer > 0) {
      ctx.globalAlpha = 0.7;
      ctx.globalCompositeOperation = "lighter";
      this.states[this.currentState].draw(ctx, this.x, this.y);
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = "source-over";
    } else {
      this.states[this.currentState].draw(ctx, this.x, this.y);
    }

    if (!this.isDead) {
      const barWidth = 400;
      const barHeight = 30;
      const healthPercent = this.health / this.maxHealth;

      const barX = this.game.canvas.width / 2 - barWidth / 2;
      const barY = 20;

      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(barX, barY, barWidth, barHeight);
      ctx.fillStyle = "#FF69B4";
      ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.strokeRect(barX, barY, barWidth, barHeight);

      ctx.font = "20px 'boorsok'";
      ctx.fillStyle = "#FF69B4";
      ctx.textAlign = "right";
      ctx.fillText("BOSS 1 ", barX - 10, barY + 22);

      ctx.shadowBlur = 0;
      ctx.textAlign = "left";
    }
  }
}

class Boss2Enemy extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.isDead = false;
    this.isRemoved = false;
    this.states = {
      walking: new SpriteSheet(
        "public/bossDemonLord/bossDemonWalk.png",
        1548,
        258,
        6
      ),
      shooting: new SpriteSheet(
        "public/bossDemonLord/bossDemonAttack.png",
        1032,
        258,
        4
      ),
      dead: new SpriteSheet(
        "public/bossDemonLord/bossDemonDeath.png",
        1548,
        258,
        6
      ),
      idle: new SpriteSheet(
        "public/bossDemonLord/bossDemonIdle.png",
        774,
        258,
        3
      ),
    };
    this.currentState = "walking";
    this.initialX = x;
    this.walkDistance = 250;
    this.attackCooldown = 0;
    this.attackInterval = 400;
    this.health = 200;
    this.maxHealth = 200;
    this.game = null;
    this.laserSpawned = false;
    this.laserY = this.y + 110;
  }

  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();
      if (state === "shooting") {
        this.laserSpawned = false;
      }
    }
  }

  update(sprites, keys) {
    this.states[this.currentState].update();
    if (!this.game) {
      for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] instanceof Hero) {
          this.game = sprites[i].game;
          break;
        }
      }
    }
    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }
    if (this.isDead) {
      return false;
    }
    if (this.currentState === "walking") {
      this.x += this.speed;
      if (this.initialX - this.x >= this.walkDistance) {
        this.setState("idle");
      }
    } else if (this.currentState === "idle") {
      if (this.attackCooldown > 0) {
        this.attackCooldown--;
      } else {
        this.setState("shooting");
        this.attackCooldown = this.attackInterval;
      }
    } else if (this.currentState === "shooting") {
      if (!this.laserSpawned && this.game) {
        this.spawnLaser();
        this.laserSpawned = true;
      }
      if (
        this.states[this.currentState].frameIndex ===
        this.states[this.currentState].frames - 1
      ) {
        this.setState("idle");
      }
    }
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (
        sprite instanceof Rock &&
        !sprite.isRemoved &&
        checkCollision(this, sprite)
      ) {
        sprite.isRemoved = true;
        this.health -= 1;
        if (this.health <= 0) {
          this.isDead = true;
          this.setState("dead");
        }
      }
      if (
        sprite instanceof Hero &&
        sprite.isAlive &&
        checkCollision(this, sprite)
      ) {
        sprite.isAlive = false;
        sprite.setState("dead");
      }
    }
    return false;
  }

  spawnLaser() {
    const laserX = this.x - 240 + 120;
    const laserY = this.y + 90;
    this.game.addSprite(new Boss2Laser(laserX, laserY, 240, 138, -1));
    let laserSound = new Audio("public/audio/laser.mp3");
    laserSound.volume = 0.4;
    laserSound.play();
  }

  draw(ctx) {
    this.states[this.currentState].draw(ctx, this.x, this.y);
    if (!this.isDead) {
      const barWidth = 400;
      const barHeight = 30;
      const healthPercent = this.health / this.maxHealth;
      const barX = this.game.canvas.width / 2 - barWidth / 2;
      const barY = 20;
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(barX, barY, barWidth, barHeight);
      ctx.fillStyle = "#FF69B4";
      ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.strokeRect(barX, barY, barWidth, barHeight);
      ctx.font = "20px 'boorsok'";
      ctx.fillStyle = "#FF69B4";
      ctx.textAlign = "right";
      ctx.fillText("BOSS 2", barX - 10, barY + 22);
      ctx.shadowBlur = 0;
      ctx.textAlign = "left";
    }
  }
}

class Boss2Laser extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speed;
    this.image = new Image();
    this.image.src = "public/bossDemonLord/demonLaser.png";
    this.isRemoved = false;
  }

  update(sprites, keys) {
    if (this.isRemoved) return true;
    this.x += this.speedX;
    if (this.x > 960) return true;
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (sprite instanceof Hero && sprite.isAlive) {
        if (checkCollision(this, sprite)) {
          sprite.isAlive = false;
          sprite.setState("dead");
          this.isRemoved = true;
          return true;
        }
      }
    }
    return false;
  }

  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

class CloudPlatform extends Sprite {
  constructor(x, y, speed, game) {
    super();
    this.x = x;
    this.y = y;
    this.width = 145;
    this.height = 21;
    this.speed = speed;
    this.game = game;
    this.isActive = false;
    this.activationTimer = 0;
    this.isRemoved = false;
    this.hasTriggered = false;
    this.sprite = new SpriteSheet(
      "public/platforms/cloudplatform.png",
      145,
      21,
      4
    );
  }

  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    this.x += this.speed;

    if (this.x < -this.width) {
      return true;
    }

    let hero = sprites.find((sprite) => sprite instanceof Hero);

    if (hero && hero.isAlive && !this.hasTriggered) {
      const heroBottom = hero.y + hero.height;
      const platformTop = this.y;

      if (
        Math.abs(heroBottom - platformTop) < 10 &&
        hero.x + hero.width > this.x &&
        hero.x < this.x + this.width &&
        hero.verticalSpeed >= 0
      ) {
        hero.y = this.y - hero.height;
        hero.verticalSpeed = 0;
        hero.grounded = true;

        if (!this.isActive) {
          this.isActive = true;
          this.activationTimer = 70;
        }
      }
    }

    if (this.isActive) {
      this.activationTimer--;

      if (this.activationTimer <= 0 && !this.hasTriggered) {
        this.shootRocksInAllDirections();
        this.hasTriggered = true;
        this.isRemoved = true;
      }
    }

    return false;
  }

  shootRocksInAllDirections() {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    this.game.addSprite(new Rock(centerX - 10, centerY, 16, 16, -0.3, -1.5));
    this.game.addSprite(new Rock(centerX, centerY, 16, 16, 0, -1.5));
    this.game.addSprite(new Rock(centerX + 10, centerY, 16, 16, 0.3, -1.5));

    this.game.addSprite(new Rock(centerX - 10, centerY, 16, 16, -0.3, 1.5));
    this.game.addSprite(new Rock(centerX, centerY, 16, 16, 0, 1.5));
    this.game.addSprite(new Rock(centerX + 10, centerY, 16, 16, 0.3, 1.5));

    this.game.addSprite(new Rock(centerX, centerY - 10, 16, 16, -1.5, -0.3));
    this.game.addSprite(new Rock(centerX, centerY, 16, 16, -1.5, 0));
    this.game.addSprite(new Rock(centerX, centerY + 10, 16, 16, -1.5, 0.3));

    this.game.addSprite(new Rock(centerX, centerY - 10, 16, 16, 1.5, -0.3));
    this.game.addSprite(new Rock(centerX, centerY, 16, 16, 1.5, 0));
    this.game.addSprite(new Rock(centerX, centerY + 10, 16, 16, 1.5, 0.3));
  }

  draw(ctx) {
    if (!this.isRemoved) {
      this.sprite.draw(ctx, this.x, this.y);
    }
  }
}

class EnemyGenerator extends Sprite {
  constructor(spawnInterval, canvasWidth, canvasHeight, game) {
    super();
    this.spawnInterval = 240;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.counter = 0;
    this.game = game;
    this.groundSpawnPoints = [
      { x: canvasWidth, y: 410, speed: -1 },
      { x: canvasWidth, y: 410, speed: -1 },
      { x: canvasWidth + 2000, y: 410, speed: -1.15 },
    ];
    this.airSpawnPoints = [
      { x: canvasWidth, y: 150, speed: -1 },
      { x: canvasWidth, y: 250, speed: -1.25 },
      { x: canvasWidth + 300, y: 250, speed: -1.2 },
    ];
    this.bossSpawnPoint = { x: canvasWidth, y: 250, speed: -0.3 };
    this.currentGroundPoint = 0;
    this.currentAirPoint = 0;
    this.spawnCounter = 0;
    this.cloudPlatformTimer = 600;
    this.isBossFight = false;
    this.bossSpawned = false;
    this.clearEnemiesTimer = 0;
  }

  update(sprites, keys) {
    let scoreSprite = sprites.find((sprite) => sprite instanceof Score);
    let score = scoreSprite ? scoreSprite.score : 0;

    if (score >= 5 && !this.bossSpawned) {
      this.isBossFight = true;
      this.bossSpawned = true;
      this.clearEnemiesTimer = 180;

      let bossWarningSound = new Audio("public/audio/boss-warning.mp3");
      bossWarningSound.play();

      return false;
    }

    if (this.isBossFight && this.clearEnemiesTimer > 0) {
      this.clearEnemiesTimer--;

      if (this.clearEnemiesTimer === 0) {
        for (let i = 0; i < sprites.length; i++) {
          if (
            sprites[i] instanceof EnemyEasy ||
            sprites[i] instanceof FlyingEnemy ||
            sprites[i] instanceof FlyingEnemyBullet ||
            sprites[i] instanceof CloudPlatform
          ) {
            sprites[i].isRemoved = true;
          }
        }

        this.game.addSprite(
          new Boss1Enemy(
            this.bossSpawnPoint.x,
            this.bossSpawnPoint.y,
            1290,
            258,
            this.bossSpawnPoint.speed
          )
        );

        let bossMusic = new Audio("public/audio/boss-music.mp3");
        bossMusic.loop = true;
        bossMusic.play();
      }

      return false;
    }

    if (!this.isBossFight) {
      this.counter++;
      if (this.counter >= this.spawnInterval) {
        this.counter = 0;
        this.spawnCounter++;

        this.spawnGroundEnemy();

        if (this.spawnCounter % 2 == 0) {
          this.spawnFlyingEnemy();
        }
      }

      this.cloudPlatformTimer--;
      if (this.cloudPlatformTimer <= 0) {
        this.spawnCloudPlatform();
        this.cloudPlatformTimer = 900 + Math.floor(Math.random() * 900);
      }
    }

    if (
      this.isBossFight &&
      this.bossSpawned &&
      this.game.levelIndex === 1 &&
      !this.game.sprites.some((sprite) => sprite instanceof Boss1Enemy)
    ) {
      this.game.changeLevel(2);
    }

    return false;
  }

  spawnGroundEnemy() {
    let spawnPoint = this.groundSpawnPoints[this.currentGroundPoint];
    this.game.addSprite(
      new EnemyEasy(spawnPoint.x, spawnPoint.y, 32, 32, spawnPoint.speed)
    );
    this.currentGroundPoint =
      (this.currentGroundPoint + 1) % this.groundSpawnPoints.length;
  }

  spawnFlyingEnemy() {
    let spawnPoint = this.airSpawnPoints[this.currentAirPoint];
    this.game.addSprite(
      new FlyingEnemy(
        spawnPoint.x,
        spawnPoint.y,
        39.5,
        16,
        spawnPoint.speed,
        this.game
      )
    );
    this.currentAirPoint =
      (this.currentAirPoint + 1) % this.airSpawnPoints.length;
  }

  spawnCloudPlatform() {
    const yPosition = 330 + Math.floor(Math.random() * 50);
    this.game.addSprite(
      new CloudPlatform(this.canvasWidth, yPosition, -1, this.game)
    );
  }

  draw(ctx) {}
}

class EnemyGenerator2 extends Sprite {
  constructor(spawnInterval, canvasWidth, canvasHeight, game) {
    super();
    this.spawnInterval = 160;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.counter = 0;
    this.game = game;
    this.groundSpawnPoints = [
      { x: canvasWidth, y: 410, speed: -1.3 },
      { x: canvasWidth, y: 410, speed: -1.5 },
      { x: canvasWidth + 1000, y: 410, speed: -1.7 },
    ];
    this.airSpawnPoints = [
      { x: canvasWidth, y: 120, speed: -1.5 },
      { x: canvasWidth, y: 200, speed: -1.7 },
      { x: canvasWidth + 300, y: 250, speed: -1.6 },
    ];
    this.bossSpawnPoint = { x: canvasWidth, y: 260, speed: -0.5 };
    this.currentGroundPoint = 0;
    this.currentAirPoint = 0;
    this.spawnCounter = 0;
    this.isBossFight = false;
    this.bossSpawned = false;
    this.clearEnemiesTimer = 0;
    this.bossWarningText = null;
  }

  update(sprites, keys) {
    let scoreSprite = sprites.find((sprite) => sprite instanceof Score);
    let score = scoreSprite ? scoreSprite.score : 0;

    if (score >= 10 && !this.bossSpawned) {
      this.isBossFight = true;
      this.bossSpawned = true;
      this.clearEnemiesTimer = 400;

      let bossWarningSound = new Audio("public/audio/boss-warning.mp3");
      bossWarningSound.play();
      this.bossWarningText = {
        text: "DEMON LORD APPROACHES!",
        x: this.game.canvas.width / 2,
        y: this.game.canvas.height / 2 - 50,
        font: "50px 'boorsok'",
        color: "#FF69B4",
        draw: function (ctx) {
          ctx.save();
          ctx.font = this.font;
          ctx.fillStyle = this.color;
          ctx.textAlign = "center";
          ctx.shadowColor = "black";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetX = 3;
          ctx.shadowOffsetY = 3;
          ctx.fillText(this.text, this.x, this.y);
          ctx.restore();
        },
      };
      return false;
    }

    if (this.isBossFight && this.clearEnemiesTimer > 0) {
      this.clearEnemiesTimer--;
      if (this.clearEnemiesTimer === 0) {
        for (let i = 0; i < sprites.length; i++) {
          if (
            sprites[i] instanceof EnemyEasy ||
            sprites[i] instanceof FlyingEnemy ||
            sprites[i] instanceof FlyingEnemyBullet ||
            sprites[i] instanceof CloudPlatform
          ) {
            sprites[i].isRemoved = true;
          }
        }
        this.game.addSprite(
          new Boss2Enemy(
            this.bossSpawnPoint.x,
            this.bossSpawnPoint.y,
            1548,
            258,
            this.bossSpawnPoint.speed
          )
        );
        let bossMusic = new Audio("public/audio/boss-music.mp3");
        bossMusic.loop = true;
        bossMusic.play();
        this.bossWarningText = null;
      }
      return false;
    }

    if (!this.isBossFight) {
      this.counter++;
      if (this.counter >= this.spawnInterval) {
        this.counter = 0;
        this.spawnCounter++;
        this.spawnGroundEnemy();
        if (this.spawnCounter % 2 === 0) {
          this.spawnFlyingEnemy();
        }
      }
    }
    return false;
  }

  spawnGroundEnemy() {
    let spawnPoint = this.groundSpawnPoints[this.currentGroundPoint];
    this.game.addSprite(
      new EnemyEasy(spawnPoint.x, spawnPoint.y, 32, 32, spawnPoint.speed)
    );
    this.currentGroundPoint =
      (this.currentGroundPoint + 1) % this.groundSpawnPoints.length;
  }

  spawnFlyingEnemy() {
    let spawnPoint = this.airSpawnPoints[this.currentAirPoint];
    this.game.addSprite(
      new FlyingEnemy(
        spawnPoint.x,
        spawnPoint.y,
        39.5,
        16,
        spawnPoint.speed,
        this.game
      )
    );
    this.currentAirPoint =
      (this.currentAirPoint + 1) % this.airSpawnPoints.length;
  }

  draw(ctx) {
    if (this.bossWarningText) {
      this.bossWarningText.draw(ctx);
    }
  }
}

class Lives extends Sprite {
  constructor(game) {
    super();
    this.game = game;
    this.lives = 5;
    this.livesImages = {
      5: new Image(),
      4: new Image(),
      3: new Image(),
      2: new Image(),
      1: new Image(),
      0: new Image(),
    };
    this.livesImages[5].src = "public/lives/100-percent.png";
    this.livesImages[4].src = "public/lives/75-percent.png";
    this.livesImages[3].src = "public/lives/50-percent.png";
    this.livesImages[2].src = "public/lives/25-percent.png";
    this.livesImages[1].src = "public/lives/0-percent.png";
    this.livesImages[0].src = "public/lives/0-percent.png";
    this.width = 35;
    this.height = 35;
    this.x = this.game.canvas.width - this.width - 10;
    this.y = 10;
  }

  update(sprites, keys) {
    let hero = sprites.find((sprite) => sprite instanceof Hero);
    if (hero && !hero.isAlive && this.lives > 0) {
      this.lives--;
      hero.isAlive = true;
      hero.setState("hurt");
      hero.x = 100;
      hero.y = 410;

      for (let i = 0; i < sprites.length; i++) {
        if (
          sprites[i] instanceof EnemyEasy ||
          sprites[i] instanceof FlyingEnemy ||
          sprites[i] instanceof FlyingEnemyBullet
        ) {
          sprites[i].isRemoved = true;
        }
      }
    }
    return false;
  }

  draw(ctx) {
    ctx.drawImage(
      this.livesImages[this.lives],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

class Score extends Sprite {
  constructor(game) {
    super();
    this.game = game;
    this.score = 0;
    this.color = "#FF69B4";
    this.fontSize = 24;
    this.font = this.fontSize + "px 'boorsok'";
    this.x = 20;
    this.y = 35;
  }

  addScore(points) {
    this.score += points;
  }

  update(sprites, keys) {
    return false;
  }

  draw(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;

    ctx.shadowColor = "rgb(0, 0, 0)";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillText("SCORE: " + this.score, this.x, this.y);

    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }
}

class SkyFlame extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = 143;
    this.height = 75;
    this.speedY = speed;
    this.image = new Image();
    this.image.src = "public/bossDragon/randomskyflames.png";
    this.isRemoved = false;
  }

  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    this.y += this.speedY;

    if (this.y > 540) {
      return true;
    }

    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (sprite instanceof Hero && sprite.isAlive) {
        if (checkCollision(this, sprite)) {
          sprite.isAlive = false;
          sprite.setState("dead");
          this.isRemoved = true;
          return true;
        }
      }
    }

    return false;
  }

  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

let myGame = new Game();

myGame.addLevel(new Menu(myGame));
myGame.addLevel(new Level1(myGame));
myGame.addLevel(new Level2(myGame));
myGame.addLevel(new Tutorial(myGame));

myGame.animate();
