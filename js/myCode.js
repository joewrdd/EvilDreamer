// Reusable SpriteSheet Class For All Sprites
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

  // Reset Sprite Animation
  reset() {
    this.frameIndex = 0;
    this.lastUpdate = Date.now();
  }

  // Update Sprite Animation
  update() {
    if (Date.now() - this.lastUpdate >= this.timePerFrame) {
      this.frameIndex = (this.frameIndex + 1) % this.frames;
      this.lastUpdate = Date.now();
    }
  }

  // Draw Sprite On Canvas
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

// Function To Check For Sprite Collisions
function checkCollision(sprite1, sprite2) {
  return (
    sprite1.x < sprite2.x + sprite2.width &&
    sprite1.x + sprite1.width > sprite2.x &&
    sprite1.y < sprite2.y + sprite2.height &&
    sprite1.y + sprite1.height > sprite2.y
  );
}

// Main Menu Level
class Menu extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  // Initialize Main Menu Level With Background, Game Title, Play Button, And Tutorial Button
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

// First Game Level
class Level1 extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  // Initialize First Game Level With Background, Hero, Enemy Generator, Lives, Score, And Game Controls
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
    let gameControls = new GameControls(this.game);

    this.game.addSprite(myBackground);
    this.game.addSprite(myHero);
    this.game.addSprite(myEnemyGenerator);
    this.game.addSprite(myLives);
    this.game.addSprite(myScore);
    this.game.addSprite(gameControls);
  }
}

// Second Game Level
class Level2 extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  // Initialize Second Game Level With Background, Hero, Enemy Generator, Lives, Score, And Game Controls
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
    let gameControls = new GameControls(this.game);

    this.game.addSprite(myBackground);
    this.game.addSprite(myHero);
    this.game.addSprite(myEnemyGenerator2);
    this.game.addSprite(myLives);
    this.game.addSprite(myScore);
    this.game.addSprite(gameControls);
  }
}

// Tutorial Level
class Tutorial extends Level {
  constructor(game) {
    super(game);
    this.game = game;
  }

  // Initialize Tutorial Level With Background, Game Title, Controls Text, Enemy Types Text, Win Text, And Back Button
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
        { key: "P", action: "Pause the Game" },
        { key: "C", action: "Continue (Unpause)" },
        { key: "R", action: "Restart Level" },
      ],
      x: 220,
      y: 140,
      lineHeight: 24,
      keyFont: "16px 'boorsok'",
      actionFont: "13px 'boorsok'",
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
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 1;
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
        { name: "Boss 1 (The Dragon) ", desc: "Shoots Raining Flames" },
        {
          name: "Boss 2 (The Demon Lord)",
          desc: "Shoots Long Laser That Can't Be Avoided Easily",
        },
        {
          name: "Cloud Platform",
          desc: "Shoots in All Directions When Activated",
        },
        { name: "Stair Platform", desc: "Collect Key & Gain Longer Jumps" },
      ],
      x: 220,
      y:
        controlsText.y +
        controlsText.items.length * controlsText.lineHeight +
        20,
      lineHeight: 20,
      titleFont: "18px 'boorsok'",
      itemFont: "13px 'boorsok'",
      titleColor: "#FF69B4",
      nameColor: "#0CC0DF",
      descColor: "#FFFFFF",
      draw: function (ctx) {
        ctx.save();
        ctx.font = this.titleFont;
        ctx.fillStyle = this.titleColor;
        ctx.textAlign = "left";
        ctx.shadowColor = "rgb(0, 0, 0)";
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText(this.title, this.x, this.y);
        for (let i = 0; i < this.items.length; i++) {
          const item = this.items[i];
          const yPos = this.y + 35 + i * this.lineHeight;
          ctx.font = this.itemFont;
          ctx.fillStyle = this.nameColor;
          const nameText = "• " + item.name + ":";
          ctx.fillText(nameText, this.x, yPos);
          const nameWidth = ctx.measureText(nameText).width;
          ctx.fillStyle = this.descColor;
          ctx.fillText(item.desc, this.x + nameWidth + 10, yPos);
        }
        ctx.restore();
      },
      update: function () {
        return false;
      },
    };

    let winText = {
      x: 220,
      y: enemyText.y + enemyText.items.length * enemyText.lineHeight + 30,
      draw: function (ctx) {
        ctx.save();
        ctx.font = "14px 'boorsok'";
        ctx.fillStyle = "#FF69B4";
        ctx.textAlign = "left";
        ctx.shadowColor = "rgb(0, 0, 0)";
        ctx.shadowBlur = 2;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.fillText(
          "To win Level 2: Collect the key to gain Long Jump power,",
          this.x,
          this.y
        );
        ctx.fillText(
          "then use it to defeat Boss 2 and complete the game!",
          this.x,
          this.y + 18
        );
        ctx.restore();
      },
      update: function () {
        return false;
      },
    };

    let backButton = new Button(
      720,
      450,
      160,
      90,
      "public/theme/return2.png",
      this.game,
      () => {
        this.game.changeLevel(0);
      }
    );

    let gameControls = new GameControls(this.game);

    this.game.addSprite(myBackground);
    this.game.addSprite(tutorialTitle);
    this.game.addSprite(controlsText);
    this.game.addSprite(enemyText);
    this.game.addSprite(winText);
    this.game.addSprite(backButton);
    this.game.addSprite(gameControls);
  }
}

// Button Class
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

  // Update Button State Based On Mouse Position
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

  // Draw Button On Canvas
  draw(ctx) {
    if (this.isHovered) {
      ctx.globalAlpha = 0.8;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.globalAlpha = 1.0;
  }
}

// Game Title Class
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

  // Update Game Title State
  update(sprites, keys) {
    return false;
  }

  // Draw Game Title On Canvas
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

