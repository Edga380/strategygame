// Vehicle / Soldier variables
const storedVehiclesSoldiers = [];
let selectedVehiclesSoldiers = [];
let moveUnitTo = [{x: undefined, y: undefined}];
// 
const shootingRange = 360;
// Vehicle soldier class
class VehiclesSoldiers {
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
        // Shoot
        this.shootAfterNum = 0;
        this.shootImage = new Image();
        this.shootImage.src = "./images/vehicles/shoot.png";
        // Explosion
        this.explosionImage = new Image();
        this.explosionImage.src = "./images/animation/explosionSheet.png";
        this.explosionNum = 0;
        this.changeAnimationImg = -1;
        this.explosionAnimationFrame = null;
        // If selected change variable
        this.isSelected = false;
    };
    Draw (){
        if(this.isSelected){
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2 - cameraX, this.y + this.height / 2 - cameraY, this.width / 2, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(0, 225, 46, 0.6)";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
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
                    enemyStoredVehiclesSoldiers[i].Explosion();
                    enemyStoredVehiclesSoldiers.splice(i, 1);
                }
            }
            for (let i = 0; i < enemyStoredBuildings.length; i++) {
                if(enemyTarget.x === enemyStoredBuildings[i].x && enemyTarget.y === enemyStoredBuildings[i].y){
                    enemyStoredBuildings[i].Explosion();
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
};
// Harvester class
class Harvester {
    constructor(src, x, y, width, height, speed, hp, limit, tag, baseX, baseY){
        this.image = new Image();
        this.image.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.hp = hp;
        this.limit = limit;
        this.tag = tag;
        this.storeAnimationFrame = null;
        this.rotateAngle = 0;
        // Explosion
        this.explosionImage = new Image();
        this.explosionImage.src = "./images/animation/explosionSheet.png";
        this.explosionNum = 0;
        this.changeAnimationImg = -1;
        this.explosionAnimationFrame = null;
        // Varaibles for harvesting vehicle
        this.harvestingInterval = null;
        this.harvesting = 0;
        this.emptyHarvest = 0;
        this.havestingDone = false;
        this.emptyHarvestInterval = null;
        this.baseX = baseX;
        this.baseY = baseY;
        this.harvest = 0;
        // If selected change variable
        this.isSelected = false;
    };
    Draw (){
        if(this.isSelected){
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2 - cameraX, this.y + this.height / 2 - cameraY, this.width / 2, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(0, 225, 46, 0.6)";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
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
                if(this.tag == "harvestingVehicle" && !this.havestingDone && this.baseX !== null){
                    this.Harvest();
                }
                else if(this.tag == "harvestingVehicle" && this.havestingDone && this.baseX !== null ){
                    console.log(this.emptyHarvestInterval);
                    this.EmptyHarvest();
                }
            }
        };
        cancelAnimationFrame(this.storeAnimationFrame);
        MoveTowardsTarget();
    };
    // Harvester logic
    Harvest(){
        this.harvestingInterval = setInterval(() => {
            if(this.harvest < 2000){
                this.harvest++;
            }
            else{
                clearInterval(this.harvestingInterval);
                this.havestingDone = true;
                if(this.baseX !== null){
                    this.Movement(this.baseX, this.baseY);
                }
            }
        }, 1);
    };
    StopHarvest(){
        clearInterval(this.harvestingInterval);
    };
    EmptyHarvest(){
        this.emptyHarvestInterval = setInterval(() => {
            if(this.harvest > 0){
                this.harvest--;
                player.cash += 1;
            }
            else{
                clearInterval(this.emptyHarvestInterval);
                this.havestingDone = false;
                this.Movement(300 + Math.random() * 100, 1200 + Math.random() * 100);
            }
        }, 1);
    };
    StopEmptyHarvest(){
        clearInterval(this.emptyHarvestInterval);
    };
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
};
// Move vehicles/soldiers to clicked mouse position
function MoveVehicleSoldier(){
    if(selectedVehiclesSoldiers.length > 0){
        for (let i = 0; i < selectedVehiclesSoldiers.length; i++) {
            const row = Math.floor(i / 3); // Calculate the row index
            const col = i % 3; // Calculate the column index

            const x = col * (selectedVehiclesSoldiers[i].width + 10); // Calculate the x-coordinate
            const y = row * (selectedVehiclesSoldiers[i].height + 10); // Calculate the y-coordinate
            if(selectedVehiclesSoldiers[i].tag == "harvestingVehicle"){
                    selectedVehiclesSoldiers[i].StopHarvest();
                    selectedVehiclesSoldiers[i].StopEmptyHarvest();
                    selectedVehiclesSoldiers[i].havestingDone = true;
                    selectedVehiclesSoldiers[i].baseX = null;
                    selectedVehiclesSoldiers[i].baseY = null;
                    selectedVehiclesSoldiers[i].Movement(moveUnitTo[0].x = x + mouseCurrentPosX + cameraX, moveUnitTo[0].y = y + mouseCurrentPosY + cameraY);
                    informationText.push({string: "Bring harvester to harvesting station to start harvesting again", color: "red"});
            }
            else{
                selectedVehiclesSoldiers[i].Movement(moveUnitTo[0].x = x + mouseCurrentPosX + cameraX, moveUnitTo[0].y = y + mouseCurrentPosY + cameraY);
            }
        }
    }
};