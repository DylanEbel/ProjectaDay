let x = []; let y = [];
let pts = 100; let r = 100; let f_radius

let flowers = []

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES)

  flowers[0] = new Flower(r, pts, 50, 2, 8)

}

function draw() {
  background(220);
  translate(width/2, height/2)
  
}
