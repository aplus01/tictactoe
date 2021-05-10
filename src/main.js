import Game from './game.js';

const canvas = document.getElementById('game-board');
canvas.width = 900;
canvas.height = 900;

const ctx = canvas.getContext('2d');
const game = new Game(700, 700, 5);
game.buildBoard(ctx);

// ctx.fillStyle = '#00FF0040';
// ctx.fillRect(50, 50, 245, 245);   // 50,50 295, 295
// ctx.fillRect(305, 50, 290, 245);  // 305, 50 595, 295
// ctx.fillRect(605, 50, 245, 245);  // 605, 50 850, 295

// ctx.fillStyle = '#00FFFF40';
// ctx.fillRect(50, 305, 245, 290);  // 50,305  295, 595
// ctx.fillRect(305, 305, 290, 290); // 305, 305  595, 595
// ctx.fillRect(605, 305, 245, 290); // 605, 305 850, 595

// ctx.fillStyle = '#FFF00F40';
// ctx.fillRect(50, 605, 245, 245);   // 50, 605   295, 295
// ctx.fillRect(305, 605, 290, 245);  // 305, 605  595, 850
// ctx.fillRect(605, 605, 245, 245);  // 605, 605  850, 850
