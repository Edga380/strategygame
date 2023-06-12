const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

//Canvas size
const CANVAS_WIDTH = canvas.width = 960;//960
const CANVAS_HEIGHT = canvas.height = 640;//640
//
var player = [{x: -200, y: -200, cash: 7803}];
//
const mapTilesCountWidth = 36;
const mapTilesCountHeight = 36;
const mapTileWidth = 60;
const mapTileHeight = 60;
const mapTilesArray = [];
const miniMapTilesArray = [];
const buildingArray = [];
const buildableArea = [];
var tileLocOnTileMapImgX = 60;
var tileLocOnTileMapImgY = 0;
//DrawMap variables
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
//UI variables
var uiMiniMap = new Image();
var uiMenu = new Image();
var solarPanel = new Image();
var solarPanelTransparent = new Image();
var vehiclePlant = new Image();
var soldierBaracks = new Image();
//Draw select rectangle variables
var drawSelect = false;
//
var pickDropSolarPanel = false;

//LOAD BEFORE GAMELOOP STARTS
loadMapTiles();
loadMiniMapTiles();
GetDarkBrownTilesLocations();
//

function gameLoop(){
    ctx.clearRect(0, 0 , CANVAS_WIDTH, CANVAS_HEIGHT);   
    canvas.style.backgroundColor = "black";
    //Layer01
    drawMap();
    drawBuildings();
    //Layer02
    DrawSelectRect();
    PickAndDropBuilding();
    //Layer03
    //Layer04
    //Layer05
    //Layer06
    DrawUIElements();
    drawMiniMap();
    //
    requestAnimationFrame(gameLoop);
};
gameLoop();
//
function loadMapTiles(){
    for (let eachRow = 0; eachRow < mapTilesCountWidth; eachRow++) {
        for (let eachCollum = 0; eachCollum < mapTilesCountHeight; eachCollum++) {
            var xAxis = 0 + mapTileWidth * eachCollum;
            var yAxis = 0 + mapTileHeight * eachRow;
            PositionOfDifferentTilesOnTheMap(xAxis, yAxis);
            const mapTileObjects = new MapTilesObj(mapTileWidth, mapTileHeight, 0 + mapTileWidth * eachCollum, 0 + mapTileHeight * eachRow, tileLocOnTileMapImgX, tileLocOnTileMapImgY, mapTileWidth, mapTileHeight, "/images/tileMap/tileMap.png");
            mapTilesArray.push(mapTileObjects);
            tileLocOnTileMapImgX = 60;
            tileLocOnTileMapImgY = 0;
        }
    }
};
function loadMiniMapTiles(){
    for (let eachRow = 0; eachRow < mapTilesCountWidth; eachRow++) {
        for (let eachCollum = 0; eachCollum < mapTilesCountHeight; eachCollum++) {
            var xAxis = 0 + mapTileWidth * eachCollum;
            var yAxis = 0 + mapTileHeight * eachRow;
            PositionOfDifferentTilesOnTheMap(xAxis, yAxis);
            const mapTileObjects = new MapTilesObj(mapTileWidth, mapTileHeight, 0 + mapTileWidth * eachCollum, 0 + mapTileHeight * eachRow, tileLocOnTileMapImgX, tileLocOnTileMapImgY, mapTileWidth, mapTileHeight, "/images/tileMap/tileMap.png");
            mapTileObjects.xPos += 9000;
            mapTileObjects.yPos += 750;
            miniMapTilesArray.push(mapTileObjects);
            tileLocOnTileMapImgX = 60;
            tileLocOnTileMapImgY = 0;
        }
    }
};
function GetDarkBrownTilesLocations(){
    for (let i = 0; i < mapTilesArray.length; i++) {
        if(mapTilesArray[i].XPosOnTileMap == 0 && mapTilesArray[i].YPosOnTileMap == 0){
            buildableArea.push({x : mapTilesArray[i].xPos, y : mapTilesArray[i].yPos});
        }
    }
    console.log(buildableArea);
};
//UI
function DrawUIElements(){
    //Player cash
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("" + player[0].cash, 810, 40);
    //Show energy consuption
    ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
    ctx.fillRect(710, 50, 20, 200);
    //Show mini map here
    uiMiniMap.src = "/images/tileMap/UIMiniMap.png";
    ctx.drawImage(uiMiniMap, 740, 50, 200, 200);
    //Show building options here
    uiMenu.src = "/images/tileMap/UIMenu.png";
    ctx.drawImage(uiMenu, 740, 300, 200, 300);
    //Solar panel
    solarPanel.src = "/images/tileMap/solarPanel.png";
    ctx.drawImage(solarPanel, 745, 320, 60, 60);
    //Wall
    ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
    ctx.fillRect(810, 320, 60, 60);
    //Harvesting building
    ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
    ctx.fillRect(875, 320, 60, 60);
    //Vehicle plant
    vehiclePlant.src = "/images/tileMap/vehiclePlant.png";
    ctx.drawImage(vehiclePlant, 745, 385, 60, 60);
    //Soldier barracks
    ctx.fillStyle = "rgba(255, 165, 0, 0.5)";
    ctx.fillRect(810, 385, 60, 60);
    //soldierBaracks.src = "/images/tileMap/vehiclePlant.png";
    //ctx.drawImage(soldierBaracks, 875, 320, 60, 60);

};
//
var mousePreviousPosX = 0;
var mousePreviousPosY = 0;
var mouseCurrentPosX = 0;
var mouseCurrentPosY = 0;
var mouseRightClick = false;
//Prevent right click options list from appearing
canvas.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});
//Mouse pressdown
canvas.addEventListener("mousedown", mouseDownHandler, false);
function mouseDownHandler(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    if(event.button == "2"){
        mousePreviousPosX = mouseX;
        mousePreviousPosY = mouseY;
        mouseRightClick = true;
        pickDropSolarPanel = false;
    }
    else if(event.button == "0"){
        if(mouseX >= 745 && mouseX <= 805 && mouseY >= 320 & mouseY <= 380 && pickDropSolarPanel == false){
            pickDropSolarPanel = true;
            console.log("Solar panel");
        }
        else if(pickDropSolarPanel == true){
            const mapTileObjects = new MapTilesObj(32, 32, mouseCurrentPosX - 15, mouseCurrentPosY - 15, 0, 0, 32, 32, "/images/tileMap/solarPanel.png");
            buildingArray.push(mapTileObjects);
            pickDropSolarPanel = false;
        }
        else{
            mousePreviousPosX = mouseX;
            mousePreviousPosY = mouseY;
            drawSelect = true;
        }
    }
};
//Mouse movement on canvas
canvas.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(event) {
    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;
    if(mouseX > mousePreviousPosX && mouseRightClick == true && mapTilesArray[mapTilesArray.length - 1].xPos < 2100){
        mousePreviousPosX = mouseX;
        MoveMap(4, 0);
    }
    if(mouseX < mousePreviousPosX && mouseRightClick == true && mapTilesArray[mapTilesArray.length - 1].xPos > 900){
        mousePreviousPosX = mouseX;
        MoveMap(-4, 0);
    }
    if(mouseY > mousePreviousPosY && mouseRightClick == true && mapTilesArray[mapTilesArray.length - 1].yPos < 2100){
        mousePreviousPosY = mouseY;
        MoveMap(0, 4);
    }
    if(mouseY < mousePreviousPosY && mouseRightClick == true && mapTilesArray[mapTilesArray.length - 1].yPos > 580){
        mousePreviousPosY = mouseY;
        MoveMap(0, -4);
    }
    mouseCurrentPosX = mouseX;
    mouseCurrentPosY = mouseY;
};
//Mouse button release
canvas.addEventListener("mouseup", mouseUpHandler, false);
function mouseUpHandler(event) {
    if(event.button == "2"){
        mouseRightClick = false;
        return;
    }
    else if(event.button == "0"){
        drawSelect = false;
        return;
    }
};
//
function PickAndDropBuilding(){
    if(pickDropSolarPanel == true){
        if(0)
        {
            ctx.fillStyle = "green";
        }
        else{
            ctx.fillStyle = "red";
        }
        ctx.fillRect(mouseCurrentPosX - 15, mouseCurrentPosY - 15, 32, 32);
        solarPanelTransparent.src = "/images/tileMap/solarPanelTransparent.png";
        ctx.drawImage(solarPanelTransparent, mouseCurrentPosX - 15, mouseCurrentPosY - 15, 32, 32);
    }
};
//
function DrawSelectRect(){
    if(drawSelect == true){
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 229, 229, 1)";
        ctx.rect(mousePreviousPosX, mousePreviousPosY, mouseCurrentPosX - mousePreviousPosX, mouseCurrentPosY - mousePreviousPosY);
        ctx.stroke();
    }
}
//
function MoveMap(x, y){
    for (let i = 0; i < mapTilesArray.length; i++) {
        mapTilesArray[i].xPos += x;
        mapTilesArray[i].yPos += y;
        if(buildingArray[i] != undefined){
            buildingArray[i].xPos += x;
            buildingArray[i].yPos += y;
        }
    }
}
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
function drawBuildings(){
    for (let i = 0; i < buildingArray.length; i++) {
        buildingArray[i].draw();
    }
};
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