var el = document.getElementById("main")
var ctx = el.getContext("2d");
var Conf = function() {
  this.friction = 0.99
  this.width = 1;
  this.compose = false;
  this.explode = function() {  };
  // Define render logic ...
};

var conf = new Conf();
var gui = new dat.GUI();
gui.add(conf, 'friction', 0.8, 0.999);
gui.add(conf, 'width', 0.1, 20.0);
gui.add(conf, 'compose');
gui.add(conf, 'explode');

var w = el.offsetWidth;
var h = el.offsetHeight;

var items = []

noise.seed(Math.random());

for(var i = 0; i < 500; i++){
  items.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: 0,
    vy: 0,
  })
}

var rows = []
rows = []
for(var y = 0; y < 40; y++){
  var row = []
  for(var x = 0; x < 40; x++){
    var r = noise.simplex2(x / 60, y / 60) * 3.1415 * 2
    var v = noise.perlin2(x / 10, y / 10) * 0.5
    row.push([Math.cos(r) * v, Math.sin(r) * v])
  }
  rows.push(row)
}

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}

function draw(){
  //ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
  if(conf.compose){
    ctx.globalCompositeOperation = "lighter";
  }

  for(var i = 0; i < items.length; i++){
    var item = items[i]
    item.x = (item.x + item.vx).mod(w)
    item.y = (item.y + item.vy).mod(h)

    var ix = Math.floor(item.x / 10)
    var iy = Math.floor(item.y / 10)
    item.vx += rows[iy][ix][0]
    item.vx *= conf.friction
    item.vy += rows[iy][ix][1]
    item.vy *= conf.friction

    var r = Math.floor(item.vx * 150)
    var g = Math.floor(item.vx * 80)
    var b = Math.floor(item.vx * 50)
    ctx.strokeStyle = `rgb(${r},${g},${b})`
    ctx.lineWidth = conf.width;

    ctx.beginPath();
    ctx.moveTo(item.x, item.y);
    ctx.lineTo(item.x + item.vx, item.y + item.vy);
    ctx.stroke();

    if(Math.random() < 0.01){
      item.x = Math.random() * w;
      item.y = Math.random() * h;
    }
  }
  ctx.globalCompositeOperation = "source-over";
  
}

setInterval(()=>{
  draw()
}, 10)


