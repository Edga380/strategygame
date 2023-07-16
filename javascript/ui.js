// Ui variables
const uiComponentsData = [
    {src: "./images/UI/uiMiniMap.png", x: 750, y: 100, width: 200, height: 200, tag: "uiBackground"},
    {src: "./images/UI/uiMenu.png", x: 750, y: 350, width: 200, height: 300, tag: "uiBackground"},
    {src: "./images/UI/uiBuildingConstruction.png", x: 715, y: 370, width: 30, height: 60, tag: "uiButton", func: BuildingsPage.bind(this)},
    {src: "./images/UI/uiSoldierTraining.png", x: 715, y: 435, width: 30, height: 60, tag: "uiButton", func: SoldiersPage.bind(this)},
    {src: "./images/UI/uiVehicleManufacturing.png", x: 715, y: 500, width: 30, height: 60, tag: "uiButton", func: VehiclesPage.bind(this)},
    {src: "./images/UI/fixTool.png", x: 750, y: 305, width: 40, height: 40, tag: "fixButton", page: null, func: FixBuildings.bind(this)},
    {src: "./images/UI/sellTool.png", x: 800, y: 305, width: 40, height: 40, tag: "sellButton", page: null, func: SellBuildings.bind(this)},
    {src: "./images/UI/wallUi.png", x: 755, y: 370, width: 60, height: 60, tag: "uiWall", page: 0, func: undefined, cost: 500},
    {src: "./images/UI/solarPanelUi.png", x: 820, y: 370, width: 60, height: 60, tag: "uiSolarPanel", page: 0, func: undefined, cost: 800},
    {src: "./images/UI/harvestingBuildingUi.png", x: 885, y: 370, width: 60, height: 60, tag: "uiHarvestingBuilding", page: 0, func: undefined, cost: 3000},
    {src: "./images/UI/vehicleFactoryUi.png", x: 755, y: 435, width: 60, height: 60, tag: "uiVehicleFactory", page: 0, func: undefined, cost: 1200},
    {src: "./images/UI/soldierBarracksUi.png", x: 820, y: 435, width: 60, height: 60, tag: "uiSoldiersBarracks", page: 0, func: undefined, cost: 1000},
    {src: "./images/UI/soldierRiffleUi.png", x: 755, y: 370, width: 60, height: 60, tag: "uiSoldierRiffle", page: 1, func: undefined, cost: 500},
    {src: "./images/UI/soldierRocketUi.png", x: 820, y: 370, width: 60, height: 60, tag: "uiSoldierRocket", page: 1, func: undefined, cost: 800},
    {src: "./images/UI/tank01Ui.png", x: 755, y: 370, width: 60, height: 60, tag: "uiTank01", page: 2, func: undefined, cost: 1500},
    {src: "./images/UI/armoredVehicle01Ui.png", x: 820, y: 370, width: 60, height: 60, tag: "uiArmoredVehicle01", page: 2, func: undefined, cost: 1200},
    {src: "./images/UI/harvester01Ui.png", x: 885, y: 370, width: 60, height: 60, tag: "uiHarvester", page: 2, func: undefined, cost: 2000}
];
let currentPage = 0;
const uiComponentsPage0 = [];
const uiComponentsPage1 = [];
const uiComponentsPage2 = [];
const uiStaticComponents = [];
const menuUpperButtons = [];
let fixButtonActive = false;
let sellButtonActive = false;
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
        this.storeHp = hp;
        this.recoverHp = false;
        this.recoveryInterval = 0;
        this.fixImage = new Image();
        this.fixImage.src = "./images/UI/fixToolCursor.png";
        // Explosion variables
        this.explosionImage = new Image();
        this.explosionImage.src = "./images/animation/explosionSheet.png";
        this.explosionNum = 0;
        this.changeAnimationImg = -1;
        this.explosionAnimationFrame = null;
    }
    Draw(){
        ctx.drawImage(this.image, this.x - cameraX, this.y - cameraY, this.width, this.height);
        // Draw hp bar
        this.DisplayHpBar();
        // RecoverHp
        this.RecoverHp();
    }
    Explosion(){
        // Explosion timer
        if(this.explosionNum < 60){
            // Change image from explosion image sheet
            if(this.explosionNum % 10 === 0){
                this.changeAnimationImg++;
            }
            // Display selected image
            ctx.drawImage(this.explosionImage, this.changeAnimationImg * 240, 0, 240, 240, this.x - cameraX, this.y - cameraY, this.width, this.width);
            this.explosionNum++;
            // Run explosion function again
            this.explosionAnimationFrame = requestAnimationFrame(this.Explosion.bind(this));
        }
        // After explosionNum is more than 60 stop running animation
        else{
            cancelAnimationFrame(this.explosionAnimationFrame);
        }
    };
    DisplayHpBar(){
        // Check if hp less than stored hp
        if(this.hp < this.storeHp){
            // Calculate how much hp left
            let hpLeft = (this.hp * 100) / this.storeHp;
            // Calculate procentage of hp left
            let hpToDisplay = (30 * hpLeft) / 100;
            // Change color depending on procentage left
            if(hpLeft > 66){
                ctx.fillStyle = "green";
            }
            else if(hpLeft > 33){
                ctx.fillStyle = "yellow";
            }
            else{
                ctx.fillStyle = "red";
            }
            // Display hp over object
            ctx.fillRect(this.x - cameraX + (this.width / 2) - 15, (this.y - cameraY + this.height / 2) - 5, hpToDisplay, 5);
        }
    };
    RecoverHp(){
        if(this.recoverHp){
            // Draw building hp
            ctx.drawImage(this.fixImage, 0, 0, 49, 49, this.x + (this.width - 30) / 2 - cameraX, this.y + (this.height - 30) / 2 - cameraY, 30, 30);
        }
        // Recovers hp if viarable recoveHp true and current hp less than stored hp interval 60
        if(this.recoverHp === true && this.hp < this.storeHp && this.recoveryInterval > 60){
            // Recover hp
            this.hp++;
            // Reset interval number to 0
            this.recoveryInterval = 0;
        }
        // Check and add recovery interval
        else if(this.recoveryInterval <= 60){
            this.recoveryInterval++;
        }
        // Stop recovering hp when current hp equel stored hp
        else if(this.hp === this.storeHp){
            this.recoverHp = false;
        }
    };
}
// UiComponents class
class UiComponents {
    constructor(src, x, y, width, height, tag, page, func, cost){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tag = tag;
        this.page = page;
        this.func = func;
        this.cost = cost
    }
    Draw(){
        // Draw ui elements
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        // display cost of buildings
        if(this.cost !== undefined){
            ctx.fillStyle = "white";
            ctx.font = "16px Arial";
            ctx.fillText("" + this.cost, this.x, this.y);
        }
    }
}
// Load UI elements
function LoadUi(){
    // Loop through ui components data
    for (const uiComponentData in uiComponentsData) {
        // Check every component tag
        // Match tag
        // Push new object into appropriate array
        switch (uiComponentsData[uiComponentData].tag) {
            case "fixButton":
                const fixButton = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func, uiComponentsData[uiComponentData].cost);
                menuUpperButtons.push(fixButton);
                break;
            case "sellButton":
                const sellButton = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func, uiComponentsData[uiComponentData].cost);
                menuUpperButtons.push(sellButton);
                break;
            }
        switch (uiComponentsData[uiComponentData].page) {
            case undefined:
                const uiComponent = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func, uiComponentsData[uiComponentData].cost);
                uiStaticComponents.push(uiComponent);
                break;
            case 0:
                const uiComponentPage0 = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func, uiComponentsData[uiComponentData].cost);
                uiComponentsPage0.push(uiComponentPage0);
                break;
            case 1:
                const uiComponentPage1 = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func, uiComponentsData[uiComponentData].cost);
                uiComponentsPage1.push(uiComponentPage1);
                break;
            case 2:
                const uiComponentPage2 = new UiComponents(uiComponentsData[uiComponentData].src, uiComponentsData[uiComponentData].x, uiComponentsData[uiComponentData].y, uiComponentsData[uiComponentData].width, uiComponentsData[uiComponentData].height, uiComponentsData[uiComponentData].tag, uiComponentsData[uiComponentData].page, uiComponentsData[uiComponentData].func, uiComponentsData[uiComponentData].cost);
                uiComponentsPage2.push(uiComponentPage2);
                break;
        }
    }
};
LoadUi();
// Loop through ui static components array and draws UI elements on canvas
function DrawUi(){
    // Draw static elements
    for (const uiStaticComponent in uiStaticComponents) {
        uiStaticComponents[uiStaticComponent].Draw();
    }
    for (const menuUpperButton in menuUpperButtons) {
        menuUpperButtons[menuUpperButton].Draw();
    }
    // Draw elements if the current page corresponds the page value
    switch (currentPage) {
        // Check page value and draw ui element
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
// Check button pressed mouseX/Y is current mouse position
function ButtonPressed(mouseX, mouseY){
    // Checks if pressed on building
    CheckIfBuilding(mouseX, mouseY);
    // Checks if pressed on fix/sell buttons
    for (const menuUpperButton in menuUpperButtons) {
        // Check if fix function active already
        if(!fixButtonActive && menuUpperButtons[menuUpperButton].x < mouseX && menuUpperButtons[menuUpperButton].x + menuUpperButtons[menuUpperButton].width > mouseX &&
            menuUpperButtons[menuUpperButton].y < mouseY && menuUpperButtons[menuUpperButton].y + menuUpperButtons[menuUpperButton].height > mouseY){
            menuUpperButtons[menuUpperButton].func();
            selectedBuilding.isSelected = false;
            // Reset selected building variables
            ResetVariablesSelectedBuilding();
            return;
        }
        // Check if sell function active already
        else if(!sellButtonActive && menuUpperButtons[menuUpperButton].x < mouseX && menuUpperButtons[menuUpperButton].x + menuUpperButtons[menuUpperButton].width > mouseX &&
            menuUpperButtons[menuUpperButton].y < mouseY && menuUpperButtons[menuUpperButton].y + menuUpperButtons[menuUpperButton].height > mouseY){
            menuUpperButtons[menuUpperButton].func();
            selectedBuilding.isSelected = false;
            // Reset selected building variables
            ResetVariablesSelectedBuilding();
            return;
        }
        // If fix function active or sell function active
        else if(fixButtonActive && CheckIfBuilding(mouseX, mouseY) !== undefined || sellButtonActive && CheckIfBuilding(mouseX, mouseY) !== undefined){
            // Reset selected vehicles/soldiers array
            selectedVehiclesSoldiers = [];
            // Fix building 
            if(fixButtonActive){
                // Check if pressed on building if yes recover hp
                CheckIfBuilding(mouseX, mouseY).recoverHp = true;
                return;
            }
            // Sell building
            else if(sellButtonActive){
                for (let i = 0; i < buildingLayer.length; i++) {
                    if(CheckIfBuilding(mouseX, mouseY).x === buildingLayer[i].x && CheckIfBuilding(mouseX, mouseY).y === buildingLayer[i].y){
                        // Loop through stored vehicles/soldiers array to find harvester
                        for (const unit in storedVehiclesSoldiers) {
                            // If harvester found and its baseX/Y values the same make them null and set emptyHarvest to false so it stops emptying harvest if the building is sold
                            if(storedVehiclesSoldiers[unit].baseX === buildingLayer[i].x + 60 && storedVehiclesSoldiers[unit].baseY === buildingLayer[i].y){
                                storedVehiclesSoldiers[unit].baseX = null;
                                storedVehiclesSoldiers[unit].baseY = null;
                                storedVehiclesSoldiers[unit].emptyHarvest = false;
                            }
                        }
                        // Check building tag and reduce energy demand or available energy if tag is "solarPanel"
                        if(buildingLayer[i].tag === "solarPanel"){
                            player.availableEnergy -= 10;
                        }
                        else if(buildingLayer[i].tag === "harvestingBuilding"){
                            player.energyDemand -= 15;
                        }
                        else if(buildingLayer[i].tag === "vehicleFactory"){
                            player.energyDemand -= 10;
                        }
                        else if(buildingLayer[i].tag === "soldierBarracks"){
                            player.energyDemand -= 10;
                        }
                        else if(buildingLayer[i].tag === "mainBuilding"){
                            player.energyDemand -= 20;
                        }
                        // Pay back half of the building price
                        player.cash += buildingLayer[i].cost / 2;
                        // Remove building from the building layer array
                        buildingLayer.splice(i, 1);
                        return;
                    }
                }
                return;
            }
        }
    }
    // Reset selected building values if pressed on static ui elements
    // Prevent accidental build when pressed on ui element
    for (const uiStaticComponent in uiStaticComponents) {
        if(uiStaticComponents[uiStaticComponent].tag == "uiButton" && uiStaticComponents[uiStaticComponent].x < mouseX && uiStaticComponents[uiStaticComponent].x + uiStaticComponents[uiStaticComponent].width > mouseX &&
        uiStaticComponents[uiStaticComponent].y < mouseY && uiStaticComponents[uiStaticComponent].y + uiStaticComponents[uiStaticComponent].height > mouseY){
            uiStaticComponents[uiStaticComponent].func();
            selectedBuilding.isSelected = false;
            ResetVariablesSelectedBuilding();
            return;
        }
    }
    // Check which page if currentaly stored
    switch (currentPage) {
        // Page 0 building selection
        case 0:
            // Loop and check which of the buttons pressed
            for (const uiComponentPage0 in uiComponentsPage0) {
                if(uiComponentsPage0[uiComponentPage0].x < mouseX && uiComponentsPage0[uiComponentPage0].x + uiComponentsPage0[uiComponentPage0].width > mouseX &&
                uiComponentsPage0[uiComponentPage0].y < mouseY && uiComponentsPage0[uiComponentPage0].y + uiComponentsPage0[uiComponentPage0].height > mouseY){
                    // Reset fix/seel/isSelected variables
                    fixButtonActive = false;
                    sellButtonActive = false;
                    selectedBuilding.isSelected = false;
                    ResetVariablesSelectedBuilding();
                    // Check building tag and asign values to selected building variables
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
                    // Set isSelected to true
                    selectedBuilding.isSelected = true;
                }
            }
            break;
        // Page 1 soldier selection
        case 1:
            // Loop and check which of the buttons pressed
            for (const uiComponentPage1 in uiComponentsPage1) {
                if(uiComponentsPage1[uiComponentPage1].x < mouseX && uiComponentsPage1[uiComponentPage1].x + uiComponentsPage1[uiComponentPage1].width > mouseX &&
                uiComponentsPage1[uiComponentPage1].y < mouseY && uiComponentsPage1[uiComponentPage1].y + uiComponentsPage1[uiComponentPage1].height > mouseY){
                    // Reset fix/seel variables
                    fixButtonActive = false;
                    sellButtonActive = false;
                    // Check soldier tag
                    switch (uiComponentsPage1[uiComponentPage1].tag) {
                        case "uiSoldierRiffle":
                            // Text message is shown how much it cost
                            informationText.push({string: "Soldier with rifle cost: 500", color: "yellow"});
                            // Checks if soldier barracks building is present
                            if(CheckIfBuildingIsPresent("soldierBarracks")){
                                // Soldier training (image.src, x, y, width, height, speed, hp, limit, damage, tag, cost)
                                // BuildingCoordinestes("tag") return building x and y
                                TrainingManufacturing("./images/soldiers/soldierRiffle.png", BuildingCoordinates("soldierBarracks").x + 60, BuildingCoordinates("soldierBarracks").y + 20, 26, 23, 1, 30, 20, 5, "soldier", 500);
                            }
                            else{
                                // Error message if there is no soldier barracks
                                informationText.push({string: "You can't train soldiers without soldier barracks.", color: "red"});
                            }
                            break;
                        case "uiSoldierRocket":
                            informationText.push({string: "Soldier with rocket launcher cost: 800", color: "yellow"});
                            if(CheckIfBuildingIsPresent("soldierBarracks")){
                                TrainingManufacturing("./images/soldiers/soldierRocket.png", BuildingCoordinates("soldierBarracks").x + 60, BuildingCoordinates("soldierBarracks").y + 20, 31, 23, 1, 30, 20, 10, "soldier", 800);
                            }
                            else{
                                informationText.push({string: "You can't train soldiers without soldier barracks.", color: "red"});
                            }
                            break;
                    }
                }
            }
            break;
        // Page 2 vehicle selection
        case 2:
            // Loop and check which of the buttons pressed
            for (const uiComponentPage2 in uiComponentsPage2) {
                if(uiComponentsPage2[uiComponentPage2].x < mouseX && uiComponentsPage2[uiComponentPage2].x + uiComponentsPage2[uiComponentPage2].width > mouseX &&
                uiComponentsPage2[uiComponentPage2].y < mouseY && uiComponentsPage2[uiComponentPage2].y + uiComponentsPage2[uiComponentPage2].height > mouseY){
                    fixButtonActive = false;
                    sellButtonActive = false;
                    switch (uiComponentsPage2[uiComponentPage2].tag) {
                        case "uiTank01":
                            informationText.push({string: "Tank cost: 1500", color: "yellow"});
                            if(CheckIfBuildingIsPresent("vehicleFactory")){
                                TrainingManufacturing("./images/vehicles/tank01.png", BuildingCoordinates("vehicleFactory").x + 60, BuildingCoordinates("vehicleFactory").y + 10, 50, 41, 1, 100, 12, 12, "tankVehicle", 1500);
                            }
                            else{
                                informationText.push({string: "You can't manufacture Tank without Vehicle Factory.", color: "red"});
                            }
                            break;
                        case "uiArmoredVehicle01":
                            informationText.push({string: "Armored vehicle with machine gun cost: 1200", color: "yellow"});
                            if(CheckIfBuildingIsPresent("vehicleFactory")){
                                TrainingManufacturing("./images/vehicles/armoredVehicle01.png", BuildingCoordinates("vehicleFactory").x + 60, BuildingCoordinates("vehicleFactory").y + 15, 45, 30, 2, 70, 15, 6, "armoredVehicle", 1200);
                            }
                            else{
                                informationText.push({string: "You can't manufacture Armored vehicle without Vehicle Factory.", color: "red"});
                            }
                            break;
                        case "uiHarvester":
                            informationText.push({string: "Harvester cost: 2000", color: "yellow"});
                            if(CheckIfBuildingIsPresent("vehicleFactory")){
                                TrainingManufacturing("./images/vehicles/harvester01.png", BuildingCoordinates("vehicleFactory").x + 60, BuildingCoordinates("vehicleFactory").y + 9, 60, 39, 1, 200, 3, 0, "harvestingVehicle", 2000);
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
    // Check if current army unit limit is lower than limit and if there is enough energy to train/manufacture
    if(BuildingSoldierVehicleLimit(tag) < limit && player.cash >= cost && player.availableEnergy >= player.energyDemand){
        if(tag === "harvestingVehicle"){
            const harvester = new Harvester(src, x, y, width, height, speed, hp, limit, tag, HarvesterBase().x !== null ? HarvesterBase().x + width : null , HarvesterBase().y);
            harvester.moveToX = 300 + Math.random() * 100;
            harvester.moveToY = 1200 + Math.random() * 100;
            harvester.move = true;
            storedVehiclesSoldiers.push(harvester);
        }
        else{
            const vehicleOrSoldier = new VehiclesSoldiers(src, x, y, width, height, speed, hp, limit, damage, tag);
            vehicleOrSoldier.CheckForEnemies();
            storedVehiclesSoldiers.push(vehicleOrSoldier);
        }
        // Deduct cost from player cash
        player.cash -= cost;
        // Display different text message if soldier or vehicle
        tag === "soldier" ? informationText.push({string: "Training.", color: "green"}) : informationText.push({string: "Manufacturing.", color: "green"});
    }
    else if(player.availableEnergy < player.energyDemand){
        informationText.push({string: "You need more power build more Solar Panels!", color: "red"});
    }
    else if(player.cash < cost){
        informationText.push({string: "You don't have enough cash.", color: "red"});
    }
    else{
        tag === "soldier" ? informationText.push({string: "You can't train this type of soldier, limit have been reached.", color: "red"}) : informationText.push({string: "You can't manufacture this type of vehicle, limit have been reached.", color: "red"});
    }
};
// Checks if building is present in buildingLayer array
// Returns false or true
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
        // Check if area is buildable and if the building limit is under the limit and check if player have enoough cash
        // display green if all good or red color if not
        BuildableArea() && BuildingSoldierVehicleLimit(selectedBuilding.tag) < selectedBuilding.limit && player.cash >= selectedBuilding.cost ? ctx.fillStyle = "green" : ctx.fillStyle = "red";
        image = new Image();
        image.src = src;
        ctx.fillRect(mouseCurrentPosX - width / 2, mouseCurrentPosY - height / 2, width, height, width, height);
        ctx.save();
        // Transparent image 50%
        ctx.globalAlpha = 0.5;
        ctx.drawImage(image, mouseCurrentPosX - width / 2, mouseCurrentPosY - height / 2, width, height);
        ctx.restore();
    }
};
// Build building
function Build(){
    if(CheckIfBuildingIsPresent("mainBuilding")){
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
                const harvester = new Harvester("./images/vehicles/harvester01.png", building.x + 60, building.y, 60, 39, 1, 200, 3, "harvestingVehicle", building.x + 60, building.y);
                harvester.moveToX = 300 + Math.random() * 100;
                harvester.moveToY = 1200 + Math.random() * 100;
                harvester.move = true;
                storedVehiclesSoldiers.push(harvester);
                player.energyDemand += 15;
            }
            else if(selectedBuilding.tag === "solarPanel"){
                player.availableEnergy += 10;
            }
            else if(selectedBuilding.tag !== "wall"){
                player.energyDemand += 10;
            }
            player.cash -= selectedBuilding.cost;
            selectedBuilding.isSelected = false;
            ResetVariablesSelectedBuilding();
            informationText.push({string: "Build!", color: "green"});
        }
    }
    else{
        selectedBuilding.isSelected = false;
        ResetVariablesSelectedBuilding();
        informationText.push({string: "You can't build new buildings without Main Building.", color: "red"});
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
        ctx.lineWidth = 1;
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
// Input harvester base coordinates
function HarvesterBase(){
        for (let building in buildingLayer) {
            if(buildingLayer[building].tag === "harvestingBuilding"){
                return { x: buildingLayer[building].x, y: buildingLayer[building].y };
            }
        }
        return { x: null, y: null };
};
// Detect if pressed on building
function CheckIfBuilding(mouseX, mouseY){
    for (const building in buildingLayer) {
        if(buildingLayer[building].x <= mouseX + cameraX && buildingLayer[building].x + buildingLayer[building].width >= mouseX + cameraX && 
        buildingLayer[building].y <= mouseY + cameraY && buildingLayer[building].y + buildingLayer[building].height >= mouseY + cameraY){
            // Check if one of selected vehicles is harvester if yes set it's new base coordinates
            if(buildingLayer[building].tag == "harvestingBuilding"){
                for (const unit in selectedVehiclesSoldiers) {
                    // Check if one of selected vehicles is harvester if yes set it's new base coordinates
                    if(selectedVehiclesSoldiers[unit].tag === "harvestingVehicle"){
                        selectedVehiclesSoldiers[unit].baseX = buildingLayer[building].x + selectedVehiclesSoldiers[unit].width;
                        selectedVehiclesSoldiers[unit].baseY = buildingLayer[building].y
                        selectedVehiclesSoldiers[i].emptyHarvest = false
                        selectedVehiclesSoldiers[i].toggleHarvesting = true
                        selectedVehiclesSoldiers[i].harvesting = false;
                    }
                }
            }
            return buildingLayer[building];
        }
    }
};
// Fix button
function FixBuildings(){
    fixButtonActive = true;
};
// Sell button
function SellBuildings(){
    sellButtonActive = true;
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