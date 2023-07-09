const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
// Map layout
const timeMap01 = [
    [1, 1, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 1, 1, 1, 1, 1, 39, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 69, 70, 71, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 1, 1, 1, 1, 1, 35, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 76, 77, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61, 62, 54, 1, 1, 1, 1, 1, 35, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 39, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 67, 68, 1, 1, 1, 1, 1, 1, 33, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 33, 0, 0, 48, 9, 43, 0, 61, 62, 30, 31, 31, 31, 32, 72, 73, 1, 1, 1, 1, 1, 1, 82, 83, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 55, 30, 32, 54, 1, 11, 66, 67, 68, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 87, 88, 89, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 55, 72, 73, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 93, 94, 0, 0, 0, 61, 62, 30, 31, 31, 32],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20, 0, 0, 0, 66, 67, 68, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 55, 30, 31, 32, 72, 73, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 56, 36, 37, 37, 37, 38, 57, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 39, 0, 0, 0, 0, 0, 40, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 35, 0, 0, 0, 0, 0, 41, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 35, 0, 0, 0, 0, 0, 41, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 35, 0, 0, 0, 0, 0, 41, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 33, 0, 0, 0, 0, 0, 34, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 55, 30, 31, 31, 31, 32, 54, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 56, 36, 38, 57, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18, 0, 0, 21, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 24, 0, 0, 50, 57, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 97, 98, 45, 0, 0, 0, 21, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 102, 103, 104, 0, 0, 0, 0, 27, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 56, 108, 109, 0, 0, 0, 0, 0, 44, 57, 1, 1],
    [57, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 0, 0, 0, 0, 0, 0, 0, 0, 40, 1, 1],
    [44, 36, 37, 38, 114, 115, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17, 0, 0, 0, 0, 0, 0, 0, 0, 41, 1, 1],
    [0, 0, 0, 0, 120, 121, 122, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 23, 0, 0, 0, 0, 0, 0, 0, 0, 34, 1, 1],
    [0, 0, 0, 0, 0, 127, 128, 14, 57, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 55, 30, 32, 43, 0, 0, 0, 61, 62, 54, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 99, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 55, 49, 0, 66, 67, 68, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 123, 124, 125, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 55, 7, 72, 73, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 129, 130, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 61, 62, 30, 32, 54, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 66, 67, 68, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 48, 72, 73, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
// Tile map variables
const miniMaptileWidth = 5;
const miniMaptileHeight = 5;
const tileWidth = 60;
const tileHeight = 60;
const tileSet = new Image();
tileSet.src = "./images/tileMap/tileMap.png";
console.log(tileSet);
const tileSetWidth = tileSet.width;
const tileSetHeight = tileSet.height;
const numTileSetColumns = Math.floor(tileSetWidth / tileWidth);
const numTilesetRows = Math.floor(tileSetHeight / tileHeight);
canvas.width = tileWidth * 16;
canvas.height = tileHeight * 12;
let cameraWidth = tileWidth * 16;
let cameraHeight = tileHeight * 12;
let cameraX = 0;
let cameraY = 0;
let cameraBoundariesMaxX = (tileWidth * timeMap01[0].length) - (tileWidth * 16)
let cameraBoundariesMaxY = (tileHeight * timeMap01.length) - (tileHeight * 12)
// Oil puddle
const oilPuddle = new Image;
oilPuddle.src = "./images/tileMap/oilHarvest01.png";
// Star game page
let startGame = false;
const startGameBg = new Image;
startGameBg.src = "./images/tileMap/background.png";
// Start game button
const startButtonBg = new Image;
startButtonBg.src = "./images/UI/buttonBg.png";
// You win page
const youWinBg = new Image;
youWinBg.src = "./images/UI/bg800x500.png";
// You win page
let youWin = false;
// You lose page
let youLose = false;
// Draw map function
function DrawTileMap(){
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const startX = Math.floor(cameraX / tileWidth);
    const startY = Math.floor(cameraY / tileHeight);
    const endX = Math.ceil((cameraX + cameraWidth) / tileWidth);
    const endY = Math.ceil((cameraY + cameraHeight) / tileHeight);

    for (let y = startY; y < endY; y++) {
        for (let x = startX; x < endX; x++) {
            if (y >= 0 && y < timeMap01.length && x >= 0 && x < timeMap01[y].length) {
                const tile = timeMap01[y][x];
                const tileX = x * tileWidth - cameraX;
                const tileY = y * tileHeight - cameraY;

                const tileSetX = (tile % numTileSetColumns) * tileWidth;
                const tileSetY = Math.floor(tile / numTileSetColumns) * tileHeight;

                ctx.drawImage(tileSet, tileSetX, tileSetY, tileWidth, tileHeight, tileX, tileY, tileWidth, tileHeight);
            }
        }
    }
    // Draw oil puddle
    ctx.drawImage(oilPuddle, 200 - cameraX, 1100 - cameraY, 300, 261);
    ctx.drawImage(oilPuddle, 1700 - cameraX, 700 - cameraY, 300, 261);
};
// Draw built buildings
function DrawBuiltBuilding(){
    for (const building in buildingLayer) {
        buildingLayer.length > 0 ? buildingLayer[building].Draw() : null;
    }
    for (const building in enemyStoredBuildings) {
        enemyStoredBuildings.length > 0 ? enemyStoredBuildings[building].Draw() : null;
    }
};
// Draw soldiers / vehicles
function DrawSoldiersVehicles(){
    // Player army
    for (const storedVehicleSoldier in storedVehiclesSoldiers) {
        storedVehiclesSoldiers.length > 0 ? storedVehiclesSoldiers[storedVehicleSoldier].Draw() : null;
    }
    // Enemy army
    for (const enemyStoredVehicleSoldier in enemyStoredVehiclesSoldiers) {
        enemyStoredVehiclesSoldiers.length > 0 ? enemyStoredVehiclesSoldiers[enemyStoredVehicleSoldier].Draw() : null;
    }
};
// Draw mini map
function DrawMiniMap(){
    for (let y = 0; y < timeMap01.length; y++) {
        for (let x = 0; x < timeMap01[0].length; x++) {
            if (y >= 0 && y < timeMap01.length && x >= 0 && x < timeMap01[y].length) {
                const tile = timeMap01[y][x];
                const tileX = (x + 152) * miniMaptileWidth;
                const tileY = (y + 22) * miniMaptileHeight;

                const tileSetX = (tile % numTileSetColumns) * tileWidth;
                const tileSetY = Math.floor(tile / numTileSetColumns) * tileHeight;

                ctx.drawImage(tileSet, tileSetX, tileSetY, tileWidth, tileHeight, tileX, tileY, miniMaptileWidth, miniMaptileHeight);
            }
        }
    }
};
// Draw camera position on mini map
function CameraPosOnMiniMap(){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.rect(760 + cameraX / 12, 110 + cameraY / 12.5, 80, 65);
    ctx.stroke();
};
// Start game
function StartGame(){
    if(!startGame){
        ctx.drawImage(startGameBg, 0, 0, 960, 720);
        ctx.drawImage(startButtonBg, 359, 460, 212, 46);
        ctx.font = "30px Arial";
        ctx.fillText("Start", 432 ,493);
    }
};
// You win
function YouWin(){
    if(startGame && enemyStoredBuildings.length <= 0 && enemyStoredVehiclesSoldiers.length <= 0){
        youWin = true;
        clearInterval(enemyVaweAttack);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, timeMap01.length * tileWidth, timeMap01.length * tileHeight);
        ctx.drawImage(youWinBg, 180, 100, 600, 400);
        ctx.drawImage(startButtonBg, 359, 517, 212, 46);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Play again", 395 ,550);
        ctx.fillText("You win!", 420 ,140);
    }
};
// You lose
function YouLose(){
    if(startGame && buildingLayer.length <= 0 && storedVehiclesSoldiers.length <= 0){
        youLose = true;
        clearInterval(enemyVaweAttack);
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, timeMap01.length * tileWidth, timeMap01.length * tileHeight);
        ctx.drawImage(youWinBg, 180, 100, 600, 400);
        ctx.drawImage(startButtonBg, 359, 517, 212, 46);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Play again", 395 ,550);
        ctx.fillText("You lose", 420 ,140);
    }
};
