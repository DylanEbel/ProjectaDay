let size = 50
let cols, rows
let boxes = []
let font;
let msg = "H"; let points = []
let fontX = -135; let fontY = 140; let fontSize = 400;

function preload() {
  font = loadFont("font/Roboto-Bold.ttf")
}

function setup() {
  createCanvas(400, 400, WEBGL);
  angleMode(DEGREES)

  cols = width /size
  rows = height /size

  points = font.textToPoints(msg, fontX, fontY, fontSize)

  for (let i = 0; i < cols; i++) {
    boxes[i] = []
    for (let j = 0; j < rows; j++) {
      let x = size * (j) - width / 2 + size /2
      let y = size * (i) - height /2 + size/2
      let isLetter = false

      let minDistance = Infinity
      for (let k = 0; k < points.length; k++) {
        let pnt = points[k]
        let distance = dist(x, y, pnt.x, pnt.y)
        minDistance = min(distance, minDistance)
      }

      if (minDistance < 25) {
        isLetter = true
      } 

      let box = new Box(x, y, isLetter)
      boxes[i][j] = box
    }
  }
}

function draw() {
  background(0, 0, 139);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let box = boxes[i][j]
      box.display()
    }
  }

  
  // fill(255, 0 ,0)
  // for (let i =0; i < points.length; i++) {
  //   ellipse(points[i].x, points[i].y, 10, 10)
  // }
}


class Box {
  constructor(x, y, isLetter) {
    this.x = x
    this.y = y
    this.isLetter = isLetter
    this.angle = 0
    this.depth = 0
  }

  display() {
    push()
    noFill()
    if (this.isLetter) {
      stroke(255)
      this.angle += 1
      this.depth += 5* sin(5 * this.angle)
    } else {
      stroke(0, 0, 255)
      this.angle -= 1
      // this.depth += sin(this.angle)
    }

    translate(this.x, this.y, this.depth)
    rotateX(this.angle)
    rotateY(this.angle)
    box(size * 3/5)
    pop()
  }
}