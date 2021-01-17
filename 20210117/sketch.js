// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_3_01

/**
 * changing circle amount, size and position in a grid
 *
 * MOUSE
 * position x          : circle amount and size
 * position y          : circle position
 * left click          : random position
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var count = 0;
var tileCountX = 10;
var tileCountY = 10;
var tileWidth = 0;
var tileHeight = 0;

var colorStep = 15;

var circleCount = 0;
var endSize = 0;
var endOffset = 0;

var actRandomSeed = 0;

function setup() {
  createCanvas(800, 800);
  tileWidth = width / tileCountX;
  tileHeight = height / tileCountY;
  noFill();
  stroke(255, 128);
}

function draw() {
  background(0);
  randomSeed(actRandomSeed);

  translate(tileWidth / 2, tileHeight / 2);

  circleCount = mouseX / 30 + 1; // x position defines circleCount
  endSize = map(mouseX, 0, max(width, mouseX), tileWidth / 2, 0); // x position also defines endSize
  endOffset = map(mouseY, 0, max(height, mouseY), 0, (tileWidth - endSize) / 2); // mouse position defines offset of last circle

  for (var gridY = 0; gridY <= tileCountY; gridY++) {
    for (var gridX = 0; gridX <= tileCountX; gridX++) {
      push(); // push coordinate system to currect drawing location as this makes the varying rotation easier to manage
      translate(tileWidth * gridX, tileHeight * gridY);
      scale(1, tileHeight / tileWidth);

      var toggle = int(random(0, 4)); // random betweem 0 and 4 converted to int give us 4 possible toggle positions
      if (toggle == 0) rotate(-HALF_PI); // HALF_PI in rads = 90 degrees
      if (toggle == 1) rotate(0);
      if (toggle == 2) rotate(HALF_PI);
      if (toggle == 3) rotate(PI);

      // draw module
      for (var i = 0; i < circleCount; i++) { // draw our concentric circles
        var diameter = map(i, 0, circleCount, tileWidth, endSize); 
        var offset = map(i, 0, circleCount, 0, endOffset);
        ellipse(offset, 0, diameter, diameter);
      }
      pop(); // return coordinates to previous position
    }
  }
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
}
