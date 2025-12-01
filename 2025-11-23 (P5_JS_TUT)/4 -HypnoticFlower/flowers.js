class Flower {
    constructor(r, pts, f_amp, period, speed) {
        this.x = []
        this.y = []

        this.pts = pts
        
        this.r = r 
        this.f_amp = f_amp
        this.period = period
        this.speed = speed

        this.angle = 0

        setup()
    }

    setup() {
        for (let i = 0; i < pts; i++) {
            let angle = i/pts * 360
            f_radius = 8 * sin(angle * 80)
            x[i] = (r + f_radius)* cos(angle)
            y[i] = (r + f_radius) * sin(angle)
            vertex(x[i], y[i])
        }
    }

    display() {
        noFill()
  
        beginShape()
        for (let i = 0; i < pts; i++) {
            let angle = i/pts * 360
            f_radius = 8 * sin(angle * 80)
            x[i] =( r + f_radius)* cos(angle)
            y[i] = (r + f_radius) * sin(angle)
            vertex(x[i], y[i])
        }
        endShape(CLOSE)

        t
    }
}