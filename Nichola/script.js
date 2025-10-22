document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const gridSize = 72;

    // generate cells
    for(let i = 1; i <= gridSize; i++){
        grid.innerHTML += `
            <div id="cell-${i}" data-state="off" class="cell"></div>
        `;
    }

    grid.addEventListener("click", (e) => {
        const selectedCell = e.target;
        selectedCell.dataset.state = selectedCell.dataset.state === "off" ? "on" : "off";
        // console.log(target);

    });


    // reset button
    const reset = document.getElementById("reset");
    reset.addEventListener("click", () => {
        grid.querySelectorAll(".cell").forEach(cell => {
            cell.dataset.state = "off";
        });
    });

    // save button
    const save = document.getElementById("save");
    save.addEventListener("click", () => {
        const states = [];
        grid.querySelectorAll(".cell").forEach(cell => {
            states.push(cell.dataset.state);
        });
        console.log(states); // to send to adafruitIO
    });

});