// Hero Class
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
    this.hasLongJump = false;

    // Initialize Hero States With Sprite Sheets
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
      climb: new SpriteSheet(
        "public/hero/Pink_Monster_Climb_4.png",
        128,
        32,
        4
      ),
    };

    this.currentState = "idle";
  }

  // Set Hero State
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

  // Update Hero State
  update(sprites, keys) {
    // If Hero Is Dead, Update Animation
    if (!this.isAlive) {
      this.states[this.currentState].update();
      return false;
    }

    // If Hero Is Hurt, Update Hurt Timer
    if (this.isHurt) {
      this.hurtTimer--;
      if (this.hurtTimer <= 0) {
        this.isHurt = false;
        this.setState("idle");
      }
    }

    // If Hero Is Jumping, Update Jump Kill Cooldown
    if (this.jumpKillCooldown > 0) {
      this.jumpKillCooldown--;
    }

    // If Hero Is Jumping, Update Jump Power And Move Speed
    let jumpPower = this.hasLongJump ? -16 : this.jumpPower;
    let moveSpeed = this.hasLongJump ? 3 : this.speed;

    // If Hero Is Jumping, Update Jump Power And Move Speed
    if (keys[" "] && this.grounded) {
      this.verticalSpeed = jumpPower;
      this.grounded = false;
      this.isJumping = true;
      let jumpSound = new Audio("public/audio/jump.mp3");
      jumpSound.play();
    }

    // Update Hero Vertical Speed And Position
    this.verticalSpeed += this.gravity;
    this.y += this.verticalSpeed;

    // Check If Hero Is On Cloud Platform
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

    // If Hero Is Not On Cloud Platform And Is On Ground, Update Hero Position
    if (!onCloudPlatform && this.y >= this.groundLevel) {
      this.y = this.groundLevel;
      this.verticalSpeed = 0;
      this.grounded = true;
      this.isJumping = false;
    }

    // If Hero Is Shooting, Update Shoot Cooldown
    if (keys["ArrowUp"] && this.shootCooldown == 0) {
      this.game.addSprite(new Rock(this.x + 20, this.y + 10, 16, 16, 1.5, 0));
      this.isShooting = true;
      this.shootCooldown = 20;
      let throwSound = new Audio("public/audio/shoot.mp3");
      throwSound.play();
    }

    // If Hero Is Shooting, Update Shoot Cooldown
    if (this.shootCooldown > 0) {
      this.shootCooldown--;
      if (this.shootCooldown <= 15) {
        this.isShooting = false;
      }
    }

    // If Hero Is Hurt, Update Hurt State
    let newState = "idle";
    if (this.isHurt) {
      newState = "hurt";
    } else if (this.isJumping) {
      // If Hero Is Jumping, Update Jump State
      newState = "jumping";
    } else if (
      keys["ArrowLeft"] ||
      keys["ArrowRight"] ||
      keys["a"] ||
      keys["d"]
    ) {
      // If Hero Is Running, Update Running State
      newState = "running";
    } else if (this.isShooting) {
      // If Hero Is Shooting, Update Shooting State
      newState = "shooting";
    }

    // Set Hero State
    this.setState(newState);

    // Update Hero Animation
    this.states[this.currentState].update();

    // If Hero Is Moving Left, Update Hero Position
    if (keys["ArrowLeft"] || keys["a"]) {
      this.x -= moveSpeed;
    }

    // If Hero Is Moving Right, Update Hero Position
    if (keys["ArrowRight"] || keys["d"]) {
      this.x += moveSpeed;
    }

    // Check For Collisions With Enemies
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];

      // If Enemy Is Not Dead, Check For Collision
      if (sprite instanceof EnemyEasy && !sprite.isDead) {
        let scoreSprite = sprites.find((sprite) => sprite instanceof Score);
        if (checkCollision(this, sprite)) {
          // If Hero Is Jumping And Enemy Is Below Hero, Kill Enemy
          if (
            this.verticalSpeed > 0 &&
            this.y + this.height < sprite.y + sprite.height / 2
          ) {
            // If Hero Is Jumping And Enemy Is Below Hero, Kill Enemy
            sprite.isDead = true;
            sprite.setState("dead");
            this.verticalSpeed = this.jumpPower / 2;
            this.jumpKillCooldown = 10;
            scoreSprite.addScore(2);
            let killSound = new Audio("public/audio/jump.mp3");
            killSound.play();
          } else if (this.jumpKillCooldown === 0) {
            // If Hero Is Dead, Update Hero State
            this.isAlive = false;
            this.setState("dead");
          }
          break;
        }

        // If Flying Enemy Is Not Dead, Check For Collision
      } else if (
        (sprite instanceof FlyingEnemy && !sprite.isDead) ||
        (sprite instanceof FlyingEnemyBullet && !sprite.isRemoved)
      ) {
        if (checkCollision(this, sprite)) {
          // If Hero Is Dead, Update Hero State
          this.isAlive = false;
          this.setState("dead");

          // If Flying Enemy Bullet Is Not Removed, Remove Flying Enemy Bullet
          if (sprite instanceof FlyingEnemyBullet) {
            sprite.isRemoved = true;
          }
          break;
        }
      }
    }

    // Check For Ladder Collision
    let ladder = sprites.find(
      (sprite) =>
        sprite instanceof PinkStair &&
        this.x + this.width > sprite.x &&
        this.x < sprite.x + sprite.width &&
        this.y + this.height > sprite.y &&
        this.y < sprite.y + sprite.height
    );

    // If Ladder Is Found, Update Hero Position
    let onStair = false;

    // If Ladder Is Found, Update Hero Position
    if (ladder) {
      let heroCenter = this.x + this.width / 2;
      let ladderLeft = ladder.x + ladder.width / 3;
      let ladderRight = ladder.x + (2 * ladder.width) / 3;
      if (heroCenter > ladderLeft && heroCenter < ladderRight) {
        onStair = true;
      }
    }

    // If Ladder Is Found, Update Hero Position
    if (onStair && (keys["ArrowUp"] || keys["w"])) {
      this.y -= this.speed;
      this.verticalSpeed = 0;
      this.setState("climb");
      // If Hero Is Climbing Up, Update Hero Position
    } else if (onStair && (keys["ArrowDown"] || keys["s"])) {
      this.y += this.speed;
      this.verticalSpeed = 0;
      this.setState("climb");
      // If Hero Is Climbing Down, Update Hero Position
    }

    // If Hero Is Climbing Up Or Down, Update Hero Position
    if (
      onStair &&
      (keys["ArrowUp"] || keys["w"] || keys["ArrowDown"] || keys["s"])
    ) {
      this.verticalSpeed = 0;
    }

    // Check For Floor Platform Collision
    let onFloorPlatform = false;
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];

      // If Floor Platform Is Found, Update Hero Position
      if (sprite instanceof FloorPlatform) {
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
          onFloorPlatform = true;
          break;
        }
      }
    }

    // Return False If Hero Is Not On Floor Platform
    return false;
  }

  // Draw Hero On Canvas
  draw(ctx) {
    this.states[this.currentState].draw(ctx, this.x, this.y);
  }
}

