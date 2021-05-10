export default class Game {
  constructor(width, height, lineWidth) {
    this.width = width;
    this.height = height;
    this.lineWidth = lineWidth;
  }

  buildBoard(ctx) {
    ctx.fillStyle = '#00000080';
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    ctx.strokeStyle = '#F00FFF80';
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = 'round';
    ctx.beginPath();

    ctx.moveTo(this.width / 3, 50);
    ctx.lineTo(this.width / 3, this.height - 50);

    ctx.moveTo((this.width * 2) / 3, 50);
    ctx.lineTo((this.width * 2) / 3, this.height - 50);

    ctx.moveTo(50, this.height / 3);
    ctx.lineTo(this.width - 50, this.height / 3);

    ctx.moveTo(50, (this.height * 2) / 3);
    ctx.lineTo(this.width - 50, (this.height * 2) / 3);

    ctx.stroke();
  }
}
