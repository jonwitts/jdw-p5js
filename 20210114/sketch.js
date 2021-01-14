// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_2_01

/**
 * changing size and position of circles in a grid
 *
 * MOUSE
 * position x          : circle position
 * position y          : circle size
 * left click          : random position
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var tileCount = 20;
var actRandomSeed = 0;

var circleAlpha = 130;
var circleColor;

function setup() {
  createCanvas(600, 600);
  noFill();
  circleColor = color(255, 255, 255, circleAlpha);
}

function draw() {
  translate(width / tileCount / 2, height / tileCount / 2); // shift coordinate system by half a tile across and down to centre the circles in the tiles

  background(0);

  randomSeed(actRandomSeed);

  stroke(circleColor);
  strokeWeight(mouseY / 60);

  for (var gridY = 0; gridY < tileCount; gridY++) { // draw the grid
    for (var gridX = 0; gridX < tileCount; gridX++) { // draw the grid

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      var shiftX = random(-mouseX, mouseX) / 20; // the higher the value of mouseX, the greater the range of random numbers
      var shiftY = random(-mouseX, mouseX) / 20; // for the position of the circle shift

      ellipse(posX + shiftX, posY + shiftY, mouseY / 15, mouseY / 15); // mouseY controls the size of the shifted circle
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
