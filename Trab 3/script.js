function randColor() {
    return Math.floor(Math.random()*16777215).toString(16);
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

var circulos = [];
const XMAX = 1280;
const YMAX = 720;
var ONLINE = null;

function randPoint() {
    const x = Math.floor(Math.random() * XMAX);
    const y = Math.floor(Math.random() * YMAX);
    return {x, y}
}

function randRadius(x, y, dist) {
    const maxRad = Math.min(x, y, XMAX-x, YMAX-y, dist);
    return maxRad >= 2? randomIntFromInterval(2, maxRad) : null;
}

function minDist(ponto) {
    function dist(p1, p2){
        xSide = Math.pow(p1.x - p2.x, 2);
        ySide = Math.pow(p1.y - p2.y, 2);
        return Math.floor(Math.sqrt(xSide + ySide))
    }

    const reducer = (acc, curr) => Math.min(acc, dist(ponto, curr) - curr.r);

    return circulos.reduce(reducer, 9999)
}

function drawCircle() {
    function createCircle(ponto, cor) {

        var circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.width = circle.style.height = (ponto.r * 2).toString() + 'px';
            circle.style.backgroundColor = "#" + cor;
            circle.style.bottom = (ponto.y - ponto.r).toString() + 'px';
            circle.style.left = (ponto.x  - ponto.r).toString() + 'px';
        return circle
    }

    var p = {x: null, y: null, r: null};
    
    while (!p.r) {
        var temp = randPoint();
        var r = randRadius(temp.x, temp.y, minDist(temp));

        p = {...temp, r}
    }
    
    var circle = createCircle(p, randColor());
    console.log(p);
    console.log(circle);
    circulos.push(p)
    document.getElementById('content').appendChild(circle);
    
}

function toggle() {
    text = ONLINE ? 'Começar': 'Parar';
    document.getElementById('toggle').innerHTML = text
    
    if (ONLINE) {
        clearInterval(ONLINE);
        ONLINE = null;
    }
    else ONLINE = setInterval(drawCircle, 50);
}

function clearTable() {
    console.log(document.getElementById('content'))
    document.getElementById('content').innerHTML='';
    circulos = [];
}