
const slider = document.getElementById("volume");
let sliderVal = 0;
let knobe;
let knooob;

let colors = ["#57564F", "#F8F3CE"];

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);

    knobe = new Knob(width/3, height/3, colors[0], colors[1]);
    knooob = new Knob(30, 30, colors[0], colors[1]);
}

function draw() {
    background(220);
    // knobe.display();
    knobe.rotate(sliderVal);
    knooob.rotate(sliderVal);

}

slider.addEventListener("input", (event) => {
    let volume = event.target.value;
    let mVolume = parseInt(map(volume, 0, 1, 0, 360));
    sliderVal = mVolume;
    console.log(`Volume: ${volume}  Mapped Volume: ${mVolume}`);
});


class Knob {
    constructor(x, y, col1, col2) {
        this.x = x;
        this.y = y;
        this.col1 = col1;
        this.col2 = col2;
    }

    display() {
        stroke(this.col1);
        strokeWeight(3);
        fill(this.col1);
        drawingContext.setLineDash([10,10]);
        ellipse(0, 0, 50, 50);
        noStroke();
        fill(this.col2);
        rect(-3, -25, 6, 20);
    }

    rotate(angle) {
        push();
        translate(this.x, this.y);
        push();        
        rotate(angle);
        this.display();
        pop();
        pop();
    }

}
