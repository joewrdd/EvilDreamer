class Sprite {
  constructor() {}

  update() {}

  draw(ctx) {}
}

class Level {
  constructor(game) {
    this.game = game;
  }

  init() {}
}

class Game {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.sprites = [];
    this.keys = {};
    this.levelIndex = 0;
    this.levels = [];
    this.pendingLevel = null;
    this.mouse = { x: 0, y: 0, clicked: false };
    this.bindMouseEvents();
    this.bindKeyboardEvents();
  }

  addSprite(sprite) {
    this.sprites.push(sprite);
  }
  update() {
    let updatedSprites = [];
    for (let i = 0; i < this.sprites.length; i++) {
      let sprite = this.sprites[i];

      if (!sprite.update(this.sprites, this.keys)) {
        updatedSprites.push(sprite);
      }
    }
    this.sprites = updatedSprites;

    if (this.pendingLevel !== null) {
      this.setLevel(this.pendingLevel);
      this.pendingLevel = null;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sprites.forEach((sprite) => sprite.draw(this.ctx));
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }

  addLevel(level) {
    this.levels.push(level);
    if (this.levels.length === 1) {
      this.setLevel(0);
    }
  }

  setLevel(index) {
    if (index >= 0 && index < this.levels.length) {
      this.sprites = [];
      this.levelIndex = index;
      this.levels[index].init();
    }
  }

  changeLevel(index) {
    this.pendingLevel = index;
  }

  nextLevel() {
    this.setLevel(this.levelIndex + 1);
  }

  previousLevel() {
    this.setLevel(this.levelIndex - 1);
  }

  restartLevel() {
    this.setLevel(this.levelIndex);
  }

  bindKeyboardEvents() {
    window.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    window.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });
  }

  bindMouseEvents() {
    this.canvas.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener("mousedown", (e) => {
      this.mouse.down = true;
      this.mouse.clicked = true;
    });

    this.canvas.addEventListener("mouseup", (e) => {
      this.mouse.down = false;
    });

    this.canvas.addEventListener("mouseleave", (e) => {
      this.mouse.down = false;
    });
  }
}
