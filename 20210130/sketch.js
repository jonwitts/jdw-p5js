// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_4_1_2_01

/**
 * image feedback process.
 *
 * KEYS
 * del, backspace      : clear screen
 * s                   : save png
 */
'use strict';

var img;

function preload() {
  img = loadImage('data/pic2.png');
}

function setup() {
  createCanvas(1024, 780);
  image(img, 0, 100); // offset image 100 pixels down
}

function draw() {
  var x1 = floor(random(width)); // randomly determine the x position of the image to be copied - x1
  var y1 = 50; 

  var x2 = round(x1 + random(-7, 7)); // randomly determine the x position of the target - x2
  var y2 = round(y1 + random(-5, 5)); // randomly determine the y position of the target - y2

  var w = floor(random(10, 60)); // width w of slice is also determined randomly
  var h = height - 100;

  set(x2, y2, get(x1, y1, w, h)); // get() function copies some of the canvas, and pastes it using set()
}

function keyReleased() {
  if (key == 's' || key == 'S' ) { // save png if s key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    clear();
    image(img, 0, 100);
  }
}