// Background Class
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

    // If Background Is Platformer Background 1, Play Background Music
    if (image === "public/background/platformer_background_1.png") {
      if (!Background.music) {
        Background.music = new Audio("public/audio/bgMusic.mp3");
        Background.music.loop = true;
        Background.music.volume = 0.3;
        Background.music.play();
      } else if (Background.music.paused) {
        Background.music.play();
      }
    } else {
      // If Background Is Not Platformer Background 1, Pause Background Music
      if (Background.music) {
        Background.music.pause();
        Background.music.currentTime = 0;
        Background.music = null;
      }
    }
  }

  // Update Background Position
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

  // Draw Background On Canvas
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

// Rock Class
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

  // Update Rock Position
  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    // Update Rock Position
    this.x += this.speedX;
    this.y += this.speedY;

    // If Rock Is Out Of Bounds, Remove Rock
    if (this.x > 960 || this.x < 0 || this.y > 540 || this.y < 0) {
      return true;
    }

    // Check For Collisions With Enemies
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (
        (sprite instanceof EnemyEasy && !sprite.isDead) ||
        (sprite instanceof FlyingEnemy && !sprite.isDead) ||
        (sprite instanceof FlyingEnemyBullet && !sprite.isRemoved) ||
        (sprite instanceof Boss1Enemy && !sprite.isDead)
      ) {
        // If Enemy Is Not Dead, Check For Collision
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

            // If Enemy Is Not Dead, Remove Enemy
          } else {
            sprite.isRemoved = true;
          }

          // Remove Rock
          this.isRemoved = true;
          break;
        }
      }
    }

    // Return False If Rock Is Not Removed
    return false;
  }

  // Draw Rock On Canvas
  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

// EnemyEasy Class
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

  // Set EnemyEasy State
  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();
    }
  }

  // Update EnemyEasy Position
  update(sprites, keys) {
    this.x += this.speed;
    this.states[this.currentState].update();

    // If EnemyEasy Is Out Of Bounds, Remove EnemyEasy
    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }

    // If EnemyEasy Is Dead, Return False
    if (this.isDead) {
      return false;
    }

    // Check For Collisions With Rocks
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (
        sprite instanceof Rock &&
        !sprite.isRemoved &&
        checkCollision(this, sprite)
      ) {
        // If Rock Is Not Removed, Remove Rock
        this.isDead = true;
        this.setState("dead");
        sprite.isRemoved = true;
        break;
      }
    }

    // Return False If EnemyEasy Is Not Dead
    return false;
  }

  // Draw EnemyEasy On Canvas
  draw(ctx) {
    this.states[this.currentState].draw(ctx, this.x, this.y);
  }
}

// FlyingEnemy Class
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

  // Set FlyingEnemy State
  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();
    }
  }

  // Update FlyingEnemy Position
  update(sprites, keys) {
    this.x += this.speed;
    this.states[this.currentState].update();

    // If FlyingEnemy Is Out Of Bounds, Remove FlyingEnemy
    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }

    // If FlyingEnemy Is Dead, Return False
    if (this.isDead) {
      return false;
    }

    // If FlyingEnemy Is Shooting, Update FlyingEnemy State
    if (
      this.currentState === "shooting" &&
      this.states[this.currentState].frameIndex ===
        this.states[this.currentState].frames - 1
    ) {
      this.setState("flying");
    }

    // If FlyingEnemy Shoot Cooldown Is Greater Than 0, Decrease FlyingEnemy Shoot Cooldown
    if (this.shootCooldown > 0) {
      this.shootCooldown--;
    }

    // If FlyingEnemy Shoot Cooldown Is 0 And FlyingEnemy Is Not Dead, Set FlyingEnemy Auto Shoot To True And Set FlyingEnemy Shoot Cooldown To 500
    if (this.shootCooldown === 0 && !this.isDead) {
      this.autoShoot = true;
      this.shootCooldown = 500;

      // Add FlyingEnemy Bullet To Game
      this.game.addSprite(
        new FlyingEnemyBullet(
          this.x + this.width / 2 - 6,
          this.y + this.height,
          12,
          16.5,
          -1
        )
      );

      // Set FlyingEnemy State To Shooting
      this.setState("shooting");
    }

    return false;
  }

  // Draw FlyingEnemy On Canvas
  draw(ctx) {
    this.states[this.currentState].draw(ctx, this.x, this.y);
  }
}

// FlyingEnemyBullet Class
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

  // Update FlyingEnemyBullet Position
  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    // Update FlyingEnemyBullet Position
    this.x += this.speedX;
    this.y += this.speedY;

    // If FlyingEnemyBullet Is Out Of Bounds, Remove FlyingEnemyBullet
    if (this.x < 0 || this.x > 960 || this.y < 0 || this.y > 540) {
      return true;
    }

    // Get Hero From Sprites
    let hero = null;
    for (let i = 0; i < sprites.length; i++) {
      if (sprites[i] instanceof Hero) {
        hero = sprites[i];
        break;
      }
    }

    // If Hero Is Alive, Check For Collision With Hero
    if (hero && hero.isAlive) {
      const bulletBox = {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
      };

      // Get Hero Box
      const heroBox = {
        x: hero.x,
        y: hero.y,
        width: 32,
        height: 33,
      };

      // If Bullet Box And Hero Box Collide, Set Hero Alive To False And Set Hero State To Dead
      if (checkCollision(bulletBox, heroBox)) {
        hero.isAlive = false;
        hero.setState("dead");
        this.isRemoved = true;
        return true;
      }
    }

    // Return False If FlyingEnemyBullet Is Not Removed
    return false;
  }

  // Draw FlyingEnemyBullet On Canvas
  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

