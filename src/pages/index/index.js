console.log('index page js');

window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();

function loadSound() {
  var request = new XMLHttpRequest();
  request.open("GET", "http://localhost:8000/sound", true); 
  request.responseType = "arraybuffer";

  request.onload = function() {
      var Data = request.response;
      process(Data);
  };

  request.send();
 }
