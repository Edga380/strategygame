// Enemy variables
let enemyVaweAttack = null;
// Preset coordinates fro enemy army units to move to
let coordinatesToMoveTo = [{x: 370, y: 150},{x: 520, y: 170},{x: 700, y: 160},{x: 520, y: 1100},{x: 350, y: 1250}];
// Harvester variables
let enemyHarvesterLimit = 3;
let enemyHarvestRouteBase = 0;
let enemyHarvestRoutePuddle = 0;
// Harvester data
let enemyHarvesterUnit = {src: "./images/vehicles/enemyHarvester01.png", x: 1500, y: 1560, width: 60, height: 39, speed: 1, hp: 200, limit: 3, damage: 0, tag: "enemyHarvester"};
// Army units data
let enemyArmyUnits = [
    {src: "./images/vehicles/enemyTank01.png", x: 2160, y: 1800, width: 50, height: 41, speed: 1, hp: 100, limit: 12, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyArmoredVehicle01.png", x: 2160, y: 1800, width: 45, height: 30, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRiffle.png", x: 2160, y: 1800, width: 26, height: 23, speed: 1, hp: 30, limit: 20, damage: 5, tag: "enemySoldierRiffle"},
    {src: "./images/soldiers/enemySoldierRocket.png", x: 2160, y: 1800, width: 31, height: 23, speed: 1, hp: 30, limit: 20, damage: 10, tag: "enemysSoldierRocket"}
];
//
let randomUnitNumber = 0;
// Enemy base data
const enemyBaseData = [
    {src: "./images/buildings/enemyMainBuilding.png", width: 90, height: 90, x: 1740, y: 1560, tag: "enemyMainBuilding", cost: 3000, limit: 1, hp: 200},
    {src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 1740, y: 1528, tag: "enemySolarPanel", cost: 800, limit: 10, hp: 50},
    {src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 1772, y: 1528, tag: "enemySolarPanel", cost: 800, limit: 10, hp: 50},
    {src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 1804, y: 1528, tag: "enemySolarPanel", cost: 800, limit: 10, hp: 50},
    {src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 1708, y: 1528, tag: "enemySolarPanel", cost: 800, limit: 10, hp: 50},
    {src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 1708, y: 1560, tag: "enemySolarPanel", cost: 800, limit: 10, hp: 50},
    {src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 1708, y: 1592, tag: "enemySolarPanel", cost: 800, limit: 10, hp: 50},
    {src: "./images/buildings/solarPanel.png", width: 32, height: 32, x: 1708, y: 1624, tag: "enemySolarPanel", cost: 800, limit: 10, hp: 50},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1708, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1728, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1748, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1768, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1788, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1808, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1828, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1848, y: 1658, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1848, y: 1638, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1848, y: 1618, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1848, y: 1598, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1848, y: 1578, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1848, y: 1558, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/wall.png", width: 20, height: 20, x: 1848, y: 1538, tag: "enemyWall", cost: 500, limit: 30, hp: 30},
    {src: "./images/buildings/enemyVehicleFactory.png", width: 90, height: 60, x: 1708, y: 1678, tag: "enemyVehicleFactory", cost: 1200, limit: 1, hp: 100},
    {src: "./images/buildings/enemySoldierBarracks.png", width: 60, height: 60, x: 1648, y: 1468, tag: "enemySoldierBarracks", cost: 1000, limit: 1, hp: 100},
    {src: "./images/buildings/enemyHarvestingBuilding.png", width: 105, height: 60, x: 1500, y: 1560, tag: "enemyHarvestingBuilding", cost: 2000, limit: 3, hp: 100},
    {src: "./images/buildings/enemyHarvestingBuilding.png", width: 105, height: 60, x: 1500, y: 1620, tag: "enemyHarvestingBuilding", cost: 2000, limit: 3, hp: 100},
    {src: "./images/buildings/enemyHarvestingBuilding.png", width: 105, height: 60, x: 1500, y: 1680, tag: "enemyHarvestingBuilding", cost: 2000, limit: 3, hp: 100}
];
// Preset army unit data inside enemy base
const enemyArmyData = [
    {src: "./images/vehicles/enemyTank01.png", x: 1740, y: 1280, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyArmoredVehicle01.png", x: 1800, y: 1280, width: 45, height: 30, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/vehicles/enemyTank01.png", x: 1800, y: 1340, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyArmoredVehicle01.png", x: 1740, y: 1340, width: 45, height: 30, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    //
    {src: "./images/vehicles/enemyTank01.png", x: 1880, y: 1580, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyTank01.png", x: 1880, y: 1640, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyTank01.png", x: 1940, y: 1580, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyTank01.png", x: 1940, y: 1640, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    //
    {src: "./images/vehicles/enemyTank01.png", x: 1640, y: 1100, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyTank01.png", x: 1600, y: 1180, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyTank01.png", x: 1500, y: 1220, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    {src: "./images/vehicles/enemyTank01.png", x: 1460, y: 1300, width: 50, height: 41, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank"},
    //
    {src: "./images/vehicles/enemyArmoredVehicle01.png", x: 1600, y: 1260, width: 45, height: 30, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/vehicles/enemyArmoredVehicle01.png", x: 1560, y: 1320, width: 45, height: 30, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/vehicles/enemyArmoredVehicle01.png", x: 1500, y: 1400, width: 45, height: 30, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/vehicles/enemyArmoredVehicle01.png", x: 1600, y: 1900, width: 45, height: 30, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    //
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1560, y: 1860, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1500, y: 1800, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1480, y: 1840, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1400, y: 1820, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    //
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1560, y: 1920, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1500, y: 1980, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1480, y: 1900, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRocket.png", x: 1400, y: 1870, width: 31, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    //
    {src: "./images/soldiers/enemySoldierRiffle.png", x: 1660, y: 1720, width: 26, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRiffle.png", x: 1630, y: 1670, width: 26, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRiffle.png", x: 1670, y: 1640, width: 26, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"},
    {src: "./images/soldiers/enemySoldierRiffle.png", x: 1640, y: 1600, width: 26, height: 23, speed: 2, hp: 70, limit: 15, damage: 6, tag: "enemyArmoredVehicle"}
];

// Enemy Vehicle / Soldier variables
const enemyStoredVehiclesSoldiers = [];
const enemyStoredBuildings = [];
// Enemy vehicle soldier class
class EnemyVehiclesSoldiers {
    constructor(src, x, y, width, height, speed, hp, limit, damage, tag){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.hp = hp;
        this.storeHp = hp;
        this.limit = limit;
        this.damage = damage;
        this.tag = tag;
        this.animateAnimationFrame = null;
        this.storeAnimationFrame = null;
        this.checkForEnemiesInterval = null
        this.rotateAngle = 0;
        this.currentTarget = null;
        this.shootAfterNum = 0;
        this.shootImage = new Image();
        this.shootImage.src = "./images/vehicles/shoot.png";
        // Explosion
        this.explosionImage = new Image();
        this.explosionImage.src = "./images/animation/explosionSheet.png";
        this.explosionNum = 0;
        this.changeAnimationImg = -1;
        this.explosionAnimationFrame = null;
    };
    Update(){
        // Draw unit
        ctx.save();
        ctx.translate(this.x - cameraX + this.width / 2, this.y - cameraY + this.height / 2);
        ctx.rotate(this.rotateAngle);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
        // Draw hp bar
        this.DisplayHpBar();
    };
    Movement(x, y){
        let dx = x - this.x;
        let dy = y - this.y;
        let angleInRadians = Math.atan2(dy, dx);
        this.rotateAngle = angleInRadians;
        let distance = Math.sqrt(dx * dx + dy * dy);
        const MoveTowardsTarget = () => {
            if (distance > this.speed) {
              let ratio = this.speed / distance;
              let moveX = dx * ratio;
              let moveY = dy * ratio;
              this.x += moveX;
              this.y += moveY;
              dx = x - this.x;
              dy = y - this.y;
              distance = Math.sqrt(dx * dx + dy * dy);
              this.storeAnimationFrame = requestAnimationFrame(MoveTowardsTarget);
            }
            else{
                this.x = x;
                this.y = y;
            }
        };
        cancelAnimationFrame(this.storeAnimationFrame);
        MoveTowardsTarget();
    };
    DisplayHpBar(){
        if(this.hp < this.storeHp){
            let hpLeft = (this.hp * 100) / this.storeHp;
            let hpToDisplay = (30 * hpLeft) / 100;
            if(hpLeft > 66){
                ctx.fillStyle = "green";
            }
            else if(hpLeft > 33){
                ctx.fillStyle = "yellow";
            }
            else{
                ctx.fillStyle = "red";
            }
            ctx.fillRect(this.x - cameraX + (this.width / 2) - 15, (this.y - cameraY + this.height / 2) - 5, hpToDisplay, 5);
        }
    };
    CheckForEnemies(){
        this.checkForEnemiesInterval = setInterval(() => {
            if(!this.currentTarget){
                this.currentTarget = this.CheckEnemyInRange();
            }
            else if(this.currentTarget){
                this.Shoot(this.currentTarget);
            }
        }, 1000);
    };
    StopEnemyCheck() {
        clearInterval(this.checkForEnemiesInterval);
    };
    CheckEnemyInRange(){
        for (const enemyVehicleSoldier of storedVehiclesSoldiers) {
            const dx = enemyVehicleSoldier.x - this.x;
            const dy = enemyVehicleSoldier.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance <= shootingRange){
                let angleInRadians = Math.atan2(dy, dx);
                this.rotateAngle = angleInRadians;
                return enemyVehicleSoldier;
            }
        }
        for (const building of buildingLayer) {
            const dx = building.x - this.x;
            const dy = building.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance <= shootingRange){
                let angleInRadians = Math.atan2(dy, dx);
                this.rotateAngle = angleInRadians;
                return building;
            }
        }
        return null;
    };
    Shoot(enemyTarget){
        this.ShootAnimation();
        const dx = enemyTarget.x - this.x;
        const dy = enemyTarget.y - this.y;
        let angleInRadians = Math.atan2(dy, dx);
        this.rotateAngle = angleInRadians;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if(distance > shootingRange){
            this.currentTarget = null;
            return;
        }
        enemyTarget.hp -= this.damage;
        if(enemyTarget.hp <= 0){
            for (let i = 0; i < storedVehiclesSoldiers.length; i++) {
                if(enemyTarget.x === storedVehiclesSoldiers[i].x && enemyTarget.y === storedVehiclesSoldiers[i].y){
                    storedVehiclesSoldiers[i].Explosion();
                    if(storedVehiclesSoldiers[i].tag === "harvestingVehicle"){
                        storedVehiclesSoldiers[i].move = false;
                        storedVehiclesSoldiers[i].emptyHarvest = false;
                        storedVehiclesSoldiers[i].harvesting = false;
                    }
                    else{
                        storedVehiclesSoldiers[i].StopEnemyCheck();
                    }
                    storedVehiclesSoldiers.splice(i, 1);
                }
            }
            for (let i = 0; i < buildingLayer.length; i++) {
                if(enemyTarget.x === buildingLayer[i].x && enemyTarget.y === buildingLayer[i].y){
                    switch (buildingLayer[i].tag) {
                        case "mainBuilding":
                            player.energyDemand -= 20
                            break;
                        case "harvestingBuilding":
                            for (const unit in storedVehiclesSoldiers) {
                                if(storedVehiclesSoldiers[unit].baseX === buildingLayer[i].x + 60 && storedVehiclesSoldiers[unit].baseY === buildingLayer[i].y){
                                    storedVehiclesSoldiers[unit].emptyHarvest = false;
                                    storedVehiclesSoldiers[unit].harvesting = false;
                                    storedVehiclesSoldiers[unit].toggleHarvesting = true;
                                    storedVehiclesSoldiers[unit].baseX = null;
                                    storedVehiclesSoldiers[unit].baseY = null;
                                }
                            }
                            player.energyDemand -= 15
                            break;
                        case "vehicleFactory":
                            player.energyDemand -= 10
                            break;
                        case "soldierBarracks":
                            player.energyDemand -= 10
                            break;
                    }
                    buildingLayer[i].Explosion();
                    buildingLayer.splice(i, 1);
                }
            }
            this.currentTarget = null;
        }
    };
    ShootAnimation(){
        if(this.shootAfterNum > 20){
            cancelAnimationFrame(this.animateAnimationFrame);
            this.shootAfterNum = 0;
        }
        else{
            this.shootAfterNum++;
            ctx.save();
            ctx.translate(this.x - cameraX + this.width / 2, this.y - cameraY + this.height / 2);
            ctx.rotate(this.rotateAngle);
            ctx.drawImage(this.shootImage, this.width / 2, -5, 10, 10);
            ctx.restore();
            this.animateAnimationFrame = requestAnimationFrame(this.ShootAnimation.bind(this));
        }
    };
    Explosion(){
        if(this.explosionNum < 60){
            if(this.explosionNum % 10 === 0){
                this.changeAnimationImg++;
            }
            ctx.drawImage(this.explosionImage, this.changeAnimationImg * 240, 0, 240, 240, this.x - cameraX, this.y - cameraY, 60, 60);
            this.explosionNum++;
            this.explosionAnimationFrame = requestAnimationFrame(this.Explosion.bind(this));
        }
        else{
            cancelAnimationFrame(this.explosionAnimationFrame);
        }
    };
};// Harvester class
class EnemyHarvester {
    constructor(src, x, y, width, height, speed, hp, limit, tag, baseX, baseY, moveToX, moveToY){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.hp = hp;
        this.storeHp = hp;
        this.limit = limit;
        this.tag = tag;
        this.storeAnimationFrame = null;
        this.rotateAngle = 0;
        // Movement
        this.move = false;
        this.moveToX = moveToX;
        this.moveToY = moveToY;
        // Explosion variables
        this.explosionImage = new Image();
        this.explosionImage.src = "./images/animation/explosionSheet.png";
        this.explosionNum = 0;
        this.changeAnimationImg = -1;
        this.explosionAnimationFrame = null;
        // Variables for harvesting
        this.baseX = baseX;
        this.baseY = baseY;
        this.currentGoalX = this.moveToX;
        this.currentGoalY = this.moveToY;
        this.toggleMove = false;
    };
    Update(){
        // Draw harvester
        this.Draw();
        // Draw hp bar
        this.DisplayHpBar();
        // Movement
        this.Movement();
    };
    Movement(){
        if(this.move){
            let dx = this.currentGoalX - this.x; // Calculate distance x between current position x and target x
            let dy = this.currentGoalY - this.y; // Calculate distance y between current position y and target y
            let angleInRadians = Math.atan2(dy, dx);
            this.rotateAngle = angleInRadians;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > this.speed) {
                let ratio = this.speed / distance;
                let moveX = dx * ratio;
                let moveY = dy * ratio;
                this.x += moveX;
                this.y += moveY;
                dx = this.currentGoalX - this.x;
                dy = this.currentGoalY - this.y;
                distance = Math.sqrt(dx * dx + dy * dy);
            }
            else if(!this.toggleMove){
                this.currentGoalX = this.baseX;
                this.currentGoalY = this.baseY;
                this.toggleMove = true;
            }
            else{
                this.currentGoalX = this.moveToX;
                this.currentGoalY = this.moveToY;
                this.toggleMove = false;
            }
        }
    };
    // Hp bar show calculates % of how hp left and displays it
    DisplayHpBar(){
        if(this.hp < this.storeHp){
            let hpLeft = (this.hp * 100) / this.storeHp;
            let hpToDisplay = (30 * hpLeft) / 100;
            if(hpLeft > 66){
                ctx.fillStyle = "green";
            }
            else if(hpLeft > 33){
                ctx.fillStyle = "yellow";
            }
            else{
                ctx.fillStyle = "red";
            }
            ctx.fillRect(this.x - cameraX + (this.width / 2) - 15, (this.y - cameraY + this.height / 2) - 5, hpToDisplay, 5);
        }
    };
    // When destroyed runs explopsion animation
    Explosion(){
        if(this.explosionNum < 60){
            if(this.explosionNum % 10 === 0){
                this.changeAnimationImg++;
            }
            ctx.drawImage(this.explosionImage, this.changeAnimationImg * 240, 0, 240, 240, this.x - cameraX, this.y - cameraY, this.width, this.width);
            this.explosionNum++;
            this.explosionAnimationFrame = requestAnimationFrame(this.Explosion.bind(this));
        }
        else{
            cancelAnimationFrame(this.explosionAnimationFrame);
        }
    };
    // Draw havester
    Draw(){
        ctx.save();
        ctx.translate(this.x - cameraX + this.width / 2, this.y - cameraY + this.height / 2);
        ctx.rotate(this.rotateAngle);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
};
// Load enemy base
function LoadEnemyBase(){
    for (const building in enemyBaseData) {
        const storeBuilding = new BuildingObjects(enemyBaseData[building].src, enemyBaseData[building].width, enemyBaseData[building].height, enemyBaseData[building].x, enemyBaseData[building].y, enemyBaseData[building].tag, enemyBaseData[building].cost, enemyBaseData[building].limit, enemyBaseData[building].hp);
        enemyStoredBuildings.push(storeBuilding);
    }
    LoadEnemyArmy();
};
// Load enemy vehicles / soldiers
function LoadEnemyArmy(){
    for (const enemyArmy in enemyArmyData) {
        const vehicleOrSoldier = new EnemyVehiclesSoldiers(enemyArmyData[enemyArmy].src, enemyArmyData[enemyArmy].x, enemyArmyData[enemyArmy].y, enemyArmyData[enemyArmy].width, enemyArmyData[enemyArmy].height, enemyArmyData[enemyArmy].speed, enemyArmyData[enemyArmy].hp, enemyArmyData[enemyArmy].limit, enemyArmyData[enemyArmy].damage, enemyArmyData[enemyArmy].tag);
        vehicleOrSoldier.CheckForEnemies();
        enemyStoredVehiclesSoldiers.push(vehicleOrSoldier);
    }
    // Instantiate set number of harvesters
    while(enemyHarvesterLimit > 0){
        const harvester = new EnemyHarvester(enemyHarvesterUnit.src, enemyHarvesterUnit.x, enemyHarvesterUnit.y + enemyHarvestRouteBase, enemyHarvesterUnit.width, enemyHarvesterUnit.height, enemyHarvesterUnit.speed, enemyHarvesterUnit.hp, enemyHarvesterUnit.limit, enemyHarvesterUnit.tag, 1500 + 60, 1560 + enemyHarvestRouteBase, 1900 - enemyHarvestRoutePuddle, 800);
        harvester.move = true;
        // Offset it's coordintes
        enemyHarvestRouteBase += 60;
        enemyHarvestRoutePuddle += 30;
        // Push to array
        enemyStoredVehiclesSoldiers.push(harvester);
        enemyHarvesterLimit--;
    }
};
// Enemy attacks player to preset coordinates
// When all player buildings destroyed it start to go to coordintes if there is any player army units left
function AttackPlayer(){
    // Check if game still ongoing
    if(!youWin && !youLose){
        enemyVaweAttack = setInterval(() => {
                // Randomly choose coordinates from preset coordinates array
                let randomCoordinates = Math.floor(Math.random() * ((coordinatesToMoveTo.length + 0) - 0) + 0);
                // Randomly choose army unit 
                let randomArmyUnit = Math.floor(Math.random() * ((enemyArmyUnits.length + 0) - 0) + 0);
                // Check selected army unit by its tag
                switch (enemyArmyUnits[randomArmyUnit].tag) {
                    // Assign random amount of units
                    case "enemyTank":
                        randomUnitNumber = Math.floor(Math.random() * ((3 + 1) - 0) + 0);
                        break;
                    case "enemyArmoredVehicle":
                        randomUnitNumber = Math.floor(Math.random() * ((4 + 1) - 0) + 0);
                        break;
                    case "enemySoldierRiffle":
                        randomUnitNumber = Math.floor(Math.random() * ((8 + 3) - 0) + 0);
                        break;
                    case "enemysSoldierRocket":
                        randomUnitNumber = Math.floor(Math.random() * ((6 + 3) - 0) + 0);
                        break;
                }
                // Loop as many times as random unit number is set
                for (let i = 0; i < randomUnitNumber; i++) {
                    // Store new vehicle/soldier object
                    const vehicleOrSoldier = new EnemyVehiclesSoldiers(enemyArmyUnits[randomArmyUnit].src, enemyArmyUnits[randomArmyUnit].x, enemyArmyUnits[randomArmyUnit].y + Math.floor(Math.random() * ((120 + 1) - 0) + 0), enemyArmyUnits[randomArmyUnit].width, enemyArmyUnits[randomArmyUnit].height, enemyArmyUnits[randomArmyUnit].speed, enemyArmyUnits[randomArmyUnit].hp, enemyArmyUnits[randomArmyUnit].limit, enemyArmyUnits[randomArmyUnit].damage, enemyArmyUnits[randomArmyUnit].tag);
                    // Call stored object function "CheckForenemies()" to start checking if there is any enmies in range
                    vehicleOrSoldier.CheckForEnemies();
                    // If building layer array is not empty move to preset coordinates
                    if(buildingLayer.length > 0){
                        // Coordinates are preset but there is random number added to randomise units position on map
                        vehicleOrSoldier.Movement(coordinatesToMoveTo[randomCoordinates].x + Math.floor(Math.random() * ((120 + 0) - 0) + 0), coordinatesToMoveTo[randomCoordinates].y + Math.floor(Math.random() * ((120 + 1) - 0) + 0));
                    }
                    // If there is no more buildings check if there is any army units left
                    else if(storedVehiclesSoldiers.length > 0){
                        // Loop through player stored vehicles/soldiers to find out there coordinates
                        for (const storedVehicleSoldier in storedVehiclesSoldiers) {
                            // Move to vehicle/soldier coordinates
                            vehicleOrSoldier.Movement(storedVehiclesSoldiers[storedVehicleSoldier].x, storedVehiclesSoldiers[storedVehicleSoldier].y);
                        }
                    }
                    // If there is no buildings left or army units return
                    else{
                        return;
                    }
                    // Push new enemy army unit to enemy stored vehicles/soldiers array
                    enemyStoredVehiclesSoldiers.push(vehicleOrSoldier);
                }
        // Set interval time between calls
        }, 50000);
    }
};