// Boss1Enemy Class
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

  // Set Boss1Enemy State
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

  // Update Boss1Enemy Position
  update(sprites, keys) {
    this.states[this.currentState].update();

    // If Boss1Enemy Is Not In Game, Set Game To Hero Game
    if (!this.game) {
      for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] instanceof Hero) {
          this.game = sprites[i].game;
          break;
        }
      }
    }

    // If Boss1Enemy Is Hit, Flash Boss1Enemy
    if (this.hitFlashTimer > 0) {
      this.hitFlashTimer--;
    }

    // If Boss1Enemy Is Out Of Bounds, Remove Boss1Enemy
    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }

    // If Boss1Enemy Is Dead, Return False
    if (this.isDead) {
      return false;
    }

    // If Boss1Enemy Is Walking, Update Boss1Enemy Position
    if (this.currentState === "walking") {
      this.x += this.speed;

      if (this.initialX - this.x >= this.walkDistance) {
        this.setState("idle");
      }
    } else if (this.currentState === "idle") {
      // If Boss1Enemy Is Idle, Update Boss1Enemy Attack Cooldown
      if (this.attackCooldown > 0) {
        this.attackCooldown--;
      } else {
        this.setState("shooting");
        this.attackCooldown = this.attackInterval;
      }
    } else if (this.currentState === "shooting") {
      // If Boss1Enemy Is Shooting, Update Boss1Enemy Flame Spawn Timer
      if (this.game && this.flameSpawnTimer <= 0 && !this.hasSpawnedFlame) {
        this.spawnSkyFlame();
        this.hasSpawnedFlame = true;
      } else {
        this.flameSpawnTimer--;
      }

      // If Boss1Enemy Is Shooting, Update Boss1Enemy State
      if (
        this.states[this.currentState].frameIndex ===
        this.states[this.currentState].frames - 1
      ) {
        this.setState("idle");
      }
    }

    // Check For Collisions With Rocks
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

      // Check For Collisions With Hero
      if (
        sprite instanceof Hero &&
        sprite.isAlive &&
        checkCollision(this, sprite)
      ) {
        sprite.isAlive = false;
        sprite.setState("dead");
      }
    }

    // If Boss1Enemy Is Boss Fight, Boss Spawned, Level Index Is 1 And Boss1Enemy Is Not In Game, Change Level To 2
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

  // Spawn Sky Flame
  spawnSkyFlame() {
    if (!this.game) return;

    // Get Spawn X
    const spawnX = this.flameSpawnPositions[this.currentFlamePosition];

    // Update Current Flame Position
    this.currentFlamePosition =
      (this.currentFlamePosition + 1) % this.flameSpawnPositions.length;

    // Add Sky Flame To Game
    this.game.addSprite(new SkyFlame(spawnX, 0, 143, 75, 1.5));

    // Play Flame Sound
    let flameSound = new Audio("public/audio/flame.mp3");
    flameSound.volume = 0.3;
    flameSound.play();
  }

  // Draw Boss1Enemy On Canvas
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

    // If Boss1Enemy Is Not Dead, Draw Boss1Enemy Health Bar
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

// Boss2Enemy Class
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
    this.hasDespawnedSpecial = false;
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
    this.winTriggered = false;
  }

  // Set Boss2Enemy State
  setState(state) {
    if (this.currentState !== state) {
      this.currentState = state;
      this.states[state].reset();
      if (state === "shooting") {
        this.laserSpawned = false;
      }
    }
  }

  // Update Boss2Enemy Position
  update(sprites, keys) {
    this.states[this.currentState].update();

    // If Boss2Enemy Is Not In Game, Set Game To Hero Game
    if (!this.game) {
      for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] instanceof Hero) {
          this.game = sprites[i].game;
          break;
        }
      }
    }
    // If Boss2Enemy Is Out Of Bounds, Remove Boss2Enemy
    if (
      this.x < -this.width ||
      (this.isDead &&
        this.states[this.currentState].frameIndex ==
          this.states[this.currentState].frames - 1)
    ) {
      return true;
    }

    // If Boss2Enemy Is Dead, Return False
    if (this.isDead) {
      return false;
    }

    // If Boss2Enemy Is Walking, Update Boss2Enemy Position
    if (this.currentState === "walking") {
      this.x += this.speed;
      if (this.initialX - this.x >= this.walkDistance) {
        this.setState("idle");
      }
    } else if (this.currentState === "idle") {
      // If Boss2Enemy Is Idle, Update Boss2Enemy Attack Cooldown
      if (this.attackCooldown > 0) {
        this.attackCooldown--;
      } else {
        this.setState("shooting");
        this.attackCooldown = this.attackInterval;
      }
    } else if (this.currentState === "shooting") {
      // If Boss2Enemy Is Shooting, Update Boss2Enemy Laser Spawned
      if (!this.laserSpawned && this.game) {
        this.spawnLaser();
        this.laserSpawned = true;
      }
      // If Boss2Enemy Is Shooting, Update Boss2Enemy State
      if (
        this.states[this.currentState].frameIndex ===
        this.states[this.currentState].frames - 1
      ) {
        this.setState("idle");
      }
    }

    // Check For Collisions With Rocks
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (
        sprite instanceof Rock &&
        !sprite.isRemoved &&
        checkCollision(this, sprite)
      ) {
        // If Rock Is Not Removed, Remove Rock
        sprite.isRemoved = true;
        // If Boss2Enemy Health Is Less Than Or Equal To 0 And Boss2Enemy Win Triggered Is False, Set Boss2Enemy Dead To True And Set Boss2Enemy State To Dead
        this.health -= 1;
        if (this.health <= 0 && !this.winTriggered) {
          this.isDead = true;
          this.setState("dead");
          this.winTriggered = true;
          // Add Win Screen To Game
          this.game.addSprite(new WinScreen(this.game));
        }
      }
      // If Hero Is Alive, Check For Collision With Boss2Enemy
      if (
        sprite instanceof Hero &&
        sprite.isAlive &&
        checkCollision(this, sprite)
      ) {
        // If Hero Is Alive, Set Hero Alive To False And Set Hero State To Dead
        sprite.isAlive = false;
        sprite.setState("dead");
      }
    }

    // If Boss2Enemy Has Not Despawned Special, Set Boss2Enemy Has Despawned Special To True
    if (!this.hasDespawnedSpecial) {
      this.hasDespawnedSpecial = true;

      // Get Platform, Stairs, Key
      let platform = sprites.find((s) => s instanceof FloorPlatform);
      let stairs = sprites.find((s) => s instanceof PinkStair);
      let key = sprites.find((s) => s instanceof KeyCollectible);

      // If Platform, Stairs Or Key Is Found, Remove Platform, Stairs Or Key
      if (platform) platform.isRemoved = true;
      if (stairs) stairs.isRemoved = true;
      if (key) key.isRemoved = true;
    }

    return false;
  }

  // Spawn Laser
  spawnLaser() {
    const laserX = this.x - 240 + 120;
    const laserY = this.y + 90;
    this.game.addSprite(new Boss2Laser(laserX, laserY, 180, 100, -1));
    let laserSound = new Audio("public/audio/laser.mp3");
    laserSound.volume = 0.4;
    laserSound.play();
  }

  // Draw Boss2Enemy On Canvas
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

