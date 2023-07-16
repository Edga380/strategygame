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
        this.storeHp = hp;
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
    Update(){
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
            endGameStatictics.playerVehiclesDestroyed++;
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
        this.storeHp = hp;
        this.limit = limit;
        this.tag = tag;
        this.storeAnimationFrame = null;
        this.rotateAngle = 0;
        // Movement
        this.move = false;
        this.moveToX = null;
        this.MoveToY = null;
        // Explosion variables
        this.explosionImage = new Image();
        this.explosionImage.src = "./images/animation/explosionSheet.png";
        this.explosionNum = 0;
        this.changeAnimationImg = -1;
        this.explosionAnimationFrame = null;
        // Variables for harvesting
        this.baseX = baseX;
        this.baseY = baseY;
        this.emptyHarvest = false;
        this.harvesting = false;
        this.toggleHarvesting = false;
        this.harvest = 0;
        // If selected change variable
        this.isSelected = false;
    };
    Update(){
        // Draw green circle around if selected
        this.Selected();
        // Draw harvester
        this.Draw();
        // Draw hp bar
        this.DisplayHpBar();
        // Display harvesting progress
        this.DisplayHarvestProgress();
        // Movement
        this.Movement();
        // Harvest
        this.Harvest();
        // Empty harvest
        this.EmptyHarvest();
    };
    Movement(){
        if(this.move){
            let dx = this.moveToX - this.x; // Calculate distance x between current position x and target x
            let dy = this.moveToY - this.y; // Calculate distance y between current position y and target y
            let angleInRadians = Math.atan2(dy, dx);
            this.rotateAngle = angleInRadians;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > this.speed) {
                let ratio = this.speed / distance;
                let moveX = dx * ratio;
                let moveY = dy * ratio;
                this.x += moveX;
                this.y += moveY;
                dx = this.moveToY - this.x;
                dy = this.moveToY - this.y;
                distance = Math.sqrt(dx * dx + dy * dy);
            }
            else{
                this.x = this.moveToX;
                this.y = this.moveToY;
                this.move = false;
                if(!this.emptyHarvest && this.toggleHarvesting && this.baseX !== null ){
                    this.emptyHarvest = true;
                }
                else if(!this.harvesting && !this.toggleHarvesting && this.baseX !== null){
                    this.harvesting = true;
                }
            }
        }
    };
    Harvest(){
        if(this.harvesting){
            if(this.harvest < 2000){
                this.harvest++;
            }
            else{
                if(this.baseX !== null){
                    this.moveToX = this.baseX;
                    this.moveToY = this.baseY;
                    this.move = true;
                }
                this.harvesting = false;
                this.toggleHarvesting = true;
            }
        }
    };
    EmptyHarvest(){
        if(this.emptyHarvest){
            if(this.harvest > 0){
                this.harvest--;
                player.cash += 1;
            }
            else{              
                this.moveToX = 300 + Math.random() * 100;
                this.moveToY = 1200 + Math.random() * 100;
                this.move = true;
                this.emptyHarvest = false;
                this.toggleHarvesting = false;
            }
        }
    };
    // Displays how muxh harvest left inside harvester
    DisplayHarvestProgress(){
        let harvestLeft = (this.harvest * 100) / 2000;
        let harvestToDisplay = (30 * harvestLeft) / 100;
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - cameraX + (this.width / 2) - 15, (this.y - cameraY) - 5, harvestToDisplay, 5);
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
            endGameStatictics.playerVehiclesDestroyed++;
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
    // Draw circle around havester if selected
    Selected(){
        if(this.isSelected){
            ctx.beginPath();
            ctx.arc(this.x + this.width / 2 - cameraX, this.y + this.height / 2 - cameraY, this.width / 2, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(0, 225, 46, 0.6)";
            ctx.lineWidth = 3;
            ctx.stroke();
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
                selectedVehiclesSoldiers[i].emptyHarvest = false;
                selectedVehiclesSoldiers[i].harvesting = false;
                selectedVehiclesSoldiers[i].toggleHarvesting = true;
                selectedVehiclesSoldiers[i].baseX = null;
                selectedVehiclesSoldiers[i].baseY = null;
                selectedVehiclesSoldiers[i].moveToX = moveUnitTo[0].x = x + mouseCurrentPosX + cameraX;
                selectedVehiclesSoldiers[i].moveToY = moveUnitTo[0].y = y + mouseCurrentPosY + cameraY;
                selectedVehiclesSoldiers[i].move = true;
                informationText.push({string: "Bring harvester to harvesting station to start harvesting again", color: "red"});
            }
            else{
                selectedVehiclesSoldiers[i].Movement(moveUnitTo[0].x = x + mouseCurrentPosX + cameraX, moveUnitTo[0].y = y + mouseCurrentPosY + cameraY);
            }
        }
    }
};