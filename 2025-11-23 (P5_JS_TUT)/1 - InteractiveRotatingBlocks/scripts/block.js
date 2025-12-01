class Block {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.angle = 0
        this.moveAgain = true
        this.c = 70
    }

    display() {
        stroke(this.c);
        noFill()
        push()
        translate(this.x, this.y)
        rotate(this.angle)
        this.drawRect()
        pop()
    }

    move() {
        let distance = dist(mouseX, mouseY, this.x, this.y)

        if (distance < mouseDist && dist(pmouseX, pmouseY, mouseX, mouseY) > 1) {
            this.angle = 0
            this.c = 255
            this.increment()
        } 
        else {
            if (this.angle > 0 && this.angle < 90) {
            this.increment()
            } else {
                this.angle = 0
            }
        } 
    }

    increment() {
        this.angle++
        this.c -= 3
        if (this.angle > 90) {
            this.angle = this.angle % 90
        }
        if (this.c < 70) {
            this.c = 70
        }
    }
    
    drawRect() {
        rect(0, 0, size- offset, size- offset)

    }

    drawX() {
        translate( - size/2, - size/2)
        line(margin, margin, size - margin, size- margin)
        line(margin, size - margin, size- margin, margin)

    }
}