// Boss2Laser Class
class Boss2Laser extends Sprite {
  constructor(x, y, width, height, speed) {
    super();
    this.x = x;
    this.y = y;
    this.width = 180;
    this.height = 100;
    this.speedX = speed;
    this.image = new Image();
    this.image.src = "public/bossDemonLord/demonLaser.png";
    this.isRemoved = false;
  }

  // Update Boss2Laser Position
  update(sprites, keys) {
    if (this.isRemoved) return true;

    // Update Boss2Laser Position
    this.x += this.speedX;

    // If Boss2Laser Is Out Of Bounds, Remove Boss2Laser
    if (this.x > 960) return true;

    // Check For Collisions With Hero
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (sprite instanceof Hero && sprite.isAlive) {
        // If Hero Is Alive, Check For Collision With Boss2Laser
        if (checkCollision(this, sprite)) {
          // If Hero Is Alive, Set Hero Alive To False And Set Hero State To Dead
          sprite.isAlive = false;
          sprite.setState("dead");
          this.isRemoved = true;
          return true;
        }
      }
    }

    // Return False If Boss2Laser Is Not Removed
    return false;
  }

  // Draw Boss2Laser On Canvas
  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

// CloudPlatform Class
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

  // Update CloudPlatform Position
  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    // Update CloudPlatform Position
    this.x += this.speed;

    // If CloudPlatform Is Out Of Bounds, Remove CloudPlatform
    if (this.x < -this.width) {
      return true;
    }

    // Get Hero
    let hero = sprites.find((sprite) => sprite instanceof Hero);

    // If Hero Is Alive And CloudPlatform Has Not Triggered, Check For Collision With Hero
    if (hero && hero.isAlive && !this.hasTriggered) {
      const heroBottom = hero.y + hero.height;
      const platformTop = this.y;

      // If Hero Is Alive And CloudPlatform Has Not Triggered, Check For Collision With Hero
      if (
        Math.abs(heroBottom - platformTop) < 10 &&
        hero.x + hero.width > this.x &&
        hero.x < this.x + this.width &&
        hero.verticalSpeed >= 0
      ) {
        hero.y = this.y - hero.height;
        hero.verticalSpeed = 0;
        hero.grounded = true;

        // If CloudPlatform Is Not Active, Set CloudPlatform Active To True And Set CloudPlatform Activation Timer To 70
        if (!this.isActive) {
          this.isActive = true;
          this.activationTimer = 70;
        }
      }
    }

    // If CloudPlatform Is Active, Update CloudPlatform Activation Timer
    if (this.isActive) {
      this.activationTimer--;

      // If CloudPlatform Activation Timer Is Less Than Or Equal To 0 And CloudPlatform Has Not Triggered, Shoot Rocks In All Directions,
      //  Set CloudPlatform Has Triggered To True And Remove CloudPlatform
      if (this.activationTimer <= 0 && !this.hasTriggered) {
        this.shootRocksInAllDirections();
        this.hasTriggered = true;
        this.isRemoved = true;
      }
    }

    return false;
  }

  // Shoot Rocks In All Directions
  shootRocksInAllDirections() {
    const centerX = this.x + this.width / 2;
    const centerY = this.y + this.height / 2;

    // Add Rock To Game 3 On Each Side
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

  // Draw CloudPlatform On Canvas
  draw(ctx) {
    if (!this.isRemoved) {
      this.sprite.draw(ctx, this.x, this.y);
    }
  }
}

// EnemyGenerator Class
class EnemyGenerator extends Sprite {
  constructor(spawnInterval, canvasWidth, canvasHeight, game) {
    super();
    this.spawnInterval = 240;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.counter = 0;
    this.game = game;
    // Ground Spawn Points
    this.groundSpawnPoints = [
      { x: canvasWidth, y: 410, speed: -1 },
      { x: canvasWidth, y: 410, speed: -1 },
      { x: canvasWidth + 2000, y: 410, speed: -1.15 },
    ];
    // Air Spawn Points
    this.airSpawnPoints = [
      { x: canvasWidth, y: 150, speed: -1 },
      { x: canvasWidth, y: 250, speed: -1.25 },
      { x: canvasWidth + 300, y: 250, speed: -1.2 },
    ];
    // Boss Spawn Point
    this.bossSpawnPoint = { x: canvasWidth, y: 250, speed: -0.3 };
    this.currentGroundPoint = 0;
    this.currentAirPoint = 0;
    this.spawnCounter = 0;
    this.cloudPlatformTimer = 600;
    this.isBossFight = false;
    this.bossSpawned = false;
    this.clearEnemiesTimer = 0;
  }

