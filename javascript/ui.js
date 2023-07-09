// Ui variables
const uiComponentsData = [
    {src: "./images/UI/uiMiniMap.png", x: 750, y: 100, width: 200, height: 200, tag: "uiBackground",},
    {src: "./images/UI/uiMenu.png", x: 750, y: 350, width: 200, height: 300, tag: "uiBackground"},
    {src: "./images/UI/uiBuildingConstruction.png", x: 715, y: 370, width: 30, height: 60, tag: "uiButton", func: BuildingsPage.bind(this)},
    {src: "./images/UI/uiSoldierTraining.png", x: 715, y: 435, width: 30, height: 60, tag: "uiButton", func: SoldiersPage.bind(this)},
    {src: "./images/UI/uiVehicleManufacturing.png", x: 715, y: 500, width: 30, height: 60, tag: "uiButton", func: VehiclesPage.bind(this)},
    {src: "./images/UI/wallUi.png", x: 755, y: 370, width: 60, height: 60, tag: "uiWall", page: 0, func: undefined},
    {src: "./images/UI/solarPanelUi.png", x: 820, y: 370, width: 60, height: 60, tag: "uiSolarPanel", page: 0, func: undefined},
    {src: "./images/UI/harvestingBuildingUi.png", x: 885, y: 370, width: 60, height: 60, tag: "uiHarvestingBuilding", page: 0, func: undefined},
    {src: "./images/UI/vehicleFactoryUi.png", x: 755, y: 435, width: 60, height: 60, tag: "uiVehicleFactory", page: 0, func: undefined},
    {src: "./images/UI/soldierBarracksUi.png", x: 820, y: 435, width: 60, height: 60, tag: "uiSoldiersBarracks", page: 0, func: undefined},
    {src: "./images/UI/soldierRiffleUi.png", x: 755, y: 370, width: 60, height: 60, tag: "uiSoldierRiffle", page: 1, func: undefined},
    {src: "./images/UI/soldierRocketUi.png", x: 820, y: 370, width: 60, height: 60, tag: "uiSoldierRocket", page: 1, func: undefined},
    {src: "./images/UI/tank01Ui.png", x: 755, y: 370, width: 60, height: 60, tag: "uiTank01", page: 2, func: undefined},
    {src: "./images/UI/armoredVehicle01Ui.png", x: 820, y: 370, width: 60, height: 60, tag: "uiArmoredVehicle01", page: 2, func: undefined},
    {src: "./images/UI/harvester01Ui.png", x: 885, y: 370, width: 60, height: 60, tag: "uiHarvester", page: 2, func: undefined}
];
let currentPage = 0;
const uiComponentsPage0 = [];
const uiComponentsPage1 = [];
const uiComponentsPage2 = [];
const uiStaticComponents = [];
// Text box
let informationText = [];
let yCoordinate = 20;
// Draw and drop selected building variables
let selectedBuilding = {isSelected: false, src: undefined, width: undefined, height: undefined, x: undefined, y: undefined, tag: undefined, cost: undefined, limit: undefined, hp: undefined};
// Stored building
const buildingLayer = [];
// Building class
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
    Draw(){
        ctx.drawImage(this.image, this.x - cameraX, this.y - cameraY, this.width, this.height);
    }
}
// UiComponents class
class UiComponents {
    constructor(src, x, y, width, height, tag, page, func){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tag = tag;
        this.page = page;
        this.func = func;
    }
    Draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}
