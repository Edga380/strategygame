const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

//Canvas size
const CANVAS_WIDTH = canvas.width = 960;//960
const CANVAS_HEIGHT = canvas.height = 640;//640
//
let player = {cash: 7803, energy: 0};
//
let storedVehiclesAndSoldiers = [];
let selectedVehiclesAndSoldiers = [];
//Map
let loadMiniMap = false;
const mapTilesCountWidth = 36;
const mapTilesCountHeight = 36;
const mapTileWidth = 60;
const mapTileHeight = 60;
const mapTilesArray = [];
const miniMapTilesArray = [];
let tileLocOnTileMapImgX = 60;
let tileLocOnTileMapImgY = 0;
let rectLocationX = 750;
let rectLocationY = 62;
//Mouse
let mousePreviousPosX = 0;
let mousePreviousPosY = 0;
let mouseCurrentPosX = 0;
let mouseCurrentPosY = 0;
let mouseRightButtonPressDown = false;
let mouseLeftButtonPressDown = false;
let mouseIsmoving = false;
let moveToX = undefined;
let moveToY = undefined;
//UI
let drawSelect = false;
let informationText = [];
let yCoordinate = 20;
let uiTag = "Building";
let buildingPage = true;
let soldierPage = false;
let vehiclePage = false;
let storeCurrentBuilding;
let objectToDraw = false;
const buttons = [];
let pressedButton = false;
const uiElements = [];
//building
const buildingArray = [];
const buildableArea = [];
let storeCheckLimit = 0;
//Button class
class UiElements {
    constructor(src, x, y, height, width){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
class Button {
    constructor(src, x, y, height, width, tag, onClick, cost){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.tag = tag;
        this.onClick = onClick;
        this.cost = cost;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    buttonPressed(x, y){
        if(x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height){
            this.onClick();
        }
    }
}
//Sprites class
class Sprites {
    constructor(src, x, y, width, height, speed){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    draw (){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    movement(x, y){
        let dx = x - this.x;
        //console.log(dx);
        let dy = y - this.y;
        //console.log(dy);
        let distance = Math.sqrt(dx * dx + dy * dy);
        //console.log(distance);
        if(distance > this.speed){
            let ratio = this.speed / distance;
            //console.log(ratio);
            let moveX = dx * ratio;
            //console.log(moveX);
            let moveY = dy * ratio;
            //console.log(moveY);
            this.x += moveX;
            this.y += moveY;
        }
    }
}
//Building class
class BuildingObjects {
    constructor(src, width, height, x, y, tag, cost, limit, hp){
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.tag = tag;
        this.cost = cost;
        this.limit = limit;
        this.hp = hp;
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
//DrawMap class
class MapTilesObj {
    constructor(width, height, xPos, yPos, XPosOnTileMap, YPosOnTileMap, tileSizeXAxis, tileSizeYAxis, src){
        this.width = width;
        this.height = height;
        this.xPos = xPos;
        this.yPos = yPos;
        this.XPosOnTileMap = XPosOnTileMap;
        this.YPosOnTileMap = YPosOnTileMap;
        this.tileSizeXAxis = tileSizeXAxis;
        this.tileSizeYAxis = tileSizeYAxis;
        this.image = new Image();
        this.image.src = src;
    }

    draw(){
        //ctx.drawImage(testImage, posOnTileMapX, posOnTileMapY, tileSizeXaxis, tileSizeYaxis, imgPosX, imgPosY, imgsizeX, imgsizeY);
        ctx.drawImage(this.image, this.XPosOnTileMap, this.YPosOnTileMap, this.tileSizeXAxis, this.tileSizeYAxis, this.xPos, this.yPos, this.width, this.height);
    }

    minimizeMap(){
        ctx.drawImage(this.image, this.XPosOnTileMap, this.YPosOnTileMap, this.tileSizeXAxis, this.tileSizeYAxis, this.xPos / 12, this.yPos / 12, this.width / 11, this.height / 11);
    }
};
//LOAD BEFORE GAMELOOP STARTS
loadMapTiles();
GetDarkBrownTilesLocations();
LoadUi();
//Load base
let mainBuilding = new BuildingObjects("./images/buildings/mainBuilding.png", 90, 90, 360, 0, "mainBuilding", 0, undefined, 100);
let solarPanel01 = new BuildingObjects("./images/buildings/solarPanel.png", 32, 32, 328, 0, "solarPanel", 0, undefined, 100);
let solarPanel02 = new BuildingObjects("./images/buildings/solarPanel.png", 32, 32, 328, 32, "solarPanel", 0, undefined, 100);
let solarPanel03 = new BuildingObjects("./images/buildings/solarPanel.png", 32, 32, 328, 64, "solarPanel", 0, undefined, 100);
buildingArray.push(mainBuilding, solarPanel01, solarPanel02, solarPanel03);
//
function gameLoop(){
    ctx.clearRect(0, 0 , CANVAS_WIDTH, CANVAS_HEIGHT);
    //Layer01
    drawMap();
    //Layer02
    DrawVehiclesAndSoldiers();
    drawBuildings();
    //Layer03
    DrawRectangleToSelectArmyUnits();
    //MoveSelectedTroopsAndVehicles();
    moveSoldierTest();
    //Layer04
    DrawUi();
    //Information text
    LeftTopTextBox();
    //Player cash
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("" + player.cash, 810, 40);
    //Layer05
    drawMiniMap();
    drawCanvasLocationOnMiniMap();
    //Layer06
    DrawBuildableObject();
    requestAnimationFrame(gameLoop);
};
gameLoop();
//
function loadMapTiles(){
    for (let eachRow = 0; eachRow < mapTilesCountWidth; eachRow++) {
        for (let eachCollum = 0; eachCollum < mapTilesCountHeight; eachCollum++) {
            let xAxis = 0 + mapTileWidth * eachCollum;
            let yAxis = 0 + mapTileHeight * eachRow;
            PositionOfDifferentTilesOnTheMap(xAxis, yAxis);
            const mapTileObjects = new MapTilesObj(mapTileWidth, mapTileHeight, 0 + mapTileWidth * eachCollum, 0 + mapTileHeight * eachRow, tileLocOnTileMapImgX, tileLocOnTileMapImgY, mapTileWidth, mapTileHeight, "./images/tileMap/tileMap.png");
            if(loadMiniMap){
                mapTileObjects.xPos += 9000;
                mapTileObjects.yPos += 750;
                miniMapTilesArray.push(mapTileObjects);
            }
            else{
                mapTilesArray.push(mapTileObjects);
            }
            tileLocOnTileMapImgX = 60;
            tileLocOnTileMapImgY = 0;
        }
    }
    if(!loadMiniMap){
        loadMiniMap = true;
        loadMapTiles();
    }
};
function GetDarkBrownTilesLocations(){
    for (let i = 0; i < mapTilesArray.length; i++) {
        if(mapTilesArray[i].XPosOnTileMap == 0 && mapTilesArray[i].YPosOnTileMap == 0){
            buildableArea.push({x : mapTilesArray[i].xPos, y : mapTilesArray[i].yPos});
        }
    }
};
function LoadUi(){
    let ui01 = new Button("./images/UI/uiMenu.png", 740, 300, 300, 200, "UiMenu");
    let ui02 = new Button("./images/UI/uiMiniMap.png", 740, 50, 200, 200, "UiMenu");
    let button01 = new Button("./images/UI/uiBuildingConstuction.png", 700, 320, 60, 30, "UiMenuButton", () => { uiTag = "Building", objectToDraw = false, buildingPage = true, soldierPage = false, vehiclePage = false}, "Buildings");
    let button02 = new Button("./images/UI/uiSoldierTraining.png", 700, 385, 60, 30, "UiMenuButton", () => { uiTag = "Soldier", objectToDraw = false, buildingPage = false, soldierPage = true, vehiclePage = false}, "Soldiers");
    let button03 = new Button("./images/UI/uiVehicleManufacturing.png", 700, 450, 60, 30, "UiMenuButton", () => { uiTag = "Vehicle", objectToDraw = false, buildingPage = false, soldierPage = false, vehiclePage = true}, "Vehicles");
    let building01 = new Button("./images/buildings/solarPanelUi.png", 745, 320, 60, 60, "Building", () => {DragAndBuild(building01, "./images/buildings/solarPanel.png", 32, 32, 745, 320, "solarPanel", 800, 20)}, 800);
    let building02 = new Button("./images/buildings/wallUi.png", 810, 320, 60, 60, "Building", () => {DragAndBuild(building02, "./images/buildings/wall.png", 20, 20, 810, 320, "Wall", 500, 50)}, 500);
    let building03 = new Button("./images/buildings/harvestingBuildingUi.png", 875, 320, 60, 60, "Building", () => {DragAndBuild(building03, "./images/buildings/harvestingBuilding.png", 105, 60, 875, 320, "harvestingBuilding", 1500, 3)}, 1500);
    let building04 = new Button("./images/buildings/vehicleFactoryUi.png", 745, 385, 60, 60, "Building", () => {DragAndBuild(building04, "./images/buildings/vehicleFactory.png", 90, 60, 745, 385, "vehicleFactory", 1200, 1)}, 1200);
    let building05 = new Button("./images/buildings/soldierBarracksUi.png", 810, 385, 60, 60, "Building", () => {DragAndBuild(building05, "./images/buildings/soldierBarracks.png", 60, 60, 810, 385, "soldierBarrack", 1000, 1)}, 1000);
    let soldier01 = new Button("./images/soldiers/soldierRiffle.png", 745, 320, 60, 60, "Soldier", () => {DragAndBuild(soldier01)}, 400);
    let soldier02 = new Button("./images/soldiers/soldierRocket.png", 810, 320, 60, 60, "Soldier", () => {DragAndBuild(soldier02)}, 800);
    let vehicle01 = new Button("./images/vehicles/tank01.png", 745, 320, 60, 60, "Vehicle", () => {DragAndBuild(vehicle01)}, 1600);
    let vehicle02 = new Button("./images/vehicles/armoredVehicle01.png", 810, 320, 60, 60, "Vehicle", () => {DragAndBuild(vehicle02)}, 900);
    let vehicle03 = new Button("./images/vehicles/harvester01.png", 875, 320, 60, 60, "Vehicle", () => {DragAndBuild(vehicle03)}, 3000);
    uiElements.push(ui01, ui02);
    buttons.push(button01, button02, button03, building01, building02, building03, building04, building05, vehicle01, vehicle02, vehicle03, soldier01, soldier02);
};
//BUILD BUILDING, TRAIN SOLDIER OR MANUFACTURE VEHICLE
function DragAndBuild(currentObject, src, width, height, x, y, tag, cost, limit){
    switch(true){
        case currentObject.tag == "Building" && buildingPage:
            storeCurrentBuilding = new BuildingObjects(src, width, height, x, y, tag, cost, limit);
            objectToDraw = true;
            break;
        case currentObject.tag == "Soldier" && soldierPage:
            if(CheckIfBuildingIsPresent("soldierBarrack") && false == player.cash - currentObject.cost < 0 ? true : false){
                let soldierBuildingX;
                let soldierBuildingY;
                for (const building in buildingArray) {
                    if(buildingArray[building].tag == "soldierBarrack"){
                        soldierBuildingX = buildingArray[building].x;
                        soldierBuildingY = buildingArray[building].y;
                    }
                }
                const newSoldier = new Sprites(currentObject.image.src, soldierBuildingX + 60, soldierBuildingY + 20, currentObject.width, currentObject.height, 2);
                storedVehiclesAndSoldiers.push(newSoldier);
                informationText.push({string: "Training!", color: "green"});
                player.cash -= currentObject.cost;
            }
            else if(!CheckIfBuildingIsPresent("soldierBarrack")){
                informationText.push({string: "You must build barracks first so that you could train your soldiers!", color: "red"});
            }
            else{
                informationText.push({string: "Not enough cash!", color: "red"});
            }
            break;
        case currentObject.tag == "Vehicle" && vehiclePage:
            if(CheckIfBuildingIsPresent("vehicleFactory") && false == player.cash - currentObject.cost < 0 ? true : false){
                let vehicleBuildingX;
                let vehicleBuildingY;
                for (const building in buildingArray) {
                    if(buildingArray[building].tag == "vehicleFactory"){
                        vehicleBuildingX = buildingArray[building].x;
                        vehicleBuildingY = buildingArray[building].y;
                    }
                }
                const newVehicle = new Sprites(currentObject.image.src, vehicleBuildingX + 85, vehicleBuildingY + 20, currentObject.width, currentObject.height, 2);
                storedVehiclesAndSoldiers.push(newVehicle);
                informationText.push({string: "Manufacturing!", color: "green"});
                player.cash -= currentObject.cost;
            }
            else if(!CheckIfBuildingIsPresent("vehicleFactory")){
                informationText.push({string: "You must build barracks first so that you could train your soldiers!", color: "red"});
            }
            else{
                informationText.push({string: "Not enough cash!", color: "red"});
            }
            break;
    }
};
function DrawBuildableObject(){   
    if(objectToDraw){
        if(CheckIfYouAreOverBuildableArea() && storeCurrentBuilding.limit > CheckBuildingLimit() && false == player.cash - storeCurrentBuilding.cost < 0 ? true : false)
        {
            ctx.fillStyle = "green";
        }
        else{
            ctx.fillStyle = "red";
        }
        ctx.fillRect(mouseCurrentPosX - storeCurrentBuilding.width / 2, mouseCurrentPosY - storeCurrentBuilding.height / 2, storeCurrentBuilding.width, storeCurrentBuilding.height);
        ctx.save();
        ctx.globalAlpha = 0.5
        ctx.drawImage(storeCurrentBuilding.image, mouseCurrentPosX - storeCurrentBuilding.width / 2, mouseCurrentPosY - storeCurrentBuilding.height / 2, storeCurrentBuilding.width, storeCurrentBuilding.height);
        ctx.restore();
    }
};
//CHECK IF BUILDING IS PRESSENT IF YES YOU CAN TRAIN OR MANUFACTURE
function CheckIfBuildingIsPresent(tag){
    console.log(buildingArray);
    for (const building in buildingArray) {
        console.log(buildingArray[building].tag);
        if(buildingArray[building].tag == tag){
            return true;
        }
    }
    return false;
};
//CHECK IF BUILDING LIMIT IS REACHED
function CheckBuildingLimit(){
    let checkLimit = 0;
    for (const key in buildingArray) {
        if(buildingArray[key].tag == storeCurrentBuilding.tag){
            checkLimit++;
        }
    }
    return checkLimit;
};
//BUILD BUILD BUILD BUILD BUILD BUILD BUILD BUILD BUILD BUILD BUILD BUILD
function Build(){
    if(CheckIfYouAreOverBuildableArea() && false == player.cash - storeCurrentBuilding.cost < 0 ? true : false){
        //Check if building limit reached
        if(storeCurrentBuilding.limit <= CheckBuildingLimit()){
            informationText.push({string: "You have reached the limit of how many you can build!", color: "red"});
            objectToDraw = false;
            pressedButton = false;
            return;
        }
        storeCurrentBuilding.x = mouseCurrentPosX - storeCurrentBuilding.width / 2;
        storeCurrentBuilding.y = mouseCurrentPosY - storeCurrentBuilding.height / 2;
        const newBuilding = storeCurrentBuilding;
        buildingArray.push(newBuilding);
        player.cash -= storeCurrentBuilding.cost;
        informationText.push({string: "Built!", color: "green"});
        storeCurrentBuilding = [];
        //reset variables:
        objectToDraw = false;
        pressedButton = false;
    }
    else if(!CheckIfYouAreOverBuildableArea()){
        informationText.push({string: "You can't build here!", color: "red"});
    }
    else if(false == player.cash - storeCurrentBuilding.cost > 0 ? true : false){
        informationText.push({string: "Not enough cash!", color: "red"});
    }
};
//CHECK WHICH BUTTON IS PRESSED
function CheckButtonOnClick(xMouse, yMouse){
    for (const button in buttons) {
        buttons[button].buttonPressed(xMouse, yMouse);
        if(buttons[button].x <= xMouse && buttons[button].x + buttons[button].width >= xMouse && 
            buttons[button].y <= yMouse && buttons[button].y  + buttons[button].height >= yMouse &&
            buildingPage){
            pressedButton = true;
            selectedVehiclesAndSoldiers = [];
        }
    }
};
function DrawUi(){
    for (const uiElement in uiElements) {
        uiElements[uiElement].draw();
    }
    for (const button in buttons) {
        switch(buttons[button].tag){
            case "UiMenuButton":
                buttons[button].draw();
                break;
            case uiTag:
                buttons[button].draw();
                break;
        }
    }
};
//Prevent right click options list from appearing
canvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
//Mouse pressdown
canvas.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(event) {
    console.log(storedVehiclesAndSoldiers);
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    switch(event.button){
        case 2:
            mouseRightButtonPressDown = true;
            break;
        case 0:
            mouseLeftButtonPressDown = true;
            if(objectToDraw){
                Build();
            }
            //Checks if any of UI button is pressed
            CheckButtonOnClick(mouseX, mouseY);
            break;
        case 1:
            player.cash += 1000;
            break;
    }
    mousePreviousPosX = mouseX;
    mousePreviousPosY = mouseY;
};
//Move vehicles/soldiers to clicked mouse position
function moveSoldierTest(){
    for (const item in selectedVehiclesAndSoldiers) {
        selectedVehiclesAndSoldiers[item].movement(moveToX, moveToY);
    }
};
//Mouse movement on canvas
canvas.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;
    //
    if(mouseLeftButtonPressDown && !pressedButton){
        drawSelect = true;
    }
    //
    if(mouseRightButtonPressDown){
        newPosX = Math.round(mouseX - mousePreviousPosX);
        newPosY = Math.round(mouseY - mousePreviousPosY);
        if(mapTilesArray[0].xPos < 0 - newPosX && mapTilesArray[0].xPos > -1200 - newPosX){
            MoveMap(newPosX, 0);
        }
        if(mapTilesArray[0].yPos < 0 - newPosY && mapTilesArray[0].yPos > -1460 - newPosY){
            MoveMap(0, newPosY);
        }
        mousePreviousPosX = mouseX;
        mousePreviousPosY = mouseY;
    }
    mouseCurrentPosX = mouseX;
    mouseCurrentPosY = mouseY;
};
//Mouse STOP movement on canvas
canvas.addEventListener("mousemove", mouseStopMoveHandler, false);
function mouseStopMoveHandler(){
    mouseIsmoving = false;
};
//Mouse button release
canvas.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(event) {
    switch(event.button){
        case 2:
            mouseRightButtonPressDown = false;
            objectToDraw = false;
            break;
        case 0:
            mouseLeftButtonPressDown = false;
            //Check if there is any selected vehicles/Soldiers and move them to that location
            if(selectedVehiclesAndSoldiers.length > 0 && !CheckIfClickedOnUiArea()){
                moveToX = mouseCurrentPosX;
                moveToY = mouseCurrentPosY;
            }
            if(drawSelect){
                moveToX = undefined;
                moveToY = undefined;
                SelectVehiclesAndSoldiers();
            }
            drawSelect = false;
            break;
    }
};
function CheckIfYouAreOverBuildableArea(){
    for (let i = 0; i < buildableArea.length; i++) {
        if(buildableArea[i].x <= mouseCurrentPosX && buildableArea[i].x + 60 >= mouseCurrentPosX && 
        buildableArea[i].y <= mouseCurrentPosY && buildableArea[i].y + 60 >= mouseCurrentPosY){
            for (let u = 0; u < buildingArray.length; u++) {
                if(buildingArray[u].x <= mouseCurrentPosX + storeCurrentBuilding.width / 2 && buildingArray[u].x + buildingArray[u].width >= mouseCurrentPosX - storeCurrentBuilding.width / 2 && 
                    buildingArray[u].y <= mouseCurrentPosY + storeCurrentBuilding.height / 2  && buildingArray[u].y + buildingArray[u].height >= mouseCurrentPosY - storeCurrentBuilding.height / 2){
                    return false;
                }
            }
            return true;
        }
    }
};
function DrawRectangleToSelectArmyUnits(){
    if(drawSelect == true){
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 229, 229, 1)";
        ctx.rect(mousePreviousPosX, mousePreviousPosY, mouseCurrentPosX - mousePreviousPosX, mouseCurrentPosY - mousePreviousPosY);
        ctx.stroke();
    }
};
function SelectVehiclesAndSoldiers(){
    selectedVehiclesAndSoldiers = [];
    for (let i = 0; i < storedVehiclesAndSoldiers.length; i++) {
        if(mousePreviousPosX <= storedVehiclesAndSoldiers[i].x && mouseCurrentPosX >= storedVehiclesAndSoldiers[i].x &&  mousePreviousPosY <= storedVehiclesAndSoldiers[i].y && mouseCurrentPosY >= storedVehiclesAndSoldiers[i].y){
            selectedVehiclesAndSoldiers.push(storedVehiclesAndSoldiers[i]);
        }
    }
};
function MoveMap(x, y){
    rectLocationX -= x / 12.6;
    rectLocationY -= y / 10.8;
    for (let i = 0; i < mapTilesArray.length; i++) {
        mapTilesArray[i].xPos += x;
        mapTilesArray[i].yPos += y;
        if(buildingArray[i] != undefined){
            buildingArray[i].x += x;
            buildingArray[i].y += y;
        }
        if(buildableArea[i] != undefined){
            buildableArea[i].x += x;
            buildableArea[i].y += y;
        }
    }
    for (const key in storedVehiclesAndSoldiers) {
        storedVehiclesAndSoldiers[key].x += x;
        storedVehiclesAndSoldiers[key].y += y;
    }
    moveToX += x;
    moveToY += y;
};
function drawMap(){
    for (let i = 0; i < mapTilesArray.length; i++) {
        if(mapTilesArray[i].xPos < 960 && mapTilesArray[i].xPos > -60 && mapTilesArray[i].yPos < 680 && mapTilesArray[i].yPos > -60){
            mapTilesArray[i].draw();
        }
    }
};
function drawMiniMap(){
    for (let i = 0; i < miniMapTilesArray.length; i++) {
        miniMapTilesArray[i].minimizeMap();
    }
};
function drawCanvasLocationOnMiniMap(){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(rectLocationX, rectLocationY, 85, 45);
    ctx.stroke();
};
function drawBuildings(){
    for (let i = 0; i < buildingArray.length; i++) {
        buildingArray[i].draw();
    }
};
function DrawVehiclesAndSoldiers(){
    for (let i = 0; i < storedVehiclesAndSoldiers.length; i++) {
        storedVehiclesAndSoldiers[i].draw();
    }
};
function LeftTopTextBox(){
    for (let i = 0; i < informationText.length; i++) {
        if(informationText.length >= 6){
            informationText.shift();
        }
        ctx.fillStyle = informationText[i].color;
        ctx.font = "15px Arial";
        ctx.fillText(informationText[i].string, 10, yCoordinate * (i + 1));
    }
};
function CheckIfClickedOnUiArea(){
    if(mouseCurrentPosX > 700 && mouseCurrentPosX < 940 && mouseCurrentPosY > 300 && mouseCurrentPosY < 600){
        return true;
    }
    else{
        return false;
    }
}
function PositionOfDifferentTilesOnTheMap(xAxis, yAxis){
    const tileCoordinates = [
        //Coordinates for the brown tiles
        { xRange: [240, 1200], y: 0, imgX: 0, imgY: 0}, { xRange: [300, 1200], y: 60, imgX: 0, imgY: 0}, { xRange: [300, 1080], y: 120, imgX: 0, imgY: 0},
        { xRange: [300, 1020], y: 180, imgX: 0, imgY: 0}, { xRange: [300, 360], y: 240, imgX: 0, imgY: 0}, { xRange: [600, 600], y: 240, imgX: 0, imgY: 0},
        { xRange: [1620, 2100], y: 0, imgX: 0, imgY: 0}, { xRange: [1620, 2100], y: 60, imgX: 0, imgY: 0}, { xRange: [1620, 2100], y: 120, imgX: 0, imgY: 0},
        { xRange: [1620, 2100], y: 180, imgX: 0, imgY: 0}, { xRange: [1620, 2100], y: 240, imgX: 0, imgY: 0}, { xRange: [1620, 2100], y: 300, imgX: 0, imgY: 0},
        { xRange: [1620, 2100], y: 360, imgX: 0, imgY: 0}, { xRange: [0, 0], y: 2040, imgX: 0, imgY: 0}, { xRange: [0, 60], y: 1980, imgX: 0, imgY: 0},
        { xRange: [0, 120], y: 1920, imgX: 0, imgY: 0}, { xRange: [0, 180], y: 1620, imgX: 0, imgY: 0}, { xRange: [0, 240], y: 1680, imgX: 0, imgY: 0},
        { xRange: [0, 420], y: 1740, imgX: 0, imgY: 0}, { xRange: [0, 360], y: 1800, imgX: 0, imgY: 0}, { xRange: [0, 360], y: 1860, imgX: 0, imgY: 0},
        { xRange: [660, 900], y: 900, imgX: 0, imgY: 0}, { xRange: [660, 900], y: 960, imgX: 0, imgY: 0}, { xRange: [660, 900], y: 1020, imgX: 0, imgY: 0},
        { xRange: [660, 900], y: 1080, imgX: 0, imgY: 0}, { xRange: [660, 900], y: 1140, imgX: 0, imgY: 0}, { xRange: [1560, 1680], y: 420, imgX: 0, imgY: 0},
        { xRange: [1500, 1620], y: 480, imgX: 0, imgY: 0}, { xRange: [1680, 1740], y: 1200, imgX: 0, imgY: 0}, { xRange: [1680, 1740], y: 1260, imgX: 0, imgY: 0},
        { xRange: [1680, 1800], y: 1320, imgX: 0, imgY: 0}, { xRange: [1620, 1800], y: 1380, imgX: 0, imgY: 0}, { xRange: [1560, 1800], y: 1440, imgX: 0, imgY: 0},
        { xRange: [1440, 1860], y: 1500, imgX: 0, imgY: 0}, { xRange: [1440, 1860], y: 1560, imgX: 0, imgY: 0}, { xRange: [1440, 1860], y: 1620, imgX: 0, imgY: 0},
        { xRange: [1620, 1740], y: 1680, imgX: 0, imgY: 0}, { xRange: [1680, 1680], y: 1740, imgX: 0, imgY: 0},
        //Top left ground, left side S
        { xRange: [120, 120], y: 0, imgX: 180, imgY: 600}, { xRange: [180, 180], y: 0, imgX: 240, imgY: 600}, { xRange: [120, 120], y: 60, imgX: 180, imgY: 660},
        { xRange: [180, 180], y: 60, imgX: 240, imgY: 660}, { xRange: [240, 240], y: 60, imgX: 300, imgY: 660}, { xRange: [180, 180], y: 120, imgX: 240, imgY: 720},
        { xRange: [240, 240], y: 120, imgX: 300, imgY: 720},
        //Straight 0deg
        { xRange: [480, 480], y: 240, imgX: 0, imgY: 60}, { xRange: [1680, 1680], y: 1800, imgX: 0, imgY: 60},
        //Straight 90deg
        { xRange: [540, 540], y: 300, imgX: 0, imgY: 240}, { xRange: [1440, 1440], y: 480, imgX: 0, imgY: 240}, { xRange: [1380, 1380], y: 1620, imgX: 0, imgY: 240},
        { xRange: [1380, 1380], y: 1560, imgX: 0, imgY: 240}, { xRange: [1380, 1380], y: 1500, imgX: 0, imgY: 240}, { xRange: [1620, 1620], y: 1260, imgX: 0, imgY: 240},
        { xRange: [1620, 1620], y: 1200, imgX: 0, imgY: 240}, { xRange: [1560, 1560], y: 240, imgX: 0, imgY: 240},
        //Straight 180deg
        { xRange: [420, 420], y: 1680, imgX: 60, imgY: 120},
        //Straight -90deg
        { xRange: [1260, 1260], y: 0, imgX: 180, imgY: 180}, { xRange: [1260, 1260], y: 60, imgX: 180, imgY: 180}, { xRange: [1800, 1800], y: 1200, imgX: 180, imgY: 180},
        { xRange: [1860, 1860], y: 1320, imgX: 180, imgY: 180}, { xRange: [1860, 1860], y: 1380, imgX: 180, imgY: 180},
        //Passage left 90deg
        { xRange: [240, 240], y: 180, imgX: 180, imgY: 360}, { xRange: [1560, 1560], y: 0, imgX: 180, imgY: 360}, { xRange: [600, 600], y: 900, imgX: 180, imgY: 360},
        //Passage left flipped 90deg
        { xRange: [960, 960], y: 1140, imgX: 240, imgY: 300}, { xRange: [1920, 1920], y: 1620, imgX: 240, imgY: 300},
        //Passage right 90deg
        { xRange: [240, 240], y: 240, imgX: 180, imgY: 300},
        //Passage right flipped 90deg
        { xRange: [960, 960], y: 900, imgX: 240, imgY: 360}, { xRange: [1920, 1920], y: 1500, imgX: 240, imgY: 360},
        //Outer corner 0deg
        { xRange: [240, 240], y: 300, imgX: 60, imgY: 540}, { xRange: [540, 540], y: 360, imgX: 60, imgY: 540}, { xRange: [1440, 1440], y: 540, imgX: 60, imgY: 540},
        { xRange: [600, 600], y: 1200, imgX: 60, imgY: 540}, { xRange: [1380, 1380], y: 1680, imgX: 60, imgY: 540}, { xRange: [1560, 1560], y: 1740, imgX: 60, imgY: 540},
        { xRange: [1620, 1620], y: 1800, imgX: 60, imgY: 540},
        //Outer corner 90deg
        { xRange: [420, 420], y: 300, imgX: 0, imgY: 540}, { xRange: [1260, 1260], y: 120, imgX: 0, imgY: 540}, { xRange: [960, 960], y: 1200, imgX: 0, imgY: 540},
        { xRange: [1920, 1920], y: 1680, imgX: 0, imgY: 540}, { xRange: [420, 420], y: 1920, imgX: 0, imgY: 540},
        //Outer corner 180deg
        { xRange: [600, 600], y: 840, imgX: 120, imgY: 540}, { xRange: [1380, 1380], y: 1440, imgX: 120, imgY: 540}, { xRange: [1620, 1620], y: 1140, imgX: 120, imgY: 540},
        //Outer corner 270deg
        { xRange: [480, 480], y: 1680, imgX: 180, imgY: 540}, { xRange: [0, 0], y: 1500, imgX: 180, imgY: 540}, { xRange: [960, 960], y: 840, imgX: 180, imgY: 540},
        { xRange: [1800, 1800], y: 1140, imgX: 180, imgY: 540}, { xRange: [1860, 1860], y: 1260, imgX: 180, imgY: 540}, { xRange: [1920, 1920], y: 1440, imgX: 180, imgY: 540},
        //Inner corner 0deg
        { xRange: [420, 420], y: 240, imgX: 0, imgY: 480}, { xRange: [60, 60], y: 2040, imgX: 0, imgY: 480},
        //Inner corner 90deg
        { xRange: [540, 540], y: 240, imgX: 60, imgY: 480}, { xRange: [1560, 1560], y: 1680, imgX: 60, imgY: 480}, { xRange: [1620, 1620], y: 1740, imgX: 60, imgY: 480},
        //Inner corner 180deg
        { xRange: [0, 0], y: 1560, imgX: 120, imgY: 480}, { xRange: [1800, 1800], y: 1260, imgX: 120, imgY: 480}, { xRange: [1860, 1860], y: 1440, imgX: 120, imgY: 480},
        //Inner corner 180deg
        { xRange: [1620, 1620], y: 1320, imgX: 180, imgY: 480},
        //Passage right 0deg
        { xRange: [360, 360], y: 300, imgX: 120, imgY: 300}, { xRange: [1020, 1020], y: 240, imgX: 120, imgY: 300}, { xRange: [2040, 2040], y: 420, imgX: 120, imgY: 300},
        { xRange: [900, 900], y: 1200, imgX: 120, imgY: 300}, { xRange: [1500, 1500], y: 1680, imgX: 120, imgY: 300}, { xRange: [360, 360], y: 1920, imgX: 120, imgY: 300},
        { xRange: [1620, 1620], y: 540, imgX: 120, imgY: 300},
        //Passage right 90deg
        { xRange: [1560, 1560], y: 180, imgX: 180, imgY: 300}, { xRange: [600, 600], y: 1140, imgX: 180, imgY: 300},
        //Passage left 180deg
        { xRange: [180, 180], y: 1560, imgX: 120, imgY: 360},
        //Passage left 0deg
        { xRange: [300, 300], y: 300, imgX: 0, imgY: 300}, { xRange: [780, 780], y: 240, imgX: 0, imgY: 300}, { xRange: [1860, 1860], y: 420, imgX: 0, imgY: 300},
        { xRange: [660, 660], y: 1200, imgX: 0, imgY: 300}, { xRange: [1440, 1440], y: 1680, imgX: 0, imgY: 300}, { xRange: [300, 300], y: 1920, imgX: 0, imgY: 300},
        { xRange: [1500, 1500], y: 540, imgX: 0, imgY: 300},
        //Passage left flipped 0deg
        { xRange: [60, 60], y: 1560, imgX: 0, imgY: 360}, { xRange: [660, 660], y: 840, imgX: 0, imgY: 360}, { xRange: [1680, 1680], y: 1140, imgX: 0, imgY: 360},
        //Passage right flipped 0deg
        { xRange: [900, 900], y: 840, imgX: 120, imgY: 360}, { xRange: [1740, 1740], y: 1140, imgX: 120, imgY: 360},
        //Mid passage 0deg
        { xRange: [840, 960], y: 240, imgX: 60, imgY: 300}, { xRange: [1920, 1980], y: 420, imgX: 60, imgY: 300}, { xRange: [720, 840], y: 1200, imgX: 60, imgY: 300},
        { xRange: [1560, 1560], y: 540, imgX: 60, imgY: 300},
        //Mid passage 90deg
        { xRange: [1560, 1560], y: 60, imgX: 300, imgY: 300}, { xRange: [1560, 1560], y: 120, imgX: 300, imgY: 300}, { xRange: [600, 600], y: 1080, imgX: 300, imgY: 300},
        { xRange: [600, 600], y: 1020, imgX: 300, imgY: 300}, { xRange: [600, 600], y: 960, imgX: 300, imgY: 300},
        //Mid passage 180deg
        { xRange: [120, 120], y: 1560, imgX: 60, imgY: 360}, { xRange: [720, 840], y: 840, imgX: 60, imgY: 360},
        //Mid passage -90deg
        { xRange: [960, 960], y: 1080, imgX: 300, imgY: 360}, { xRange: [960, 960], y: 1020, imgX: 300, imgY: 360}, { xRange: [960, 960], y: 960, imgX: 300, imgY: 360},
        { xRange: [1920, 1920], y: 1560, imgX: 300, imgY: 360},
        //Original S shape 01
        { xRange: [600, 600], y: 360, imgX: 0, imgY: 720}, { xRange: [1080, 1080], y: 240, imgX: 0, imgY: 720}, { xRange: [1680, 1680], y: 540, imgX: 0, imgY: 720},
        { xRange: [120, 120], y: 2040, imgX: 0, imgY: 720}, { xRange: [1740, 1740], y: 1800, imgX: 0, imgY: 720},
        //Original S shape 02
        { xRange: [600, 600], y: 300, imgX: 0, imgY: 660}, { xRange: [1080, 1080], y: 180, imgX: 0, imgY: 660}, { xRange: [1680, 1680], y: 480, imgX: 0, imgY: 660},
        { xRange: [120, 120], y: 1980, imgX: 0, imgY: 660}, { xRange: [1740, 1740], y: 1740, imgX: 0, imgY: 660},
        //Original S shape 03
        { xRange: [660, 660], y: 360, imgX: 60, imgY: 720}, { xRange: [1140, 1140], y: 240, imgX: 60, imgY: 720}, { xRange: [1740, 1740], y: 540, imgX: 60, imgY: 720},
        { xRange: [180, 180], y: 2040, imgX: 60, imgY: 720}, { xRange: [1800, 1800], y: 1800, imgX: 60, imgY: 720},
        //Original S shape 04
        { xRange: [660, 660], y: 300, imgX: 60, imgY: 660}, { xRange: [1140, 1140], y: 180, imgX: 60, imgY: 660}, { xRange: [1740, 1740], y: 480, imgX: 60, imgY: 660},
        { xRange: [180, 180], y: 1980, imgX: 60, imgY: 660}, { xRange: [1800, 1800], y: 1740, imgX: 60, imgY: 660},
        //Original S shape 05
        { xRange: [720, 720], y: 300, imgX: 120, imgY: 660}, { xRange: [1200, 1200], y: 180, imgX: 120, imgY: 660}, { xRange: [1800, 1800], y: 480, imgX: 120, imgY: 660},
        { xRange: [240, 240], y: 1980, imgX: 120, imgY: 660}, { xRange: [1860, 1860], y: 1740, imgX: 120, imgY: 660},
        //Original S shape 06
        { xRange: [660, 660], y: 240, imgX: 60, imgY: 600}, { xRange: [1140, 1140], y: 120, imgX: 60, imgY: 600}, { xRange: [1740, 1740], y: 420, imgX: 60, imgY: 600},
        { xRange: [180, 180], y: 1920, imgX: 60, imgY: 600}, { xRange: [1800, 1800], y: 1680, imgX: 60, imgY: 600},
        //Original S shape 07
        { xRange: [720, 720], y: 240, imgX: 120, imgY: 600}, { xRange: [1200, 1200], y: 120, imgX: 120, imgY: 600}, { xRange: [1800, 1800], y: 420, imgX: 120, imgY: 600},
        { xRange: [240, 240], y: 1920, imgX: 120, imgY: 600}, { xRange: [1860, 1860], y: 1680, imgX: 120, imgY: 600},
        //lower left side zone middle S
        { xRange: [420, 420], y: 1860, imgX: 180, imgY: 1260}, { xRange: [480, 480], y: 1860, imgX: 240, imgY: 1260}, { xRange: [420, 420], y: 1800, imgX: 180, imgY: 1200},
        { xRange: [480, 480], y: 1800, imgX: 240, imgY: 1200}, { xRange: [540, 540], y: 1800, imgX: 300, imgY: 1200}, { xRange: [540, 540], y: 1740, imgX: 240, imgY: 960},
        { xRange: [480, 480], y: 1740, imgX: 180, imgY: 960},
        //lower left side zone top S
        { xRange: [360, 360], y: 1680, imgX: 120, imgY: 1260}, { xRange: [300, 300], y: 1680, imgX: 60, imgY: 1260}, { xRange: [360, 360], y: 1620, imgX: 120, imgY: 1200},
        { xRange: [300, 300], y: 1620, imgX: 60, imgY: 1200}, { xRange: [300, 300], y: 1560, imgX: 60, imgY: 1140}, { xRange: [240, 240], y: 1560, imgX: 0, imgY: 1140},
        { xRange: [240, 240], y: 1620, imgX: 0, imgY: 1200},
        //top right side zone middle S
        { xRange: [1440, 1440], y: 420, imgX: 180, imgY: 900}, { xRange: [1500, 1500], y: 420, imgX: 240, imgY: 900}, { xRange: [1440, 1440], y: 360, imgX: 180, imgY: 840},
        { xRange: [1500, 1500], y: 360, imgX: 240, imgY: 840}, { xRange: [1560, 1560], y: 360, imgX: 300, imgY: 840}, { xRange: [1500, 1500], y: 300, imgX: 240, imgY: 780},
        { xRange: [1560, 1560], y: 300, imgX: 300, imgY: 780},
        //bottom right side zone top left S
        { xRange: [1440, 1440], y: 1440, imgX: 0, imgY: 1080}, { xRange: [1500, 1500], y: 1440, imgX: 60, imgY: 1080}, { xRange: [1440, 1440], y: 1380, imgX: 0, imgY: 1020},
        { xRange: [1500, 1500], y: 1380, imgX: 60, imgY: 1020}, { xRange: [1560, 1560], y: 1380, imgX: 120, imgY: 1020}, { xRange: [1560, 1560], y: 1320, imgX: 120, imgY: 960},
        { xRange: [1500, 1500], y: 1320, imgX: 60, imgY: 960},
    ];
    for(const tile of tileCoordinates){
        const [start, end] = tile.xRange;
        for(let i = start; i <= end; i += 60){
            if(i === xAxis && tile.y === yAxis){
                tileLocOnTileMapImgX = tile.imgX;
                tileLocOnTileMapImgY = tile.imgY;
                return;
            }
        }
    }
};