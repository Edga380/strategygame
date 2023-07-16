// Player variables
const player = {cash: 15000, energyDemand: 0, availableEnergy: 0};
// Player base data
const playerBaseData = [
{src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 328, y: 0, tag: "solarPanel", cost: 800, limit: 10, hp: 50},
{src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 328, y: 32, tag: "solarPanel", cost: 800, limit: 10, hp: 50},
{src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 328, y: 64, tag: "solarPanel", cost: 800, limit: 10, hp: 50},
{src: "./images/buildings/mainBuilding.png", width: 90, height: 90, x: 360, y: 0, tag: "mainBuilding", cost: 3000, limit: 1, hp: 200}
];
// Display player cash
function DisplayPlayerCash(){
    // Text styling
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    // Display text at specific coordinates on canvas
    ctx.fillText("" + player.cash, 820, 90);
};
// Load player base
function LoadPlayerBase(){
    // Loop through player base data
    for (const building in playerBaseData) {
        // Store new building object
        const storeBuilding = new BuildingObjects(playerBaseData[building].src, playerBaseData[building].width, playerBaseData[building].height, playerBaseData[building].x, playerBaseData[building].y, playerBaseData[building].tag, playerBaseData[building].cost, playerBaseData[building].limit, playerBaseData[building].hp);
        // If stored building is with tag "solarPanel" then raise available energy if not raise energy demand
        storeBuilding.tag === "solarPanel" ? player.availableEnergy += 10 : player.energyDemand += 20;
        // Push new building object to building layer
        buildingLayer.push(storeBuilding);
    }
};
