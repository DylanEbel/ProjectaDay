let r = 150;
let numEnt = 18;
let Circles = []
let Lines = []
let angle = 0

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)

  for (let i = 0; i< numEnt; i++) {
    let angle = (360 / numEnt) * (i + 1)

    let x = r * cos(angle);
    let y = r * sin(angle);
    Circles[i] = new Circle(x, y, angle, r/2)    
  }

  for (let i = 0; i < 36; i++) {
    let angle = (360 / 36) * (i + 1)
    Lines[i] = new Line(r, angle)
  }
}

function draw() {
  background(220);
  // angle = map(mouseX, 0, width, -360, 360)
  angle++
  let x = (r / 2) * cos(angle)
  let y = (r / 2) * sin(angle)

  push()
  translate(width/2, height/2);
  noFill()
  ellipse(0, 0, 300, 300);
  pop()

  Lines.forEach(line => line.display())

  Circles.forEach(circle => {
    circle.move(angle, x, y)
    circle.display()
  });

  
  
}

class Circle {
  constructor(x, y, angle, r) {
    this.x = x
    this.y = y
    this.angle = angle
    this.r = r
  }

  display() {
    push()
    translate(width/2, height/2);
    fill(255, 0, 0);
    ellipse(this.x, this.y, 20, 20)
    pop()
  }

  move(angle, x, y) {
    // this.angle = this.angle + angle /100
    this.angle--
    
    this.x = this.r * cos(this.angle) + x;
    this.y = this.r * sin(this.angle) + y;
  }
}

class Line {
  constructor(r, angle) {
    this.angle = angle
    this.r = r
  }

  display() {
    push()
    translate(width/2, height/2)

    let x = r * cos(this.angle)
    let y = r * sin(this.angle)

    line(-x, -y, x, y)

    line()
    pop()
  }
}