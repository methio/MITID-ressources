
const slider = document.getElementById("volume");
let sliderVal = 0;
const tog = document.getElementById("Play");
let togVal = false;


/*
    Play            |   toggle
    Volume          |   knob
    Reverb          |   knob
    Speed           |   knob
    Delay           |   knob
    Distortion      |   knob
*/

// setup all the knobs
let knobReverb, knobSpeed, knobDelay, knobDistortion;
let togglePlay;

// colors
let colors = ["#E65213", "#1A2E5C", "#0282D8", "#F9F4DA"];

function setup() {
    createCanvas(100, 400);
    angleMode(DEGREES);

    togglePlay =      new Toggle(20, .8*(height/6), 60, 30, colors[1], colors[0], colors[1], colors[3]);
    knobReverb =      new Knob(width/2, 2*(height/6));
    knobSpeed =       new Knob(width/2, 3*(height/6));
    knobDelay =       new Knob(width/2, 4*(height/6));
    knobDistortion =  new Knob(width/2, 5*(height/6));
}

function draw() {
    background(colors[3]);

    // update display of elements
    togglePlay.display(togVal);
    knobReverb.rotate(sliderVal);
    knobSpeed.rotate(sliderVal);
    knobDelay.rotate(sliderVal);
    knobDistortion.rotate(sliderVal);
}

// for this example we listen to slider and checkbox instead of adafruitIO data
slider.addEventListener("input", (event) => {
    let volume = event.target.value;
    let mVolume = parseInt(map(volume, 0, 1, 0, 360));
    sliderVal = mVolume;
    console.log(`Volume: ${volume}  Mapped Volume: ${mVolume}`);
});

tog.addEventListener("click", (event) => {
    togVal = tog.checked;
    console.log(`Checkbox state is: ${togVal}`);
});



// we create a class to create the knobs
class Knob {
    constructor(x, y, size = 50, col1 = colors[0] , col2 = colors[1]) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.col1 = col1;
        this.col2 = col2;
    }

    display() {
        stroke(this.col1);
        strokeWeight(3);
        fill(this.col1);
        drawingContext.setLineDash([10,10]);
        circle(0, 0, this.size);
        noStroke();
        fill(this.col2);
        rect(-3, -this.size/2 + 3, 6, 20, 5);
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

class Toggle {
    constructor(posX, posY, width, height, colorOn1, colorOn2, colorOff1, colorOff2){
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.colorOn1 = colorOn1;
        this.colorOn2 = colorOn2;
        this.colorOff1 = colorOff1;
        this.colorOff2 = colorOff2;
        this.padding = this.height/2;
    }

    display(state = true){
        push();
            translate(this.posX, this.posY);  
            if(state){
                //on
                stroke(this.colorOn1);
                strokeWeight(1);
                fill(this.colorOn2);
                rect(0, 0, this.width, this.height, this.height/2);
                noStroke();
                fill(this.colorOn1);
                circle(this.padding, this.height/2, this.height - (this.height/4));              

            }else{
                //off
                stroke(this.colorOff1);
                strokeWeight(1);
                fill(this.colorOff2);
                rect(0, 0, this.width, this.height, this.height/2);
                noStroke();
                fill(this.colorOff1);
                circle(this.width - this.padding, this.height/2, this.height - (this.height/4));
            }
        pop();
    }
}
