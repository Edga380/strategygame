// Game loop function
function gameLoop(){
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
ChangeMouseCursor();
// 
requestAnimationFrame(gameLoop);
};
gameLoop();