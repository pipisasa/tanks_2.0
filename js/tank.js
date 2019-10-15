let tanks = {};

let Tank = function(x, y, type){
    this.x = x;
    this.y = y;
    this.position = [x,y];
    this.type = type;
    tanks[type] = this;
    this.dir='down';
    this.setDirBool = true;
    this.speed = 150;
    this.speedBool = true;
    this.armory=100;
    this.fuel = 100;
    this.hp = 20;
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
                <div class="hpBoard" id="${type}Hp">HP:${this.hp}</div>
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
            if(gz.map[this.y-1].arr[this.x].type!='wall' && $(`#x${this.x}y${this.y-1}`).children().length==0 && this.fuel>0){
                this.y--;
                this.draw();
                this.fuel--;
                $(`#${this.type}Fuel`).text(`Fuel:${this.fuel}`)
            }
        },
        down: ()=>{
            if(gz.map[this.y+1].arr[this.x].type!='wall' && $(`#x${this.x}y${this.y+1}`).children().length==0 && this.fuel>0){
                this.y++;
                this.draw();
                this.fuel--;
                $(`#${this.type}Fuel`).text(`Fuel:${this.fuel}`)
            }
        },
        left: ()=>{
            if(gz.map[this.y].arr[this.x-1].type!='wall' && $(`#x${this.x-1}y${this.y}`).children().length==0 && this.fuel>0){
                this.x--;
                this.draw();
                this.fuel--;
                $(`#${this.type}Fuel`).text(`Fuel:${this.fuel}`)
            }
        },
        right: ()=>{
            if(gz.map[this.y].arr[this.x+1].type!='wall' && $(`#x${this.x+1}y${this.y}`).children().length==0 && this.fuel>0){
                this.x++;
                this.draw();
                this.fuel--;
                $(`#${this.type}Fuel`).text(`Fuel:${this.fuel}`)
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
    
        this.setDirBool=true;
    
};

Tank.prototype.hit = function(){
    this.hp--;
    $(`#${this.type}Hp`).text(`HP:${this.hp}`);
    if(this.hp<=0){
        gameOver(this.type);
    }
};


let gameOver = function(loser){
    let winner = loser=='red' ? 'blue':'red';
    let GOElem = $(`
    <div style="
    height: 22vw;
    top: 30%;
    left: 10%;
    background-color: black;
    position: absolute;
    color: white;
    font-family: arcade;
    font-size: 500%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    box-shadow: 0 0 0 2px white;">
        <div style="font-size: 17vw;">GAME OVER</div>
        <div style="
        text-align: center;
        font-size: 2vw;
        width: 40vw;
        background: black;
        /* margin: 0 0 0 0%; */
        box-shadow: 0 0 0 1px white;"><div style="
        display: inline-block;
        color: ${winner};">${winner}</div>'s WIN!!!</div>
    </div>`)
    $('body').append(GOElem);
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
        $(`#${this.type}Armory`).text(`Armory:${this.armory}`);
        // console.log(dirs[this.dir]);
        this.bullets.push(new Bullet(dirs[this.dir],this.dir));
    }
};

let deleteBullet = function(bullet){
    clearInterval(bullet.id);
    setTimeout(function(){
        bullet.element.detach();
    },100)
}

let Bullet = function(position, dir){
    let dirs = {
        up:    ()=>{this.y--},
        down:  ()=>{this.y++},
        left:  ()=>{this.x--},
        right: ()=>{this.x++},
    }
    this.move = function(){
        $(`#x${this.x}y${this.y}`).append(this.element);

        if(this.dir=='up' && (this.y<=0 || gz.map[this.y-1].arr[this.x].type == 'wall') || this.dir=='down' && (this.y>=heightInBck-1 || gz.map[this.y+1].arr[this.x].type == 'wall') || this.dir=='left' && (this.x<=0 || gz.map[this.y].arr[this.x-1].type == 'wall') || this.dir=='right' && (this.x >= widthInBck-1 || gz.map[this.y].arr[this.x+1].type == 'wall')){
            // console.log(this)
            deleteBullet(this)
            return;
        }
        
        
        
        if(this.x==tanks.red.x && this.y==tanks.red.y){
            this.element.detach();
            // deleteBullet(this)
            clearInterval(this.id);
            tanks.red.hit();
            return;
        }
        
        if(this.x==tanks.blue.x && this.y==tanks.blue.y){
            this.element.detach();
            clearInterval(this.id);
            // deleteBullet(this);
            tanks.blue.hit();
            return;
        }
        dirs[this.dir]();
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
    this.speed = 100;
    this.x = position[0];
    this.y = position[1];
    this.element = $(`<div class="bullet"></div>`);
    this.element.css({
        "background":"url('./img/bullet0.1.png') 0 0 / contain no-repeat",
        width: bs/2 + "px",
        height: bs/2 + "px"
    });
    this.setDir(dir);
    // this.move();
    dirs[this.dir]();
    // $(`#x${this.x}y${this.y}`).append(this.element);
    this.id = setInterval(()=>{
        this.move();
    },this.speed)
}