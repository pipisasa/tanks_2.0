let gamingZone = new GZ(600,600,30);
gamingZone.drawMap();

let map=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,0,0],
    [0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0],
    [0,0,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0],
    [0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,0],
    [0,0,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]
gamingZone.binaryMap(map);

let red = new Tank(4,3,'red');
let blue = new Tank(10,3,'blue');
