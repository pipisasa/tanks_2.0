let gz;
let widthInBck;
let heightInBck;
let bs;

let  GZ = function(width, height, blocksize){
    this.width = width;
    this.height = height;
    this.map = [];
    gz = this;
    bs = blocksize;
    widthInBck = width/bs;
    heightInBck = height/bs;
    this.element = $(`<div class="GZ"></div>`);
    this.element.css({

        'margin': '2% auto',
        'display': 'flex',
        'flex-wrap': 'wrap',
        'max-width': `${width}px`
    })
};

GZ.prototype.drawMap = function(){
    $('body').append(this.element);
    for(let y=0; y<heightInBck; y++){
        this.map.push(new Row(y, this.element));
        for(let x=0; x<widthInBck; x++){
            this.map[y].pushCol(new Col(x, y));
        };
    };
};

let Row = function(y, gzElem){
    this.arr = [];
    this.y = y;
    this.element = $(`<div class="row" id="y${y}"><div>`);
    this.element.css('display','flex');
    gzElem.append(this.element);
    this.pushCol = function(col){
        this.arr.push(col);
    };
};

let Col = function(x, y){
    this.position = [x, y];
    this.type = 'cell'
    this.element = $(`<div class="col cell" id="x${x}y${y}"></div>`);
    this.element.css({
        width:`${bs}px`,
        height:`${bs}px`,
        'background-color': 'black',
        'display':'flex',
        'box-shadow': '0 0 0 1px #7b7b7b',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center'
    })
    $(`#y${y}`).append(this.element);
};

GZ.prototype.binaryMap = function(arr){
    for(let a=0; a<arr.length; a++){
        for(let b=0; b<arr[a].length; b++){
            if(arr[a][b]==1){
                this.map[a].arr[b].type="wall";
                $(`#x${b}y${a}`).css({
                    'background-color':'white',
                }).addClass("wall");
            }
        }
    }
}

GZ.prototype.setFuel = function(){
    for(let i=true; i; i){
        let x = Math.floor(Math.random()*widthInBck);
        let y = Math.floor(Math.random()*heightInBck);
        if(map[y][x]==0){
            i = !i;
            $(`#x${x}y${y}`).addClass('fuel').css('background','url(./img/fuel.png) 0% 0% / contain no-repeat')
        }
    }
}

// GZ.prototype.