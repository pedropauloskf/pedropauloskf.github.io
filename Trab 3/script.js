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

    const reducer = (accumulator, currentValue) => {
        console.log(accumulator, dist(ponto, currentValue) - currentValue.r)
        return Math.min(accumulator, dist(ponto, currentValue) - currentValue.r)
    };

    return circulos.reduce(reducer, XMAX)
}

function drawCircle() {
    function createCircle(ponto, cor) {
        var circle = document.createElement('div');
            circle.className = 'circle';
            circle.style.width = circle.style.height = ponto.r.toString() + 'px';
            circle.style.backgroundColor = "#" + cor;
            circle.style.bottom = ponto.y.toString() + 'px';
            circle.style.left = ponto.x.toString() + 'px';
        return circle
    }

    const p = randPoint();
    p.r = randRadius(p.x, p.y, minDist(p))

    if (p.r) {
        var circle = createCircle(p, randColor());
        console.log(circle);
        circulos.push(p)
        document.getElementById('content').appendChild(circle);
    }
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