  // Update EnemyGenerator
  update(sprites, keys) {
    let scoreSprite = sprites.find((sprite) => sprite instanceof Score);
    let score = scoreSprite ? scoreSprite.score : 0;

    // If Score Is Greater Than Or Equal To 20 And Boss Spawned Is False, Set Boss Fight To True And Set Boss Spawned To True
    if (score >= 20 && !this.bossSpawned) {
      this.isBossFight = true;
      this.bossSpawned = true;
      this.clearEnemiesTimer = 180;

      let bossWarningSound = new Audio("public/audio/boss-warning.mp3");
      bossWarningSound.play();

      return false;
    }

    // If Boss Fight Is True And Clear Enemies Timer Is Greater Than 0, Update Clear Enemies Timer
    if (this.isBossFight && this.clearEnemiesTimer > 0) {
      this.clearEnemiesTimer--;

      // If Clear Enemies Timer Is 0, Remove All Enemies, Spawn Boss And Play Boss Music
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

        // Spawn Boss
        this.game.addSprite(
          new Boss1Enemy(
            this.bossSpawnPoint.x,
            this.bossSpawnPoint.y,
            1290,
            258,
            this.bossSpawnPoint.speed
          )
        );

        // Play Boss Music
        let bossMusic = new Audio("public/audio/boss-music.mp3");
        bossMusic.loop = true;
        bossMusic.play();
      }

      return false;
    }

    // If Boss Fight Is False, Update Counter
    if (!this.isBossFight) {
      this.counter++;
      if (this.counter >= this.spawnInterval) {
        this.counter = 0;
        this.spawnCounter++;

        // Spawn Ground Enemy
        this.spawnGroundEnemy();

        // Spawn Flying Enemy
        if (this.spawnCounter % 2 == 0) {
          this.spawnFlyingEnemy();
        }
      }

      // Update Cloud Platform Timer
      this.cloudPlatformTimer--;

      // If Cloud Platform Timer Is Less Than Or Equal To 0, Spawn Cloud Platform
      if (this.cloudPlatformTimer <= 0) {
        this.spawnCloudPlatform();
        this.cloudPlatformTimer = 900 + Math.floor(Math.random() * 900);
      }
    }

    // If Boss Fight Is True, Boss Spawned Is True, Level Index Is 1 And Boss1Enemy Is Not In Game, Change Level To 2
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

  // Spawn Ground Enemy
  spawnGroundEnemy() {
    // Get Spawn Point
    let spawnPoint = this.groundSpawnPoints[this.currentGroundPoint];

    // Spawn Enemy
    this.game.addSprite(
      new EnemyEasy(spawnPoint.x, spawnPoint.y, 32, 32, spawnPoint.speed)
    );
    this.currentGroundPoint =
      (this.currentGroundPoint + 1) % this.groundSpawnPoints.length;
  }

  // Spawn Flying Enemy
  spawnFlyingEnemy() {
    // Get Spawn Point
    let spawnPoint = this.airSpawnPoints[this.currentAirPoint];

    // Spawn Flying Enemy
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

  // Spawn Cloud Platform
  spawnCloudPlatform() {
    // Get Y Position
    const yPosition = 330 + Math.floor(Math.random() * 50);

    // Spawn Cloud Platform
    this.game.addSprite(
      new CloudPlatform(this.canvasWidth, yPosition, -1, this.game)
    );
  }

  // Draw EnemyGenerator On Canvas
  draw(ctx) {}
}

// EnemyGenerator2 Class
class EnemyGenerator2 extends Sprite {
  constructor(spawnInterval, canvasWidth, canvasHeight, game) {
    super();
    this.spawnInterval = 160;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.counter = 0;
    this.game = game;
    // Ground Spawn Points
    this.groundSpawnPoints = [
      { x: canvasWidth, y: 410, speed: -1.3 },
      { x: canvasWidth, y: 410, speed: -1.5 },
      { x: canvasWidth + 1000, y: 410, speed: -1.7 },
    ];
    // Air Spawn Points
    this.airSpawnPoints = [
      { x: canvasWidth, y: 120, speed: -1.5 },
      { x: canvasWidth, y: 200, speed: -1.7 },
      { x: canvasWidth + 300, y: 250, speed: -1.6 },
    ];
    // Boss Spawn Point
    this.bossSpawnPoint = { x: canvasWidth, y: 260, speed: -0.5 };
    this.currentGroundPoint = 0;
    this.currentAirPoint = 0;
    this.spawnCounter = 0;
    this.isBossFight = false;
    this.bossSpawned = false;
    this.clearEnemiesTimer = 0;
    this.bossWarningText = null;
    this.specialSpawned = false;
  }

