let directionsRed = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};
let directionsBlue = {
    87: "up",
    83: "down",
    65: "left",
    68: "right"
}

$('body').keydown(function(event){
    let dirsRed = directionsRed[event.keyCode];
    let redBool = !(dirsRed=='up' && tanks.red.y==0 || dirsRed=='left' && tanks.red.x==0 || dirsRed=='down' && tanks.red.y==heightInBck-1 || dirsRed=='right' && tanks.red.x==widthInBck-1);
    if(dirsRed != undefined && redBool){
        if(tanks.red.dir != dirsRed){
            tanks.red.setDirBool=false;
            tanks.red.setDir(dirsRed);
        }else if(tanks.red.setDirBool && tanks.red.speedBool){
            tanks.red.moveTo[dirsRed]();
            tanks.red.speedBool = false;
            setTimeout(() => {
                tanks.red.speedBool = true;
            }, tanks.red.speed);
        }
    }
    
    // console.log(event.keyCode)
    let dirsBlue = directionsBlue[event.keyCode];
    let blueBool = !(dirsBlue=='up' && tanks.blue.y==0 || dirsBlue=='left' && tanks.blue.x==0 || dirsBlue=='down' && tanks.blue.y==heightInBck-1 || dirsBlue=='right' && tanks.blue.x==widthInBck-1);
    if(dirsBlue != undefined && blueBool){
        if(tanks.blue.dir != dirsBlue){
            tanks.blue.setDirBool=false;
            tanks.blue.setDir(dirsBlue);
        }else if(tanks.blue.setDirBool && tanks.blue.speedBool){
            tanks.blue.moveTo[dirsBlue]();
            tanks.blue.speedBool = false;
            setTimeout(() => {
                tanks.blue.speedBool = true;
            }, tanks.blue.speed);
        }
    }
});

$('body').keyup(function(event){
    if(event.keyCode == 32){
        tanks.red.fire();
    }
})