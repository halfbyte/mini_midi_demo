var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var circle = {
  x: 300,
  y: 300,
  s: 300,
  r: 255,
  g: 255,
  b: 255,
  o: 1,
  j: 0
};

function renderScene() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";

  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = "rgba(" + circle.r + "," + circle.g + "," + circle.b + "," + circle.o + ")";
  ctx.beginPath();

  var jx = (1 - (2 * Math.random())) * circle.j;
  var jy = (1 - (2 * Math.random())) * circle.j;

  ctx.arc(circle.x + jx, circle.y + jy, circle.s, 0, 2 * Math.PI);



  //ctx.arc(circle.x, circle.y, circle.s, 0, 2 * Math.PI);
  ctx.fill();
  var numCorona = Math.round(Math.random() * 10);
  for(var i=0;i<numCorona;i++) {
    size = Math.random() * circle.s;
    angle = Math.random() * 2 * Math.PI;
    x = circle.x + (circle.s + size) * Math.sin(angle);
    y = circle.y + (circle.s + size) * Math.cos(angle);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
  }
  requestAnimationFrame(renderScene);
}


function getMessage (msg) {
    var data = msg.data;
    var cmd = data[0] >> 4;
    var chn = data[0] & 0b1111;
    var ctrl = data[1];
    var val = data[2];

    if (cmd === 11) {
      if (ctrl === 1) {
        circle.r = val * 2;
      }
      if (ctrl === 2) {
        circle.g = val * 2;
      }
      if (ctrl === 3) {
        circle.b = val * 2;
      }
      if (ctrl === 4) {
        circle.o = val / 127.0;
      }

      if (ctrl == 14) {
        circle.s = val / 127.0 * 300;
      }
      if (ctrl == 6) {
        circle.x = val / 127.0 * 1000;
      }
      if (ctrl == 7) {
        circle.y = val / 127.0 * 800;
      }
      if (ctrl == 8) {
        circle.j = val / 127.0 * 100;
      }

    }

    //console.log("message", cmd, chn,  ctrl, val, data);
}

navigator.requestMIDIAccess().then(
  function(midiAccess) {
    console.log(midiAccess.inputs, midiAccess.outputs)
    midiAccess.inputs.forEach(function(input, id) {
      console.log(input.name, getMessage);
      input.addEventListener('midimessage', getMessage);
      input.open();
      console.log(input.connection);
    });

    renderScene();
  },
  function(error) {
    console.log("MIDI init went wrong", error);
  }
);
