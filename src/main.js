import Game from './game.js';

const canvas = document.getElementById('game-board');
canvas.width = 700;
canvas.height = 700;

const ctx = canvas.getContext('2d');
const game = new Game(ctx, 700, 700, 3);
game.buildBoard();
