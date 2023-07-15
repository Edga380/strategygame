// Mouse variables
let mouseCurrentPosX = 0;
let mouseCurrentPosY = 0;
let mousePreviousPosX = 0;
let mousePreviousPosY = 0;
let mouseLeftButtonPressDown = false;
let mouseRightButtonPressDown = false;
let selectArmy = false;
// Cursor
const cursorFixTool = new Image();
cursorFixTool.src = "./images/UI/fixToolCursor.png";
const cursorSellTool = new Image();
cursorSellTool.src = "./images/UI/sellToolCursor.png";
//Prevent right click options list from appearing
canvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
// Mouse button pressdown
canvas.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(event) {
    // Get canvas rect
    let rect = canvas.getBoundingClientRect();
    // Calculate mouse position x and y 
    let mouseX = Math.floor(event.clientX - rect.left);
    let mouseY = Math.floor(event.clientY - rect.top);
    // check if game still running
    if(!youWin && !youLose && startGame){
        switch(event.button){
            // Right mouse button
            case 2:
                mouseRightButtonPressDown = true;
                // Set variables to false
                selectedBuilding.isSelected = false;
                fixButtonActive = false;
                sellButtonActive = false;
                break;
            // left mouse button
            case 0:
                // Attack enemy buildings on press
                AttackBuildings(mouseX, mouseY);
                // Move army units to
                const tileCoorX = Math.floor(mouseCurrentPosX + cameraX); // Get tile x coordinates
                const tileCoorY = Math.floor(mouseCurrentPosY + cameraY); // Get tile y coordinates
                // If building is selected and building is over buildable area build building otherwise give error message
                selectedBuilding.isSelected && BuildableArea() ? Build() : currentPage === 0 && selectedBuilding.isSelected ? informationText.push({string: "You can't build here.", color: "red"}) : null;
                // Move selected army units to tile x/y coordinates
                moveUnitTo[0].x = tileCoorX;
                moveUnitTo[0].y = tileCoorY;
                // Set mouse left button down to true
                mouseLeftButtonPressDown = true;
                break;
            // Scroll wheel press
            case 1:
                // Add cash to player 1000
                player.cash += 1000;
                break;
        }
        // Set mouse previuos position x,y equil to current mouse position
        mousePreviousPosX = mouseX;
        mousePreviousPosY = mouseY;
    }
    // Start game/Play again button position
    else if(mouseX > 360 && mouseX < 570 && mouseY > 460 && mouseY < 560){
        if(!startGame){
            startGame = true;
            // Start setInterval for enemy vawes
            AttackPlayer();
        }
        else if(youWin || youLose){
            // Reload page
            location.reload();
        }
    }
    // Information button position
    else if(mouseX > 730 && mouseX < 940 && mouseY > 10 && mouseY < 110){
        if(!startGame){
            // Open new window in browser
            window.open("https://github.com/Edga380/strategygame");
        }
    }
};
// Mouse button release
canvas.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(event) {
    if(startGame && !youWin && !youLose){
        switch(event.button){
            // Right mouse button
            case 2:
                mouseRightButtonPressDown = false;
                break;
                // Left mouse button
            case 0:
                mouseLeftButtonPressDown = false;
                // If select army variable true use SelectArmy function
                if(selectArmy){
                    SelectArmy();
                }
                // Move selected army units if select army is false
                else if(!selectArmy){
                    MoveVehicleSoldier();
                }
                selectArmy = false;
                // Sends mouse current coordinates to button pressed function to do other operations
                ButtonPressed(mouseCurrentPosX, mouseCurrentPosY);
                break;
        }
    }
};
//Mouse move
canvas.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(event) {
    // Get canvas rect
    let rect = canvas.getBoundingClientRect();
    // Calculate mouse position x and y 
    mouseCurrentPosX = Math.floor(event.clientX - rect.left);
    mouseCurrentPosY = Math.floor(event.clientY - rect.top);
    // If game finished don't run code below just return
    if(!startGame){
        return;
    }
    else if(!youWin && !youLose){
        if(mouseRightButtonPressDown){
            // Calculate difference between current mouse postion and previous mouse postion
            // Store difference into x and y
            let x = Math.floor(mouseCurrentPosX - mousePreviousPosX);
            let y = Math.floor(mouseCurrentPosY - mousePreviousPosY);
            // Checking for camera boundaries and moving it
            // X axis
            if(cameraX - x >= 0 && cameraX - x <= cameraBoundariesMaxX){
                cameraX -= x;
                mousePreviousPosX = mouseCurrentPosX;
            }
            // Y axis
            if(cameraY - y >= 0 && cameraY - y <= cameraBoundariesMaxY){
                cameraY -= y;
                mousePreviousPosY = mouseCurrentPosY;
            }
        }
    }
    // If mouse left button pressed down set select army variable to true
    if(mouseLeftButtonPressDown){
        selectArmy = true;
    }
};
// Page load then load player and enemy bases
window.addEventListener('load', LoadPlayerBase(), LoadEnemyBase());
// Select army
function SelectArmy(){
    // Army select less sensative
    if(mouseCurrentPosX + cameraX - 30 > mousePreviousPosX + cameraX || mouseCurrentPosX + cameraX + 30 < mousePreviousPosX + cameraX){
        // reset selected army array
        selectedVehiclesSoldiers = [];
        // Loop through stored vehicles and soldiers array
        for (let i = 0; i < storedVehiclesSoldiers.length; i++) { 
            // Check if stored army unit coordinates x/y are between mouse current position x/y and mouse previous position x/y
            // Check is made 4 times from all angles
            if(mousePreviousPosX + cameraX - 5 <= storedVehiclesSoldiers[i].x && mouseCurrentPosX + cameraX + 5 >= storedVehiclesSoldiers[i].x &&  mousePreviousPosY + cameraY - 5 <= storedVehiclesSoldiers[i].y && mouseCurrentPosY + cameraY + 5 >= storedVehiclesSoldiers[i].y ||
                mousePreviousPosX + cameraX + 5 >= storedVehiclesSoldiers[i].x && mouseCurrentPosX + cameraX - 5 <= storedVehiclesSoldiers[i].x &&  mousePreviousPosY + cameraY + 5 >= storedVehiclesSoldiers[i].y && mouseCurrentPosY + cameraY - 5 <= storedVehiclesSoldiers[i].y ||
                mousePreviousPosX + cameraX + 5 >= storedVehiclesSoldiers[i].x && mouseCurrentPosX + cameraX - 5 <= storedVehiclesSoldiers[i].x &&  mousePreviousPosY + cameraY - 5 <= storedVehiclesSoldiers[i].y && mouseCurrentPosY + cameraY + 5 >= storedVehiclesSoldiers[i].y ||
                mousePreviousPosX + cameraX - 5 <= storedVehiclesSoldiers[i].x && mouseCurrentPosX + cameraX + 5 >= storedVehiclesSoldiers[i].x &&  mousePreviousPosY + cameraY + 5 >= storedVehiclesSoldiers[i].y && mouseCurrentPosY + cameraY - 5 <= storedVehiclesSoldiers[i].y){
                // Is slected is set to true
                // All selected army units will have green cirle around them
                storedVehiclesSoldiers[i].isSelected = true;
                // Army unit is being pushed to selected vehicles/soldiers array
                selectedVehiclesSoldiers.push(storedVehiclesSoldiers[i]);
            }
            else{
                // Set is selected variable to false army units that are not selected will no longer have green circle around them
                storedVehiclesSoldiers[i].isSelected = false;
            }
        }
    }
};
// Attack enemy buildings on mouse press (mx = mouse x coordinates)(my = mouse y coordinates)
function AttackBuildings(mx, my){
    // check if selected vehicles/soldiers arrray is not empty
    if(selectedVehiclesSoldiers.length > 0){
        // Loop through stored enemy buildings array
        for (const building in enemyStoredBuildings) {
            // Check if mouse if over the building
            if(enemyStoredBuildings[building].x < mx + cameraX && enemyStoredBuildings[building].x + enemyStoredBuildings[building].width > mx + cameraX &&
                enemyStoredBuildings[building].y < my + cameraY && enemyStoredBuildings[building].y + enemyStoredBuildings[building].width > my + cameraY){
                    // Check if building includes enemy tag
                    if(enemyStoredBuildings[building].tag.includes("enemy")){
                        // Loop through selected vehicles/soldiers array 
                        for (const selectedVehicleSoldier in selectedVehiclesSoldiers) {
                            // Set current target for selected army units in the array to the building that been pressed on
                            selectedVehiclesSoldiers[selectedVehicleSoldier].currentTarget = enemyStoredBuildings[building];
                        }
                    }
            }
        }
    }
};
// Mouse cursor change
function ChangeMouseCursor(){
    // Change mouse cursor to fix tool cursor
    if(fixButtonActive){
        ctx.drawImage(cursorFixTool, mouseCurrentPosX - 12, mouseCurrentPosY - 12, 25, 25);
    }
    // Change mouse cursor to sell tool cursor
    else if(sellButtonActive){
        ctx.drawImage(cursorSellTool, mouseCurrentPosX - 12, mouseCurrentPosY - 12, 16, 25);
    }
    // Default mouse cursor green circle
    else{
        ctx.beginPath();
        ctx.arc(mouseCurrentPosX, mouseCurrentPosY, 20 / 2, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(0, 229, 229, 0.6)";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
};