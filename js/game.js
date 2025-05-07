// Sprite Class
class Sprite {
  constructor() {}

  // Update Sprite
  update() {}

  // Draw Sprite
  draw(ctx) {}
}

// Level Class
class Level {
  constructor(game) {
    this.game = game;
  }

  init() {}
}

// Main Game Class
class Game {
  constructor() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.sprites = [];
    this.keys = {};
    this.levelIndex = 0;
    this.levels = [];
    this.pendingLevel = null;
    this.paused = false;
    this.mouse = { x: 0, y: 0, clicked: false };
    this.bindMouseEvents();
    this.bindKeyboardEvents();
  }

  // Add Sprite To Game
  addSprite(sprite) {
    this.sprites.push(sprite);
  }

  // Update Game
  update() {
    // Skip Update & Return
    if (this.paused) return;

    // Update Sprites
    let updatedSprites = [];
    // Update Each Sprite
    for (let i = 0; i < this.sprites.length; i++) {
      let sprite = this.sprites[i];
      // If Sprite Is Not Updated, Add To Updated Sprites
      if (!sprite.update(this.sprites, this.keys)) {
        updatedSprites.push(sprite);
      }
    }
    // Update Sprites
    this.sprites = updatedSprites;

    // If Pending Level, Set Level
    if (this.pendingLevel !== null) {
      this.setLevel(this.pendingLevel);
      this.pendingLevel = null;
    }
  }

  // Draw Game
  draw() {
    // Clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // Draw Sprites
    this.sprites.forEach((sprite) => sprite.draw(this.ctx));
  }

  // Animate Game
  animate() {
    // Update Game
    this.update();
    // Draw Game
    this.draw();
    // Request Animation Frame
    requestAnimationFrame(() => this.animate());
  }

  // Add Level To Game
  addLevel(level) {
    this.levels.push(level);
    if (this.levels.length === 1) {
      this.setLevel(0);
    }
  }

  // Set Level
  setLevel(index) {
    if (index >= 0 && index < this.levels.length) {
      this.sprites = [];
      this.levelIndex = index;
      this.levels[index].init();
    }
  }

  // Change Level
  changeLevel(index) {
    this.pendingLevel = index;
  }

  // Next Level
  nextLevel() {
    this.setLevel(this.levelIndex + 1);
  }

  // Previous Level
  previousLevel() {
    this.setLevel(this.levelIndex - 1);
  }

  // Restart Level
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

  // Bind Mouse Events
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
