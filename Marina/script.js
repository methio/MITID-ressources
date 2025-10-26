
// we use P5.js library to create a canvas and create a display 
// we use P5.sound to easily load/play/manipulate audio in the navigator
// we use tone.js to create sounds and sequences

let song;
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('pause-button');
const toggleButton = document.getElementById('toggle-button');
let isPlaying = false;

const reverbSlider = document.getElementById('reverb');
let reverb; 
const volumeSlider = document.getElementById('volume');

const sineAmp = document.getElementById('sineAmp');
const sineFreq = document.getElementById('sineFreq');


let sineOsc; 

let bg;
let volume = .5;


function preload() {
    song = loadSound('assets/subwoofer-lullaby.mp3');
}


function setup() {
    createCanvas(400, 400);
    reverb = new p5.Reverb();
    sineOsc = new p5.Oscillator('sine');
    
}

function draw() {
    background(map(volume, 0, 1, 0, 255));
    
}


// CONTROLS 
// playButton.addEventListener('click', () => {
//     song.play();
//     isPlaying = true;

// });

// stopButton.addEventListener('click', () => {
//     song.pause();
//     isPlaying = false;
// });

toggleButton.addEventListener('click', () => {
    if(isPlaying){
        song.pause();
        isPlaying = false;
        sineOsc.amp(0);



    }else{
        song.play();
        isPlaying = true;

        sineOsc.start();
        sineOsc.amp(.8);
    }

});


volumeSlider.addEventListener('input', (event) => {
    volume = parseFloat(event.target.value);
    console.log(volume, typeof(volume));
    song.setVolume(volume);
});

reverbSlider.addEventListener('input', (event) => {
    const rev = parseFloat(event.target.value);
    reverb.process(song, rev, 2);
    // song.amp(amplitude);
});

sineAmp.addEventListener("input", (event) => {
    const amp = parseFloat(event.target.value);
    
});