//  Tiles store all the "zones" of the canvas
let tiles = [];

// I use this method to have a responsive grid. Add or remove zones if needed.
// Define canvas size (we need to know this to split it into zones)
let canvasWidth = 500;
let canvasHeight = 500;
// Define number of zones in X and Y direction
let zonesX = 5;
let zonesY = 2;
// Calculate tile width and height based on number of zones
let tileWidth = canvasWidth / zonesX;
let tileHeight = canvasHeight / zonesY;

// leds pins are stored in an array
let ledsPins = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// variable to store all the leds J5 objects
let leds = [];


// a function to create the tiles and put them in the tiles array
function generateTiles() {
    let indexLed = 0;
    for (let y = 1; y < canvasHeight; y += canvasHeight / zonesY) {             // we create 2 rows
        for (let x = 1; x < canvasWidth; x += canvasWidth / zonesX) {           // we create 5 columns for each row
            tiles.push({
                x: x, 
                y: y,
                currentlyOn: false, 
                attachedLed: ledsPins[indexLed]
            }); // we create the tile object and add it to the tiles array
            indexLed++;
        }
    }
}

function preload() {
    // Load ressources before setup
}

function setup() {
    // Code that runs once here
    createCanvas(canvasWidth, canvasHeight).parent("sketch-container");

    // genertae the tiles
    generateTiles();

    // draw all tiles in gray at the beginning
    tiles.forEach(tile => {
        fill(100);
        rect(tile.x, tile.y, tileWidth, tileHeight);
    });

    // initialize all the leds and store them in the leds array
    leds = new five.Leds(ledsPins);
}

function draw() {
    // Code that runs repeatedly code here
    
    // check each tile and see if mouse is inside
    tiles.forEach(tile => {
        // we check on X axis
        if(mouseX > tile.x && mouseX < tile.x + tileWidth){
            // then we check on Y axis
            if(mouseY > tile.y && mouseY < tile.y + tileHeight){
                // then we make we didn't already trigger this tile
                if(!tile.currentlyOn){
                    // debug
                    console.log("You entered tile at position: ", tile.x, tile.y);

                    // turn on the attached led
                    leds[tile.attachedLed].on();

                    // set a timeout to turn off the led after 1 second
                    setTimeout(() => {   
                        // turn on the attached led for 1 second
                        leds[tile.attachedLed].off();                     

                        // then set back the tile to false after 1 second
                        tile.currentlyOn = false;
                    }, 1000);

                    // set the tile as currently on to avoid retriggering
                    tile.currentlyOn = true;
                }
            }
        }
    });

    
}