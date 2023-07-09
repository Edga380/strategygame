// Mouse variables
let mouseCurrentPosX = 0;
let mouseCurrentPosY = 0;
let mousePreviousPosX = 0;
let mousePreviousPosY = 0;
let mouseLeftButtonPressDown = false;
let mouseRightButtonPressDown = false;
let selectArmy = false;
//Prevent right click options list from appearing
canvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
// Mouse button pressdown
canvas.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = Math.floor(event.clientX - rect.left);
    let mouseY = Math.floor(event.clientY - rect.top);
    if(!startGame && mouseX > 360 && mouseX < 570 && mouseY > 460 && mouseY < 505){
        startGame = true;
    }
    else if(!youWin && !youLose){
        switch(event.button){
            case 2:
                mouseRightButtonPressDown = true;
                selectedBuilding.isSelected = false;
                break;
            case 0:
                // Attack enemy buildings on press
                AttackBuildings(mouseX, mouseY);
                //testing
                const tileCoorX = Math.floor(mouseCurrentPosX + cameraX);
                const tileCoorY = Math.floor(mouseCurrentPosY + cameraY);
                //console.log("tileX = " + tileCoorX * tileWidth);
                //console.log("tileY = " + tileCoorY * tileHeight);
                //console.log(selectedVehiclesSoldiers.length > 0 ? selectedVehiclesSoldiers[0].x : null);
                //testing
                mouseLeftButtonPressDown = true;
                selectedBuilding.isSelected && BuildableArea() ? Build() : currentPage === 0 && selectedBuilding.isSelected ? informationText.push({string: "You can't build here.", color: "red"}) : null;
                moveUnitTo[0].x = tileCoorX;
                moveUnitTo[0].y = tileCoorY;
                break;
            case 1:
                player.cash += 1000;
                break;
        }
        mousePreviousPosX = mouseX;
        mousePreviousPosY = mouseY;
    }
};
// Mouse button release
canvas.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(event) {
    if(startGame && !youWin && !youLose){
        switch(event.button){
            case 2:
                mouseRightButtonPressDown = false;
                break;
            case 0:
                mouseLeftButtonPressDown = false;
                if(selectArmy){
                    SelectArmy();
                }
                else if(!selectArmy){
                    MoveVehicleSoldier();
                }
                selectArmy = false;
                ButtonPressed(mouseCurrentPosX, mouseCurrentPosY);
                break;
        }
    }
};
//Mouse move
canvas.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(event) {
    let rect = canvas.getBoundingClientRect();
    mouseCurrentPosX = Math.floor(event.clientX - rect.left);
    mouseCurrentPosY = Math.floor(event.clientY - rect.top);
    if(!startGame){

    }
    else if(!youWin && !youLose){
        if(mouseRightButtonPressDown){
            let x = Math.round(mouseCurrentPosX - mousePreviousPosX);
            let y = Math.round(mouseCurrentPosY - mousePreviousPosY);
            // Checking for camera boundaries and moving it
            if(cameraX - x >= 0 && cameraX - x <= cameraBoundariesMaxX){
                cameraX -= x;
                mousePreviousPosX = mouseCurrentPosX;
            }
            if(cameraY - y >= 0 && cameraY - y <= cameraBoundariesMaxY){
                cameraY -= y;
                mousePreviousPosY = mouseCurrentPosY;
            }
        }
    }
    //
    if(mouseLeftButtonPressDown){
        selectArmy = true;
    }
};
// Mouse move stop
canvas.addEventListener("mousemove", mouseStopMoveHandler, false);
function mouseStopMoveHandler(){
    mouseIsmoving = false;
};
// Page load then start gameloop
window.addEventListener('load', LoadPlayerBase(), LoadEnemyBase());
// Select army
function SelectArmy(){
    selectedVehiclesSoldiers = [];
    for (let i = 0; i < storedVehiclesSoldiers.length; i++) {
        if(mousePreviousPosX + cameraX - 5 <= storedVehiclesSoldiers[i].x && mouseCurrentPosX + cameraX + 5 >= storedVehiclesSoldiers[i].x &&  mousePreviousPosY + cameraY - 5 <= storedVehiclesSoldiers[i].y && mouseCurrentPosY + cameraY + 5 >= storedVehiclesSoldiers[i].y ||
            mousePreviousPosX + cameraX + 5 >= storedVehiclesSoldiers[i].x && mouseCurrentPosX + cameraX - 5 <= storedVehiclesSoldiers[i].x &&  mousePreviousPosY + cameraY + 5 >= storedVehiclesSoldiers[i].y && mouseCurrentPosY + cameraY - 5 <= storedVehiclesSoldiers[i].y){
            selectedVehiclesSoldiers.push(storedVehiclesSoldiers[i]);
        }
    }
};
// Attack enemt buildings on mouse press
function AttackBuildings(mx, my){
    if(selectedVehiclesSoldiers.length > 0){
        for (const building in enemyStoredBuildings) {
            if(enemyStoredBuildings[building].x < mx + cameraX && enemyStoredBuildings[building].x + enemyStoredBuildings[building].width > mx + cameraX &&
                enemyStoredBuildings[building].y < my + cameraY && enemyStoredBuildings[building].y + enemyStoredBuildings[building].width > my + cameraY){
                    if(enemyStoredBuildings[building].tag.includes("enemy")){
                        for (const selectedVehicleSoldier in selectedVehiclesSoldiers) {
                            selectedVehiclesSoldiers[selectedVehicleSoldier].currentTarget = enemyStoredBuildings[building];
                        }
                    }
            }
        }
    }
};