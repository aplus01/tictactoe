export default class InputHandler {
  constructor(game) {
    document.addEventListener('mousedown', (mouseEvent) => {
      game.detectHit({ x: mouseEvent.clientX, y: mouseEvent.clientY });
    });
  }
}