// Load UI elements
function LoadUi(){
    for (const uiComponentData in uiComponentsData) {
        switch (uiComponentsData[uiComponentData].page) {
            case undefined:
                const uiComponent = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func);
                uiStaticComponents.push(uiComponent);
                break;
            case 0:
                const uiComponentPage0 = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func);
                uiComponentsPage0.push(uiComponentPage0);
                break;
            case 1:
                const uiComponentPage1 = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func);
                uiComponentsPage1.push(uiComponentPage1);
                break;
            case 2:
                const uiComponentPage2 = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func);
                uiComponentsPage2.push(uiComponentPage2);
                break;
        }
    }
};
LoadUi();
// Draws UI elements on canvas
function DrawUi(){
    for (const uiStaticComponent in uiStaticComponents) {
        uiStaticComponents[uiStaticComponent].Draw();
    }
    switch (currentPage) {
        case 0:
            for (const uiComponentPage0 in uiComponentsPage0) {
                uiComponentsPage0[uiComponentPage0].Draw();
            }
            break;
        case 1:
            for (const uiComponentPage1 in uiComponentsPage1) {
                uiComponentsPage1[uiComponentPage1].Draw();
            }
            break;
        case 2:
            for (const uiComponentPage2 in uiComponentsPage2) {
                uiComponentsPage2[uiComponentPage2].Draw();
            }
            break;
    }
};
// Check button pressed
function ButtonPressed(mouseX, mouseY){
    for (const uiStaticComponent in uiStaticComponents) {
        if(uiStaticComponents[uiStaticComponent].tag == "uiButton" && uiStaticComponents[uiStaticComponent].x < mouseX && uiStaticComponents[uiStaticComponent].x + uiStaticComponents[uiStaticComponent].width > mouseX &&
        uiStaticComponents[uiStaticComponent].y < mouseY && uiStaticComponents[uiStaticComponent].y + uiStaticComponents[uiStaticComponent].height > mouseY){
            uiStaticComponents[uiStaticComponent].func();
            selectedBuilding.isSelected = false;
            ResetVariablesSelectedBuilding();
            return;
        }
    }
    switch (currentPage) {
        case 0:
            for (const uiComponentPage0 in uiComponentsPage0) {
                if(uiComponentsPage0[uiComponentPage0].x < mouseX && uiComponentsPage0[uiComponentPage0].x + uiComponentsPage0[uiComponentPage0].width > mouseX &&
                uiComponentsPage0[uiComponentPage0].y < mouseY && uiComponentsPage0[uiComponentPage0].y + uiComponentsPage0[uiComponentPage0].height > mouseY){
                    selectedBuilding.isSelected = false;
                    ResetVariablesSelectedBuilding();
                    switch (uiComponentsPage0[uiComponentPage0].tag) {
                        case "uiWall":
                            selectedBuilding.src = "./images/buildings/wall.png";
                            selectedBuilding.width = 20;
                            selectedBuilding.height = 20;
                            selectedBuilding.x = 0;
                            selectedBuilding.y = 0;
                            selectedBuilding.tag = "wall";
                            selectedBuilding.cost = 500;
                            selectedBuilding.limit = 30;
                            selectedBuilding.hp = 30;
                            informationText.push({string: "Wall cost: 500", color: "yellow"});
                            break;
                        case "uiSolarPanel":
                            selectedBuilding.src = "./images/buildings/solarPanel.png";
                            selectedBuilding.width = 32;
                            selectedBuilding.height = 32;
                            selectedBuilding.x = 0;
                            selectedBuilding.y = 0;
                            selectedBuilding.tag = "solarPanel";
                            selectedBuilding.cost = 800;
                            selectedBuilding.limit = 10;
                            selectedBuilding.hp = 50;
                            informationText.push({string: "Solar panel cost: 800", color: "yellow"});
                            break;
                        case "uiHarvestingBuilding":
                            selectedBuilding.src = "./images/buildings/harvestingBuilding.png";
                            selectedBuilding.width = 105;
                            selectedBuilding.height = 60;
                            selectedBuilding.x = 0;
                            selectedBuilding.y = 0;
                            selectedBuilding.tag = "harvestingBuilding";
                            selectedBuilding.cost = 3000;
                            selectedBuilding.limit = 3;
                            selectedBuilding.hp = 100;
                            informationText.push({string: "Harvesting building cost: 3000", color: "yellow"});
                            break;
                        case "uiVehicleFactory":
                            selectedBuilding.src = "./images/buildings/vehicleFactory.png";
                            selectedBuilding.width = 90;
                            selectedBuilding.height = 60;
                            selectedBuilding.x = 0;
                            selectedBuilding.y = 0;
                            selectedBuilding.tag = "vehicleFactory";
                            selectedBuilding.cost = 1200;
                            selectedBuilding.limit = 1;
                            selectedBuilding.hp = 100;
                            informationText.push({string: "Vehicle factory cost: 1200", color: "yellow"});
                            break;
                        case "uiSoldiersBarracks":
                            selectedBuilding.src = "./images/buildings/soldierBarracks.png";
                            selectedBuilding.width = 60;
                            selectedBuilding.height = 60;
                            selectedBuilding.x = 0;
                            selectedBuilding.y = 0;
                            selectedBuilding.tag = "soldierBarracks";
                            selectedBuilding.cost = 1000;
                            selectedBuilding.limit = 1;
                            selectedBuilding.hp = 100;
                            informationText.push({string: "Soldier barracks cost: 1000", color: "yellow"});
                            break;
                    }
                    selectedBuilding.isSelected = true;
                }
            }
            break;
        case 1:
            for (const uiComponentPage1 in uiComponentsPage1) {
                if(uiComponentsPage1[uiComponentPage1].x < mouseX && uiComponentsPage1[uiComponentPage1].x + uiComponentsPage1[uiComponentPage1].width > mouseX &&
                uiComponentsPage1[uiComponentPage1].y < mouseY && uiComponentsPage1[uiComponentPage1].y + uiComponentsPage1[uiComponentPage1].height > mouseY){
                    switch (uiComponentsPage1[uiComponentPage1].tag) {
                        case "uiSoldierRiffle":
                            informationText.push({string: "Soldier with rifle cost: 500", color: "yellow"});
                            if(CheckIfBuildingIsPresent("soldierBarracks")){
                                TrainingManufacturing("./images/soldiers/soldierRiffle.png", BuildingCoordinates("soldierBarracks").x, BuildingCoordinates("soldierBarracks").y, 26, 23, 1, 30, 20, 5, "soldier", 500);
                            }
                            else{
                                informationText.push({string: "You can't train soldiers without soldier barracks.", color: "red"});
                            }
                            break;
                        case "uiSoldierRocket":
                            informationText.push({string: "Soldier with rocket launcher cost: 800", color: "yellow"});
                            if(CheckIfBuildingIsPresent("soldierBarracks")){
                                TrainingManufacturing("./images/soldiers/soldierRocket.png", BuildingCoordinates("soldierBarracks").x, BuildingCoordinates("soldierBarracks").y, 31, 23, 1, 30, 20, 5, "soldier", 800);
                            }
                            else{
                                informationText.push({string: "You can't train soldiers without soldier barracks.", color: "red"});
                            }
                            break;
                    }
                }
            }
            break;
        case 2:
            for (const uiComponentPage2 in uiComponentsPage2) {
                if(uiComponentsPage2[uiComponentPage2].x < mouseX && uiComponentsPage2[uiComponentPage2].x + uiComponentsPage2[uiComponentPage2].width > mouseX &&
                uiComponentsPage2[uiComponentPage2].y < mouseY && uiComponentsPage2[uiComponentPage2].y + uiComponentsPage2[uiComponentPage2].height > mouseY){
                    switch (uiComponentsPage2[uiComponentPage2].tag) {
                        case "uiTank01":
                            informationText.push({string: "Tank cost: 1500", color: "yellow"});
                            if(CheckIfBuildingIsPresent("vehicleFactory")){
                                TrainingManufacturing("./images/vehicles/tank01.png", BuildingCoordinates("vehicleFactory").x + 60, BuildingCoordinates("vehicleFactory").y, 60, 49, 1, 100, 10, 12, "tankVehicle", 1500);
                            }
                            else{
                                informationText.push({string: "You can't manufacture Tank without Vehicle Factory.", color: "red"});
                            }
                            break;
                        case "uiArmoredVehicle01":
                            informationText.push({string: "Armored vehicle with machine gun cost: 1200", color: "yellow"});
                            if(CheckIfBuildingIsPresent("vehicleFactory")){
                                TrainingManufacturing("./images/vehicles/armoredVehicle01.png", BuildingCoordinates("vehicleFactory").x + 60, BuildingCoordinates("vehicleFactory").y + 10, 60, 40, 2, 8000, 15, 6, "armoredVehicle", 1200);
                            }
                            else{
                                informationText.push({string: "You can't manufacture Armored vehicle without Vehicle Factory.", color: "red"});
                            }
                            break;
                        case "uiHarvester":
                            informationText.push({string: "Harvester cost: 2000", color: "yellow"});
                            if(CheckIfBuildingIsPresent("vehicleFactory")){
                                TrainingManufacturing("./images/vehicles/harvester01.png", BuildingCoordinates("vehicleFactory").x + 60, BuildingCoordinates("vehicleFactory").y + 9, 60, 39, 1, 100, 3, 0, "harvestingVehicle", 2000);
                            }
                            else{
                                informationText.push({string: "You can't manufacture Harvester without Vehicle Factory.", color: "red"});
                            }
                            break;
                    }
                }
            }
            break;
    }
};
// Train soldiers / Manufacture vehicles
function TrainingManufacturing(src, x, y, width, height, speed, hp, limit, damage, tag, cost){
    if(BuildingSoldierVehicleLimit(tag) < limit && player.cash >= cost){
        const vehicleOrSoldier = new VehiclesSoldiers(src, x, y, width, height, speed, hp, limit, damage, tag, x, y);
        if(vehicleOrSoldier.tag === "harvestingVehicle"){
            vehicleOrSoldier.Movement(300 + Math.random() * 100, 1200 + Math.random() * 100);
        }
        else{
            vehicleOrSoldier.CheckForEnemies();
        }
        storedVehiclesSoldiers.push(vehicleOrSoldier);
        player.cash -= cost;
        tag === "soldier" ? informationText.push({string: "Training.", color: "green"}) : informationText.push({string: "Manufacturing.", color: "green"});
    }
    else if(player.cash < cost){
        informationText.push({string: "You don't have enough cash.", color: "red"});
    }
    else{
        tag === "soldier" ? informationText.push({string: "You can't train this type of soldier, limit have been reached.", color: "red"}) : informationText.push({string: "You can't manufacture this type of vehicle, limit have been reached.", color: "red"});
    }
};
// Checks if building is present in buildingLayer array
function CheckIfBuildingIsPresent(tag){
    for (const building in buildingLayer) {
        if(buildingLayer[building].tag == tag){
            return true;
        }
    }
    return false;
};
// Display selected building on the canvas
function DisplaySelectedBuilding(src, width, height){
    if(selectedBuilding.isSelected){
        BuildableArea() && BuildingSoldierVehicleLimit(selectedBuilding.tag) < selectedBuilding.limit && player.cash >= selectedBuilding.cost? ctx.fillStyle = "green" : ctx.fillStyle = "red";
        image = new Image();
        image.src = src;
        ctx.fillRect(mouseCurrentPosX - width / 2, mouseCurrentPosY - height / 2, width, height, width, height);
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.drawImage(image, mouseCurrentPosX - width / 2, mouseCurrentPosY - height / 2, width, height);
        ctx.restore();
    }
};
// Build building
function Build(){
    if(BuildingSoldierVehicleLimit(selectedBuilding.tag) >= selectedBuilding.limit){
        informationText.push({string: "Building limit have been reached.", color: "red"});
    }
    else if(player.cash < selectedBuilding.cost){
        informationText.push({string: "You don't have enough cash.", color: "red"});
    }
    else{
        const building = new BuildingObjects(selectedBuilding.src, selectedBuilding.width, selectedBuilding.height, mouseCurrentPosX + cameraX - selectedBuilding.width / 2, mouseCurrentPosY + cameraY - selectedBuilding.height / 2, selectedBuilding.tag, selectedBuilding.cost, selectedBuilding.limit, selectedBuilding.hp);
        buildingLayer.push(building);
        // Check if it's harvesting building if yes manufacture harvesting vehicle too
        if(selectedBuilding.tag === "harvestingBuilding"){
            TrainingManufacturing("./images/vehicles/harvester01.png", building.x + 60, building.y + 9, 60, 39, 1, 10, 20, 0, "harvestingVehicle", 0);
        }
        player.cash -= selectedBuilding.cost;
        selectedBuilding.isSelected = false;
        ResetVariablesSelectedBuilding();
        informationText.push({string: "Build!", color: "green"});
    }
};
// Building button
function BuildingsPage(){
    currentPage = 0;
};
// Soldier button
function SoldiersPage(){
    currentPage = 1;
};
// Soldier button
function VehiclesPage(){
    currentPage = 2;
};
// Draw rectangle to select vehicles/Soldiers
function DrawRectangleToSelectArmyUnits(){
    if(selectArmy){
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 229, 229, 1)";
        ctx.rect(mousePreviousPosX, mousePreviousPosY, mouseCurrentPosX - mousePreviousPosX, mouseCurrentPosY - mousePreviousPosY);
        ctx.stroke();
    }
};
// Check if area is buildable
function BuildableArea(){
    // Check if building over UI elements
    for (const uiComponentData in uiComponentsData) {
        if(uiComponentsData[uiComponentData].x <= mouseCurrentPosX + selectedBuilding.width / 2 && uiComponentsData[uiComponentData].x + uiComponentsData[uiComponentData].width >= mouseCurrentPosX - selectedBuilding.width / 2 && 
        uiComponentsData[uiComponentData].y <= mouseCurrentPosY + selectedBuilding.height / 2  && uiComponentsData[uiComponentData].y + uiComponentsData[uiComponentData].height >= mouseCurrentPosY - selectedBuilding.height / 2){
            return false;
        }
    }
    // Check if building over excisting buildings
    for (const builLayer in buildingLayer) {
        if(buildingLayer[builLayer].x <= mouseCurrentPosX + cameraX + selectedBuilding.width / 2 && buildingLayer[builLayer].x + buildingLayer[builLayer].width >= mouseCurrentPosX + cameraX - selectedBuilding.width / 2 && 
        buildingLayer[builLayer].y <= mouseCurrentPosY + cameraY + selectedBuilding.height / 2  && buildingLayer[builLayer].y + buildingLayer[builLayer].height >= mouseCurrentPosY + cameraY - selectedBuilding.height / 2){
            return false;
        }
    }
    // Check if building over buildable tiles
    const tileX = Math.floor(mouseCurrentPosX / tileWidth + Math.floor(cameraX / tileWidth));
    const tileY = Math.floor(mouseCurrentPosY / tileHeight + Math.floor(cameraY / tileHeight));
    if(tileX >= 0 && tileX < timeMap01[0].length && tileY >= 0 && tileY < timeMap01.length){
        const currentTile = timeMap01[tileY][tileX];
        return currentTile === 0 ? true : false;
    }
};
// Check if Building/Soldier/Vehicle limit reached
function BuildingSoldierVehicleLimit(selectedBuildingTag){
    let checkLimit = 0;
    for (const building in buildingLayer) {
        if(buildingLayer[building].tag === selectedBuildingTag){
            checkLimit++;
        }
    }
    for (const armyUnit in storedVehiclesSoldiers) {
        if(storedVehiclesSoldiers[armyUnit].tag === selectedBuildingTag){
            checkLimit++;
        }
    }
    return checkLimit;
};
// Display messages top left corner
function TextBoxTopLeftCorner(){
    for (let i = 0; i < informationText.length; i++) {
        if(informationText.length >= 6){
            informationText.shift();
        }
        ctx.fillStyle = informationText[i].color;
        ctx.font = "15px Arial";
        ctx.fillText(informationText[i].string, 10, yCoordinate * (i + 1));
    }
};
// Check for coordinates of buildings on the map Returns [x, y]
function BuildingCoordinates(tag){
    for (const building in buildingLayer) {
        if(buildingLayer[building].tag === tag){
            return {x: buildingLayer[building].x, y: buildingLayer[building].y};
        }
    }
    return null;
};
// Reset selected building variables
function ResetVariablesSelectedBuilding(){
    selectedBuilding.src = undefined;
    selectedBuilding.width = undefined;
    selectedBuilding.height = undefined;
    selectedBuilding.x = undefined;
    selectedBuilding.y = undefined;
    selectedBuilding.tag = undefined;
    selectedBuilding.cost = undefined;
    selectedBuilding.limit = undefined;
    selectedBuilding.hp = undefined;
};