const canvasHolder = document.getElementById("canvas-holder")
const numInputs = document.getElementById("num-points")
const resetButton = document.getElementById("reset")
const startButton = document.getElementById("start")

let array; let solver
let solving = false
const offset = 30
let points = numInputs.value
// numInputs.onchange = (e) => points = Number(e.target.value)

function setup() {
  const c = createCanvas(400, 400);
  c.parent(canvasHolder)
  numInputs.addEventListener('change', (e) => {points = e.target.value; setupSolving()})
  resetButton.onclick = () => setupSolving()
  startButton.onClick = () => solving = true
  setupSolving()
}

function setupSolving() {
  solving = false
  array = new RandArray(numInputs)
  array.SetUpArray()
  solver = new Solver()
  solver.GetMoveMap(array.blocks)
}

let ticker = 0
let stopTime = 60
function draw() {
  background(220);
  array.DisplayArray()
  ticker++
  if (ticker >= 1) {
    ticker = 0
    solver.Forward()
    
  }

}

class Solver {
  Forward() {
    if (this.curSequence < this.sequenceLength) {
      let sequence = this.moveMap[this.curSequence]
      const {i, j} = sequence

      array.Swap(i, j)
      this.curSequence++
    }
  }

  GetMoveMap(array) {
    this.array = array
    this.curSequence = 0
    this.moveMap = []
    let arrayCopy = MathTools.DeepCopy(array);

    for (let i = 0; i < arrayCopy.length; i++) {
      for (let j = 0; j < arrayCopy.length; j++) {
        if (arrayCopy[i].value < arrayCopy[j].value && i > j) {
          [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
          this.moveMap.push({i, j})
        }
      }
    }
    this.sequenceLength = this.moveMap.length
  }
}

class RandArray {
  constructor(pointsInput) {
    this.numInputs = pointsInput
    this.SetUpArray()
  }

  SetUpArray() {
    this.blocks = []
    const avgBlockWidth = ((width - offset * 2)/ points) 
    const randArray = MathTools.randomArray(points)

    for (let i = 0; i < points; i++) { 
      const x = avgBlockWidth * (i) + offset
      const y = height - offset
      const value = randArray[i]
      const blockHeight = map(value, 0, points, 0, 300)

      const block = new Block(x, y, blockHeight, avgBlockWidth)
      this.blocks.push({value, block})
    }
  }

  DisplayArray() {
    for (let i = 0; i < this.blocks.length; i++) {
      const block = this.blocks[i]
      block.block.display()
    }
  }

  Swap(i, j) {
    [this.blocks[i], this.blocks[j]] = [this.blocks[j], this.blocks[i]]
    const iX = this.blocks[i].block.x
    const jX = this.blocks[j].block.x

    this.blocks[i].block.move(jX)
    this.blocks[j].block.move(iX)

    print(this.blocks)
  }
}

class Block {
  constructor(x, y, height, blockWidth) {
    this.x = x
    this.y = y
    this.height = -height
    this.width = blockWidth
  }

  move(x) {
    this.x = x
  }

  display() {
    push()
    translate()
    rect(this.x, this.y, this.width, this.height)
    pop()
  }
}

class MathTools {
  static randomArray(l) {
    const array = Array.from({length: l}, (_, i) => (i +  1))

    for (let i = array.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));

      [array[i], array[rand]] = [array[rand], array[i]]
    }
    return array
  }

  static DeepCopy(array) {
    let copyArray = []

    for (let i = 0; i < array.length; i++) {
      copyArray[i] = array[i]
    }

    return copyArray
  }
}