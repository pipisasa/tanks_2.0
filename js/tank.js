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
    this.element = $(`<div class="tank" id="${type}"></div>`);
    this.element.css({
        'width':`${bs}px`,
        'height':`${bs}px`,
    });
    
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