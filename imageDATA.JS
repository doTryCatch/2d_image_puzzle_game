class imgPixels {
  constructor(x, y, row, col) {
    this.w = x;
    this.h = y;
    this.row = row;
    this.col = col;
  }

  drawBoard(c) {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        c.beginPath();
        c.moveTo(i * (this.w / this.row), window.innerHeight / 2);
        c.lineTo(i * (this.w / this.row), 0);
        c.strokeStyle = "white";
        c.stroke();
        c.beginPath();
        c.moveTo(window.innerWidth / 2, j * (this.h / this.col));
        c.lineTo(0, j * (this.h / this.col));
        c.strokeStyle = "white";
        c.stroke();
      }
    }
  }
}
