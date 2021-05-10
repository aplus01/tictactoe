import InputHandler from './input-handler.js';

export const TURN = {
  EX: 0,
  OH: 1,
};
export default class Game {
  constructor(ctx, width, height, lineWidth) {
    this.gameWidth = width;
    this.gameHeight = height;
    this.lineWidth = lineWidth;
    this.ctx = ctx;
    this.turn = TURN.EX;
    this.won = false;
    this.buildHitbox();

    new InputHandler(this);
    this.exs = [];
    this.ohs = [];
  }

  buildBoard() {
    this.ctx.fillStyle = '#00000080';
    this.ctx.fillRect(0, 0, innerWidth, innerHeight);

    this.ctx.strokeStyle = '#F00FFF80';
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();

    this.ctx.moveTo(this.gameWidth / 3, 50);
    this.ctx.lineTo(this.gameWidth / 3, this.gameHeight - 50);

    this.ctx.moveTo((this.gameWidth * 2) / 3, 50);
    this.ctx.lineTo((this.gameWidth * 2) / 3, this.gameHeight - 50);

    this.ctx.moveTo(50, this.gameHeight / 3);
    this.ctx.lineTo(this.gameWidth - 50, this.gameHeight / 3);

    this.ctx.moveTo(50, (this.gameHeight * 2) / 3);
    this.ctx.lineTo(this.gameWidth - 50, (this.gameHeight * 2) / 3);

    this.ctx.stroke();
  }

  buildHitbox() {
    const third = this.gameWidth / 3;
    this.hitBoxes = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        this.hitBoxes.push({ x: r * third, y: c * third, w: third, h: third });
      }
    }
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  drawHitBoxes() {
    Math.seedrandom(new Date().getTime().toString());
    this.hitBoxes.forEach((box) => {
      this.ctx.fillStyle = `rgba(
      ${this.getRandomIntInclusive(0, 256)},
      ${this.getRandomIntInclusive(0, 256)},
      ${this.getRandomIntInclusive(0, 256)},
      .5
    )`;
      this.ctx.fillRect(box.x, box.y, box.w, box.h);
    });
  }

  markSquare(square, position) {
    let color;
    let text;
    if (square.marked) return;
    if (this.turn === TURN.EX) {
      color = 'red';
      text = 'X';
      this.exs.push(position);
    } else {
      color = 'blue';
      text = 'O';
      this.ohs.push(position);
    }
    square.marked = true;
    this.ctx.strokeStyle = color;
    this.ctx.font = '120px Verdana';
    this.ctx.textAlign = 'center';
    this.ctx.strokeText(
      text,
      square.x + square.w * 0.5,
      square.y + square.h * 0.7
    );
    this.checkVictory();

    this.turn = this.turn === TURN.OH ? TURN.EX : TURN.OH;
  }

  // 0 3 6
  // 1 4 7
  // 2 5 8
  checkVictory() {
    const turnsToCheck = this.turn === TURN.OH ? this.ohs : this.exs;

    // prettier-ignore
    const winning = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [3, 4, 5],
      [6, 7, 8],
    ];

    for (let i = 0; i < winning.length; i++) {
      this.won = winning[i].every((w) => turnsToCheck.includes(w));
      if (this.won) {
        this.ctx.fillStyle = '#00FF0040';
        this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
        return;
      }
    }
  }

  detectHit(position) {
    for (let b = 0; b < this.hitBoxes.length; b++) {
      if (
        position.x >= this.hitBoxes[b].x &&
        position.x <= this.hitBoxes[b].x + this.hitBoxes[b].w &&
        position.y >= this.hitBoxes[b].y &&
        position.y <= this.hitBoxes[b].y + this.hitBoxes[b].h
      ) {
        console.log(`hit:${b}`);
        this.markSquare(this.hitBoxes[b], b);
        return;
      }
    }
  }
}
