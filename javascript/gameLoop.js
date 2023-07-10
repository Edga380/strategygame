// Game loop function
function gameLoop() {

// Render game objects here
DrawTileMap();
DrawBuiltBuilding();
DrawSoldiersVehicles();
DrawRectangleToSelectArmyUnits();
DrawUi();
DrawEnergy();
DrawMiniMap();
CameraPosOnMiniMap();
TextBoxTopLeftCorner();
DisplayPlayerCash();
DisplaySelectedBuilding(selectedBuilding.src, selectedBuilding.width, selectedBuilding.height);
StartGame();
YouWin();
YouLose();
// 
requestAnimationFrame(gameLoop);
};
gameLoop();