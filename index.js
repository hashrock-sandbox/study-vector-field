var el = document.getElementById("main")
var ctx = el.getContext("2d");
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
for(var y = 0; y < 40; y++){
  var row = []
  for(var x = 0; x < 40; x++){
    var r = noise.simplex2(x / 60, y / 60) * 3.1415 * 2
    var v = noise.perlin2(x / 10, y / 10) * 0.3
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

  ctx.strokeStyle = "white"

  for(var i = 0; i < items.length; i++){
    var item = items[i]
    item.x = (item.x + item.vx).mod(w)
    item.y = (item.y + item.vy).mod(h)

    var ix = Math.floor(item.x / 10)
    var iy = Math.floor(item.y / 10)
    item.vx += rows[iy][ix][0]
    item.vx *= 0.99
    item.vy += rows[iy][ix][1]
    item.vy *= 0.99

    ctx.beginPath();
    ctx.moveTo(item.x, item.y);
    ctx.lineTo(item.x + item.vx, item.y + item.vy);
    ctx.stroke();
  }

}

setInterval(()=>{
  draw()
}, 10)
