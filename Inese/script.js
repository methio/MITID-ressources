document.addEventListener("DOMContentLoaded", function(){

    // target the div which as the blur effect
    const blur = document.getElementById("sun-blur");

    // Before the Adafruit Version, I created a local version with a slider. 
    // I target slider to make the blur move. You change it to the adafruit value
    const slider = document.getElementById("moveBlur");
    slider.addEventListener("input", function(event){
        let value = parseFloat(event.target.value); // slider value
        blur.style.marginTop = `-${value}px`;       // update blur effect position

        console.log(value); // debug
    });

    /*  
        setInterval is a way to execute code every X milliseconds
        doc: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
    */
    setInterval(function(){
        // here we can use AdafruitIO library to get data. 
        // then, we can modify the blur position (up or down)
        // blur.style.marginTop = `-${value}px`;
        
    }, 3000);
});