// Vehicle / Soldier variables
const storedVehiclesSoldiers = [];
let selectedVehiclesSoldiers = [];
let moveUnitTo = [{x: undefined, y: undefined}];
// 
const shootingRange = 360;
// Vehicle soldier class
class VehiclesSoldiers {
    constructor(src, x, y, width, height, speed, hp, limit, damage, tag, baseX, baseY){
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
        // Varaibles for harvesting vehicle
        this.harvestingInterval = null;
        this.harvesting = 0;
        this.emptyHarvest = 0;
        this.havestingDone = false;
        this.emptyHarvestInterval = null;
        this.baseX = baseX;
        this.baseY = baseY;
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
                // Logic for harvesting vehicle
                if(this.tag == "harvestingVehicle" && !this.havestingDone){
                    this.Harvest();
                }
                else if(this.tag == "harvestingVehicle" && this.havestingDone){
                    this.EmptyHarvest();
                }
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
        for (const enemyVehicleSoldier of enemyStoredVehiclesSoldiers) {
            const dx = enemyVehicleSoldier.x - this.x;
            const dy = enemyVehicleSoldier.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance <= shootingRange){
                let angleInRadians = Math.atan2(dy, dx);
                this.rotateAngle = angleInRadians;
                return enemyVehicleSoldier;
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
            for (let i = 0; i < enemyStoredVehiclesSoldiers.length; i++) {
                if(enemyTarget.x === enemyStoredVehiclesSoldiers[i].x && enemyTarget.y === enemyStoredVehiclesSoldiers[i].y){
                    enemyStoredVehiclesSoldiers[i].StopEnemyCheck();
                    enemyStoredVehiclesSoldiers.splice(i, 1);
                }
            }
            for (let i = 0; i < enemyStoredBuildings.length; i++) {
                if(enemyTarget.x === enemyStoredBuildings[i].x && enemyTarget.y === enemyStoredBuildings[i].y){
                    enemyStoredBuildings.splice(i, 1);
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
    // Harvester logic
    Harvest(){
        this.harvestingInterval = setInterval(() => {
            if(this.harvesting < 20){
                this.harvesting++;
                console.log("Harvesting");
            }
            else{
                clearInterval(this.harvestingInterval);
                this.havestingDone = true;
                console.log("Harvesting done");
                this.harvesting = 0;
                this.Movement(this.baseX, this.baseY);
            }
        }, 1000);
    };
    EmptyHarvest(){
        this.emptyHarvestInterval = setInterval(() => {
            if(this.emptyHarvest < 2000){
                this.emptyHarvest++;
                player.cash += 1;
                console.log("Empty Harvest");
            }
            else{
                clearInterval(this.emptyHarvestInterval);
                this.havestingDone = false;
                console.log("Empty Harvest done");
                this.emptyHarvest = 0;
                this.Movement(300 + Math.random() * 100, 1200 + Math.random() * 100);
            }
        }, 1);
    };
};
// Move vehicles/soldiers to clicked mouse position
function MoveVehicleSoldier(){
    if(selectedVehiclesSoldiers.length > 0){
        for (let i = 0; i < selectedVehiclesSoldiers.length; i++) {
            selectedVehiclesSoldiers[i].Movement(moveUnitTo[0].x, moveUnitTo[0].y + 60 * i);
        }
    }
};