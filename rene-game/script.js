// we create a adafruitIO object
const username = "secret";
const activeKey = "secret";
const IO = new AdafruitIO(username, activeKey);

// game variables
const base = 50;
let canvasSize = 400;

// player start at the center of the screen
let playerPosX = canvasSize/2;
let playerPosY = canvasSize/2;
let joystickX, joystickY;

// image for the player
let playerImage;


// update player position every 2 seconds
setInterval(function(){
    IO.getData("joystick", function(data){
        //debug
        console.log(data.json[0].value);
        // parse the data to get joystick value
        /*
            we receive the joystick data as an array (string) 
            [ 1000, 512, 1 ]
               |     |   L the button state
               |     | 
               |     L the joystick on Y axis
               |
               L the joystick on X axis

            So, we need to parse the data
        */
        let ldata = data.json[0].value;
        joystickX = ldata.split(',')[0].substring(1, ldata.length -1);
        joystickY = ldata.split(',')[1];

        // then translate the data into a direction for the player
        /*
            Values we should get from the joystick

            |-----------------*-----------------|
            0                512               1023
            |_________________|                  |
                     |        |__________________|
                     |         ^           L player goes forward
                     |         L player doesnt move
                     |
            if value is in this range 
            the player goes backward
        */
       // minified if statement to update player position from joystick data
       if(joystickX < 500) playerPosX -= base;
       else if(joystickX > 530) playerPosX += base;

       if(joystickY < 500) playerPosY -= base;
       else if(joystickY > 530) playerPosY += base;

       // if player is out of canvas, reposition it
        if(playerPosX > canvasSize)playerPosX = 0;
        if(playerPosX < 0)playerPosX = canvasSize;
        if(playerPosY > canvasSize)playerPosY = 0;
        if(playerPosY < 0)playerPosY = canvasSize;


    });
}, 2000);


function preload(){
    playerImage = loadImage("resetti.png");
}

function setup() {
    let myCanvas = createCanvas(canvasSize, canvasSize);
    myCanvas.parent("canvasPos");

    
}

function draw() {
    background(20);

    // draw the player
    fill("#FF0000");
    // rect(playerPosX, playerPosY, base);
    image(playerImage, playerPosX, playerPosY, base, base);

    
}