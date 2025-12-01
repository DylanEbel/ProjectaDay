let mouseDist = 50;
let size = 10; let offset =4; let margin = 2
let cols; let rows;
let blocks = [];


function setup() {
  createCanvas(400, 400);
  rectMode(CENTER)
  angleMode(DEGREES)
  cols = width / size
  rows = height / size

  for (let i = 0; i < cols; i++) {
    blocks[i] = []
    for (let j = 0; j < rows; j++) {
      blocks[i][j] = new Block(i * size + size/2, j * size + size/2)
    }
  }
}

function draw() {
  background(0)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        blocks[i][j].move()
        blocks[i][j].display()
      }
    }

}