  // Update EnemyGenerator2
  update(sprites, keys) {
    let scoreSprite = sprites.find((sprite) => sprite instanceof Score);
    let score = scoreSprite ? scoreSprite.score : 0;

    // If Special Platform Spawned Is False And Score Is Greater Than Or Equal To 20, Set Special Spawned To True
    if (!this.specialSpawned && score >= 20) {
      this.specialSpawned = true;
      let platformStartX = this.canvasWidth + 10;
      let platformTargetX = 400;
      let platformY = 225;
      let platformSpeed = 0.5;
      let platformWidth = 120;
      let pinkStairOffsetX = 38;
      let floorPlatform = new FloorPlatform(
        platformStartX,
        platformY,
        platformTargetX,
        platformSpeed
      );
      // Create Pink Stair
      let pinkStair = new PinkStair(floorPlatform, pinkStairOffsetX);
      // Create Key Collectible
      let key = new KeyCollectible(
        floorPlatform,
        (platformWidth - 12) / 2,
        this.game
      );
      this.game.addSprite(floorPlatform);
      this.game.addSprite(pinkStair);
      this.game.addSprite(key);
    }

    // If Score Is Greater Than Or Equal To 45 And Boss Spawned Is False, Set Boss Fight To True And Set Boss Spawned To True
    if (score >= 45 && !this.bossSpawned) {
      this.isBossFight = true;
      this.bossSpawned = true;
      this.clearEnemiesTimer = 400;

      // Play Boss Warning Sound
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

    // If Boss Fight Is True And Clear Enemies Timer Is Greater Than 0, Update Clear Enemies Timer
    if (this.isBossFight && this.clearEnemiesTimer > 0) {
      this.clearEnemiesTimer--;

      // If Clear Enemies Timer Is 0, Remove All Enemies, Spawn Boss And Play Boss Music
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

        // Spawn Boss
        this.game.addSprite(
          new Boss2Enemy(
            this.bossSpawnPoint.x,
            this.bossSpawnPoint.y,
            1548,
            258,
            this.bossSpawnPoint.speed
          )
        );

        // Play Boss Music
        let bossMusic = new Audio("public/audio/boss-music.mp3");
        bossMusic.loop = true;
        bossMusic.play();

        // Set Boss Warning Text To Null
        this.bossWarningText = null;
      }
      return false;
    }

    // If Boss Fight Is False, Update Counter
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

  // Spawn Ground Enemy
  spawnGroundEnemy() {
    // Get Spawn Point
    let spawnPoint = this.groundSpawnPoints[this.currentGroundPoint];

    // Spawn Enemy
    this.game.addSprite(
      new EnemyEasy(spawnPoint.x, spawnPoint.y, 32, 32, spawnPoint.speed)
    );
    this.currentGroundPoint =
      (this.currentGroundPoint + 1) % this.groundSpawnPoints.length;
  }

  // Spawn Flying Enemy
  spawnFlyingEnemy() {
    // Get Spawn Point
    let spawnPoint = this.airSpawnPoints[this.currentAirPoint];

    // Spawn Flying Enemy
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

  // Draw EnemyGenerator2 On Canvas
  draw(ctx) {
    if (this.bossWarningText) {
      this.bossWarningText.draw(ctx);
    }
  }
}

// Lives Class
class Lives extends Sprite {
  constructor(game) {
    super();
    this.game = game;
    this.lives = 4;
    this.livesImages = {
      4: new Image(),
      3: new Image(),
      2: new Image(),
      1: new Image(),
      0: new Image(),
    };
    this.livesImages[4].src = "public/lives/100-percent.png";
    this.livesImages[3].src = "public/lives/75-percent.png";
    this.livesImages[2].src = "public/lives/50-percent.png";
    this.livesImages[1].src = "public/lives/25-percent.png";
    this.livesImages[0].src = "public/lives/0-percent.png";
    this.width = 35;
    this.height = 35;
    this.x = this.game.canvas.width - this.width - 10;
    this.y = 10;
    this.gameOverSound = new Audio("public/audio/lose.mp3");
  }

  // Update Lives
  update(sprites, keys) {
    // Get Hero
    let hero = sprites.find((sprite) => sprite instanceof Hero);
    // If Hero Is Alive And Lives Is Greater Than 0, Decrement Lives
    if (hero && !hero.isAlive && this.lives > 0) {
      this.lives--;
      hero.isAlive = true;
      hero.setState("hurt");
      hero.x = 100;
      hero.y = 410;

      // Remove All Enemies
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

    // If Lives Is Less Than Or Equal To 0 And Hero Is Alive, Play Game Over Sound
    if (this.lives <= 0 && hero && !hero.isAlive) {
      if (Background.music) {
        Background.music.pause();
        Background.music.currentTime = 0;
      }

      // Play Game Over Sound
      this.gameOverSound.play();

      // Remove Lives
      for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] !== this) {
          sprites[i].isRemoved = true;
        }
      }

      // Add Lose Screen
      this.game.addSprite(new LoseScreen(this.game));
    }

    return false;
  }

  // Draw Lives On Canvas
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

// LoseScreen Class
class LoseScreen extends Sprite {
  constructor(game) {
    super();
    this.game = game;
    this.levelAtGameOver = game.levelIndex;
    this.gameOverSound = new Audio("public/audio/lose.mp3");
    this.stopped = false;
  }

  // Update LoseScreen
  update(sprites, keys) {
    if (!this.stopped) {
      this.stopped = true;
      if (Background.music) {
        Background.music.pause();
        Background.music.currentTime = 0;
      }
      this.gameOverSound.play();
      for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] !== this) {
          sprites[i].isRemoved = true;
        }
      }
    }
    return false;
  }

  // Draw LoseScreen On Canvas
  draw(ctx) {
    // Handle Keyboard Events In Draw Since Update Isn't Called When Paused
    if (this.game.keys["r"] || this.game.keys["R"]) {
      this.game.sprites = [];
      this.game.levels[this.levelAtGameOver].init();
    }

    // Go to Menu
    if (this.game.keys["g"] || this.game.keys["G"]) {
      this.game.sprites = [];
      this.game.levels[0].init();
    }

    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#0CC0DF";
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = "#FF0000";
    ctx.font = "50px 'boorsok'";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText(
      "YOU LOSE",
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 50
    );
    ctx.fillStyle = "#FF69B4";
    ctx.font = "24px 'boorsok'";
    ctx.fillText(
      "Press R to Restart Level " + this.levelAtGameOver,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 + 20
    );
    ctx.fillText(
      "Press G to Go to Menu",
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 + 60
    );
    ctx.restore();
  }
}

// WinScreen Class
class WinScreen extends Sprite {
  constructor(game) {
    super();
    this.game = game;
    this.levelAtGameOver = game.levelIndex;
    this.winSound = new Audio("public/audio/win.mp3");
    this.stopped = false;
  }

  // Update WinScreen
  update(sprites, keys) {
    if (!this.stopped) {
      this.stopped = true;
      if (Background.music) {
        Background.music.pause();
        Background.music.currentTime = 0;
      }
      this.winSound.play();
      for (let i = 0; i < sprites.length; i++) {
        if (sprites[i] !== this) {
          sprites[i].isRemoved = true;
        }
      }
    }
    return false;
  }

  // Draw WinScreen On Canvas
  draw(ctx) {
    // Handle Keyboard Events In Draw Since Update Isn't Called When Paused
    if (this.game.keys["r"] || this.game.keys["R"]) {
      this.game.sprites = [];
      this.game.levels[1].init();
    }
    // Go to Menu
    if (this.game.keys["g"] || this.game.keys["G"]) {
      this.game.sprites = [];
      this.game.levels[0].init();
    }

    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "#0CC0DF";
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.globalAlpha = 1.0;
    ctx.fillStyle = "#00FF00";
    ctx.font = "50px 'boorsok'";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.fillText(
      "YOU WON",
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 - 50
    );
    ctx.fillStyle = "#FF69B4";
    ctx.font = "24px 'boorsok'";
    ctx.fillText(
      "Press R to Restart Game",
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 + 20
    );
    ctx.fillText(
      "Press G to Go to Menu",
      this.game.canvas.width / 2,
      this.game.canvas.height / 2 + 60
    );
    ctx.restore();
  }
}

