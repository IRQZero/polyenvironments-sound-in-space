var createjs = require('createjs-soundjs');
console.log('index page js');
// if initializeDefaultPlugins returns false, we cannot play sound in this browser
if (!createjs.Sound.initializeDefaultPlugins()) {
  return;
} else {
  console.log('rad, sound off');
}
