// Enemy variables
const enemy = {cash: 9000};
let enemyVaweAttack = null;
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
const enemyArmyData = [
    {src: "./images/vehicles/enemyTank01.png", x: 1740, y: 1280, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1800, y: 1280, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1800, y: 1340, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1740, y: 1340, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    //
    {src: "./images/vehicles/enemyTank01.png", x: 1880, y: 1580, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1880, y: 1640, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1940, y: 1580, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1940, y: 1640, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    //
    {src: "./images/vehicles/enemyTank01.png", x: 1640, y: 1100, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1600, y: 1180, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1500, y: 1220, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000},
    {src: "./images/vehicles/enemyTank01.png", x: 1460, y: 1300, width: 60, height: 49, speed: 1, hp: 100, limit: 3, damage: 12, tag: "enemyTank", cost: 2000}
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
    };
    Draw (){
        ctx.save();
        ctx.translate(this.x - cameraX + this.width / 2, this.y - cameraY + this.height / 2);
        ctx.rotate(this.rotateAngle);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
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
                    storedVehiclesSoldiers[i].StopEnemyCheck();
                    storedVehiclesSoldiers.splice(i, 1);
                }
            }
            for (let i = 0; i < buildingLayer.length; i++) {
                if(enemyTarget.x === buildingLayer[i].x && enemyTarget.y === buildingLayer[i].y){
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
};
// Load enemy base
function LoadEnemyBase(){
    for (const building in enemyBaseData) {
        const storeBuilding = new BuildingObjects(enemyBaseData[building].src, enemyBaseData[building].width, enemyBaseData[building].height, enemyBaseData[building].x, enemyBaseData[building].y, enemyBaseData[building].tag, enemyBaseData[building].cost, enemyBaseData[building].limit, enemyBaseData[building].hp);
        enemyStoredBuildings.push(storeBuilding);
    }
    LoadEnemyArmy();
    AttackPlayer();
};
// Load enemy vehicles / soldiers
function LoadEnemyArmy(){
    for (const enemyArmy in enemyArmyData) {
        const vehicleOrSoldier = new EnemyVehiclesSoldiers(enemyArmyData[enemyArmy].src, enemyArmyData[enemyArmy].x, enemyArmyData[enemyArmy].y, enemyArmyData[enemyArmy].width, enemyArmyData[enemyArmy].height, enemyArmyData[enemyArmy].speed, enemyArmyData[enemyArmy].hp, enemyArmyData[enemyArmy].limit, enemyArmyData[enemyArmy].damage, enemyArmyData[enemyArmy].tag);
        vehicleOrSoldier.CheckForEnemies();
        enemyStoredVehiclesSoldiers.push(vehicleOrSoldier);
    }
};
function AttackPlayer(){
    enemyVaweAttack = setInterval(() => {
            const vehicleOrSoldier = new EnemyVehiclesSoldiers("./images/vehicles/enemyTank01.png", 2100, 1800, 60, 49, 1, 100, 10, 12, "enemyTank");
            vehicleOrSoldier.CheckForEnemies();
            vehicleOrSoldier.Movement(300, 150);
            enemyStoredVehiclesSoldiers.push(vehicleOrSoldier);
    }, 50000);
};
