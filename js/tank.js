let tanks = {};

let Tank = function(x, y, type){
    this.x = x;
    this.y = y;
    this.position = [x,y];
    this.type = type;
    tanks[type] = this;
    this.dir='down';
    this.setDirBool = true;
    this.speed = 200;
    this.speedBool = true;
    this.armory=100;
    this.gunLvL=1;
    this.bullets = [];
    this.element = $(`<div class="tank" id="${type}"></div>`);
    this.element.css({
        'width':`${bs}px`,
        'height':`${bs}px`,
    });
    $('body').append($(`
        <div class="Scoreboard" id="${type}_scoreboard" style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: white;
        width: 15%;
        font-size: 100%;
        font-family: arcade;
        position: absolute;
        top:0">
            <div class="scoreHeader" id="${type}Logo" style="
            text-align: center;
            font-size: 200%;
            background-color: ${type};">${type}</div>
            <div class="fuelBoard" id="${type}Fuel">Fuel:${this.fuel}</div>
            <div class="armoryBoard" id="${type}Armory">Armory:${this.armory}</div>
        </div>`));
    
    if(type=='red'){
        this.element.css('background',"url('./img/Red.png') 0% 0% / contain no-repeat");
    }else if(type=='blue'){
        this.element.css('background',"url('./img/Blue.png') 0% 0% / contain no-repeat")
    }
    
    this.draw = function(){
        $(`#x${this.x}y${this.y}`).append(this.element);
    }
    this.draw();

    this.moveTo = {
        up: ()=>{
            if(gz.map[this.y-1].arr[this.x].type!='wall' && $(`#x${this.x}y${this.y-1}`).children().length==0){
                this.y--;
                this.draw();
            }
        },
        down: ()=>{
            if(gz.map[this.y+1].arr[this.x].type!='wall' && $(`#x${this.x}y${this.y+1}`).children().length==0){
                this.y++;
                this.draw();
            }
        },
        left: ()=>{
            if(gz.map[this.y].arr[this.x-1].type!='wall' && $(`#x${this.x-1}y${this.y}`).children().length==0){
                this.x--;
                this.draw();
            }
        },
        right: ()=>{
            if(gz.map[this.y].arr[this.x+1].type!='wall' && $(`#x${this.x+1}y${this.y}`).children().length==0){
                this.x++;
                this.draw();
            }
        }
    };
};

Tank.prototype.setDir = function(dir){
    let dirs = {
        up: 'rotate(180deg)',
        down: 'rotate(360deg)',
        left: 'rotate(90deg)',
        right: 'rotate(-90deg)'
    };
    this.dir=dir;
    this.element.css('transform',dirs[dir]);
    setTimeout(() => {
        this.setDirBool=true;
    }, 50);
};
//////////////////////////////////////grgrgusofiyhior ytuhvohoihiszoeij
Tank.prototype.fire = function(){
    let dirs = {
        up:    [this.x,this.y],
        down:  [this.x,this.y],
        left:  [this.x,this.y],
        right: [this.x,this.y],
    }
    if(this.armory>0){
        this.armory-=this.gunLvL;
        $(`#${this.type}Armory`).text(`Armory:${this.armory}`)
        // console.log(dirs[this.dir])
        this.bullets.push(new Bullet(dirs[this.dir],this.dir))
    }
};

let deleteBullet = function(bullet){
    clearInterval(bullet.id);
    setTimeout(function(){
        bullet.element.detach();
    },100)
    delete bullet;
}

let Bullet = function(position, dir){
    let th = this;
    this.move = function(){
        if(this.dir=='up' && (this.y==0 || gz.map[this.y-1].arr[this.x].type == 'wall') || this.dir=='down' && (this.y==heightInBck-1 || gz.map[this.y+1].arr[this.x].type == 'wall') || this.dir=='left' && (this.x==0 || gz.map[this.y].arr[this.x-1].type == 'wall') || this.dir=='right' && (this.x == widthInBck-1 || gz.map[this.y].arr[this.x+1].type == 'wall')){
            // console.log(this)
            deleteBullet(this)
            return;
        }
        let dirs = {
            up:    ()=>{this.y--},
            down:  ()=>{this.y++},
            left:  ()=>{this.x--},
            right: ()=>{this.x++},
        }
        dirs[this.dir]();
        $(`#x${this.x}y${this.y}`).append(this.element);
    }

    this.setDir = function(dir){
        let dirs = {
            'up':    'rotate(360deg)',
            'down':  'rotate(180deg)',
            'left':  'rotate(-90deg)',
            'right': 'rotate(90deg)'
        };
        this.element.css('transform',dirs[dir]);
    }
    this.dir = dir;
    this.speed = 200;
    this.x = position[0];
    this.y = position[1];
    this.element = $(`<div class="bullet"></div>`);
    this.element.css({
        "background":"url('./img/bullet0.1.png') 0 0 / contain no-repeat",
        width: bs/2 + "px",
        height: bs/2 + "px"
    });
    this.setDir(dir);
    this.move();
    this.id = setInterval(()=>{
        this.move();
    },this.speed)
}

/*Tank.prototype.fire = function(){
    if(this.bulletSpeedBool && !this.armory<=0){
        this.armory-=this.gunLvL;
        bullets.push(new Bullet);
        bullets[bullets.length-1].draw();
        console.log(this.armory)
        this.bulletSpeedBool = false;
        setBulletSpeed(this);
    }
};

class Bullet{constructor(){
    this.dir = t34.direction;
    this.col = t34.block.col;
    this.row = t34.block.row;
}};

Bullet.prototype.draw = function(){
    if(this.moveBullet()){
        console.log(1)
        return};
    ctx.fillStyle = 'black';
    ctx.fillRect(blockSize*this.col+blockSize*0.4,blockSize*this.row+blockSize*0.4,blockSize*0.2,blockSize*0.2)
}

Bullet.prototype.moveBullet = function(){
    if(this.dir=='up' && this.row>1){
        this.row--;
    }else if(this.dir=='down' && this.row<height/blockSize-2){
        this.row++;
    }else if(this.dir=='left' && this.col>1){
        this.col--;
    }else if(this.dir=='right' && this.col<width/blockSize-2){
        this.col++;
    }else{
        this.col=-1;
        this.row=-1;
        return true;
    }
    for(let i=0; i<walls.length; i++){
        if(this.col === walls[i].col && this.row === walls[i].row){
            this.col=-1;
            this.row=-1;
            walls[i].hit(t34.gunLvL);
        }
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(blockSize*this.col+blockSize*0.4,blockSize*this.row+blockSize*0.4,blockSize*0.2,blockSize*0.2);
};

Tank.prototype.bulletSpeedBool = true;
Tank.prototype.bulletSpeed = 500;

let setBulletSpeed = function(tank){
    setTimeout(function(){
        tank.bulletSpeedBool = true;
        // clearTimeout(tankObj.bulletSpeedId);
        // setBulletSpeed();
    },tank.bulletSpeed/tank.gunLvL);
};
*/