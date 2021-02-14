// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_4_1_2_02

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
  img = loadImage('data/pic3.png');
}

function setup() {
  createCanvas(1024, 576);
  image(img, 0, 0);
}

function draw() {
  var x1 = random(width); // randomly determine the x position of the image to be copied - x1
  var y1 = random(height); // randomly determine the y position of the image to be copied - y1

  var x2 = round(x1 + random(-20, 20)); // randomly determine the x position of the target - x2
  var y2 = round(y1 + random(-20, 20)); // randomly determine the y position of the target - y2

  var w = floor(random(5, 40)); // width w of slice is also determined randomly
  var h = floor(random(2, 20)); // height h of slice is also determined randomly

  set(x2, y2, get(x1, y1, w, h)); // get() function copies some of the canvas, and pastes it using set()
}

function keyReleased() {
  if (key == 's' || key == 'S' ) { // save png if s key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) { // reset if delete or backspace is released
    clear();
    image(img, 0, 0);
  }
}
