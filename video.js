var isStreaming = false;
var v = document.getElementById('v');
var c = document.getElementById('c');
var con = c.getContext('2d');
var w = 480;
var h = 480;

window.addEventListener('DOMContentLoaded', function() {
  navigator.getUserMedia = (
    navigator.getUserMedia || 
    navigator.webkitGetUserMedia || 
    navigator.mozGetUserMedia || 
    navigator.msGetUserMedia);
  if (navigator.getUserMedia) {
    // Request access to video only
    navigator.getUserMedia({
      video: true,
      audio: false
    }, function(stream) {
      var url = window.URL || window.webkitURL;
      v.src = url ? url.createObjectURL(stream) : stream;
      v.play();
    }, function(error) {
      alert('Something went wrong. (error code ' + error.code + ')');
      return;
    });
  } else {
    alert('Sorry, the browser you are using doesn\'t support getUserMedia');
    return;
  }
});

v.addEventListener('canplay', function(e) {
  if (!isStreaming) {
    // videoWidth isn't always set correctly in all browsers
    if (v.videoWidth > 0) h = v.videoHeight / (v.videoWidth / w);
    c.setAttribute('width', w);
    c.setAttribute('height', h);
    // Reverse the canvas image
    con.translate(w, 0);
    con.scale(-1, 1);
    isStreaming = true;
  }
}, false);

v.addEventListener('play', function() {
  // Every 33 milliseconds copy the video image to the canvas
  setInterval(function() {
    if (v.paused || v.ended) return;
    con.fillRect(0, 0, w, h);
    con.drawImage(v, 0, 0, w, h);
    //goingGrey();
    chromaKey();
  }, 33);
}, false);

var chromaKey = function() {
  var camData = con.getImageData(0, 0, w, h);
  //con.drawImage(bg, 0, 0, w, h);
  //var bgData = con.getImageData(0, 0, w, h);
  var imgData = con.createImageData(w, h);

  for (i = 0; i < imgData.width * imgData.height * 4; i += 4) {
    var r = camData.data[i + 0];
    var g = camData.data[i + 1];
    var b = camData.data[i + 2];
    var a = camData.data[i + 3];
    // compare rgb levels for green and set alphachannel to 0;
    selectedR = 20;
    selectedG = 80; 
    selectedB = 50;
    if ((r >= selectedR && r <= selectedR + 50) &&
        (g >= selectedG && g <= selectedG + 175) &&
        (b >= selectedB && b <= selectedB + 120)) { 
      imgData.data[i + 0] = 0;//bgData.data[i + 0];
      imgData.data[i + 1] = 0;//bgData.data[i + 1];
      imgData.data[i + 2] = 0;//bgData.data[i + 2];
      imgData.data[i + 3] = 0;//bgData.data[i + 3];
    } else {
      imgData.data[i + 0] = r;
      imgData.data[i + 1] = g;
      imgData.data[i + 2] = b;
      imgData.data[i + 3] = a;
    }
  }
  con.putImageData(imgData, 0, 0);
};