// Score Class
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

  // Add Score
  addScore(points) {
    this.score += points;
  }

  // Update Score
  update(sprites, keys) {
    return false;
  }

  // Draw Score On Canvas
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

// SkyFlame Class
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

  // Update SkyFlame
  update(sprites, keys) {
    if (this.isRemoved) {
      return true;
    }

    // Update SkyFlame Position
    this.y += this.speedY;

    // If SkyFlame Is Out Of Bounds, Remove SkyFlame
    if (this.y > 540) {
      return true;
    }

    // Get Hero
    for (let i = 0; i < sprites.length; i++) {
      let sprite = sprites[i];
      if (sprite instanceof Hero && sprite.isAlive) {
        // If Hero Is Alive And SkyFlame Is Colliding With Hero, Set Hero Alive To False And Set Hero State To Dead
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

  // Draw SkyFlame On Canvas
  draw(ctx) {
    if (!this.isRemoved) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

// PinkStair Class
class PinkStair extends Sprite {
  constructor(platform, offsetX) {
    super();
    this.platform = platform;
    this.offsetX = offsetX;
    this.width = 44;
    this.height = 97;
    this.image = new Image();
    this.image.src = "public/arc/pinkstairs.png";
  }

  // Update PinkStair
  update(sprites, keys) {
    if (this.isRemoved) return true;
    this.x = this.platform.x + this.offsetX;
    this.y = this.platform.y + this.platform.height - 41;
    return false;
  }

  // Draw PinkStair On Canvas
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

// FloorPlatform Class
class FloorPlatform extends Sprite {
  constructor(startX, y, targetX, speed) {
    super();
    this.x = startX;
    this.y = y;
    this.targetX = targetX;
    this.speed = speed;
    this.width = 120;
    this.height = 40;
    this.image = new Image();
    this.image.src = "public/arc/floorplatform.png";
    this.hasArrived = false;
  }

  // Update FloorPlatform
  update(sprites, keys) {
    if (this.isRemoved) return true;
    if (!this.hasArrived) {
      if (this.x > this.targetX) {
        this.x -= this.speed;
        if (this.x <= this.targetX) {
          this.x = this.targetX;
          this.hasArrived = true;
        }
      }
    }
    return false;
  }

  // Draw FloorPlatform On Canvas
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

// KeyCollectible Class
class KeyCollectible extends Sprite {
  constructor(platform, offsetX, game) {
    super();
    this.platform = platform;
    this.offsetX = offsetX;
    this.game = game;
    this.width = 18;
    this.height = 18;
    this.collected = false;
    this.isRemoved = false;
    this.spriteSheet = new SpriteSheet(
      "public/collectibles/key.png",
      252,
      18,
      14
    );
  }

  // Update KeyCollectible
  update(sprites, keys) {
    // If KeyCollectible Is Removed, Return True
    if (this.isRemoved) return true;

    // Update KeyCollectible Position
    this.x = this.platform.x + this.offsetX;
    this.y = this.platform.y - this.height;
    this.spriteSheet.update();

    // Get Hero
    let hero = sprites.find((s) => s instanceof Hero && s.isAlive);

    // If Hero Is Alive And KeyCollectible Is Not Collected And Hero Is Colliding With KeyCollectible,
    // Set Key Collected To True, Set Hero Has Long Jump To True, Set Platform Removed To True,
    // Find Pink Stair And Set Pink Stair Removed To True, Play Key Sound And Return True
    if (
      hero &&
      !this.collected &&
      hero.x < this.x + this.width &&
      hero.x + hero.width > this.x &&
      hero.y < this.y + this.height &&
      hero.y + hero.height > this.y
    ) {
      // Set Collected To True
      this.collected = true;
      hero.hasLongJump = true;
      this.platform.isRemoved = true;
      let stairs = sprites.find((s) => s instanceof PinkStair);
      if (stairs) stairs.isRemoved = true;

      let keySound = new Audio("public/audio/key.mp3");
      keySound.volume = 0.7;
      keySound.play();

      return true;
    }
    return false;
  }

  // Draw KeyCollectible On Canvas
  draw(ctx) {
    if (!this.collected && !this.isRemoved) {
      this.spriteSheet.draw(ctx, this.x, this.y);
    }
  }
}

// GameControls Class
class GameControls extends Sprite {
  constructor(game) {
    super();
    this.game = game;
  }

  // Update GameControls
  update(sprites, keys) {
    // Pause Game
    if (keys["p"] || keys["P"]) {
      this.game.paused = true;
    }
    return false;
  }

  // Draw GameControls On Canvas
  draw(ctx) {
    if (this.game.paused) {
      // Handle Keyboard Events In Draw Since Update Isn't Called When Paused
      if (this.game.keys["c"] || this.game.keys["C"]) {
        this.game.paused = false;
      }
      if (this.game.keys["r"] || this.game.keys["R"]) {
        this.game.paused = false;
        this.game.sprites = [];
        this.game.levels[this.game.levelIndex].init();
      }

      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = "#fff";
      ctx.font = "40px 'boorsok', Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        "PAUSED",
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 - 20
      );
      ctx.font = "24px 'boorsok', Arial";
      ctx.fillText(
        "Press C To Continue",
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 + 30
      );
      ctx.fillText(
        "Press R To Restart",
        this.game.canvas.width / 2,
        this.game.canvas.height / 2 + 60
      );
      ctx.restore();
    }
  }
}

// Create Game Instance
let myGame = new Game();

// Add Levels To Game
myGame.addLevel(new Menu(myGame));
myGame.addLevel(new Level1(myGame));
myGame.addLevel(new Level2(myGame));
myGame.addLevel(new Tutorial(myGame));

// Animate Game
myGame.animate();
