// Player variables
const player = {cash: 9000, energyDemand: 0, availableEnergy: 0};
// Player base data
const playerBaseData = [
{src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 328, y: 0, tag: "solarPanel", cost: 800, limit: 10, hp: 50},
{src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 328, y: 32, tag: "solarPanel", cost: 800, limit: 10, hp: 50},
{src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 328, y: 64, tag: "solarPanel", cost: 800, limit: 10, hp: 50},
{src: "./images/buildings/mainBuilding.png", width: 90, height: 90, x: 360, y: 0, tag: "mainBuilding", cost: 3000, limit: 1, hp: 200}
];
// Display player cash
function DisplayPlayerCash(){
    ctx.fillStyle = "white";
    ctx.font = "25px Arial";
    ctx.fillText("" + player.cash, 820, 90);
};
// Load player base
function LoadPlayerBase(){
    for (const building in playerBaseData) {
        const storeBuilding = new BuildingObjects(playerBaseData[building].src, playerBaseData[building].width, playerBaseData[building].height, playerBaseData[building].x, playerBaseData[building].y, playerBaseData[building].tag, playerBaseData[building].cost, playerBaseData[building].limit, playerBaseData[building].hp);
        storeBuilding.tag === "solarPanel" ? player.availableEnergy += 10 : player.energyDemand += 20;
        buildingLayer.push(storeBuilding);
    }
};
// Check if you have enough energy
