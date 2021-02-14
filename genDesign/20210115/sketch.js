// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_2_03

/**
 * changing size of circles in a rad grid depending the mouseposition
 *
 * MOUSE
 * position x/y        : module size and offset z
 *
 * KEYS
 * s                   : save png
 */
'use strict';

var tileCount = 20;

var moduleColor;
var moduleAlpha = 180;
var maxDistance = 500;
var tileShape = "R"; // start with rectangles

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(3);
  moduleColor = color(255, 255, 255, moduleAlpha);
}

function draw() {
  clear();

  stroke(moduleColor);

  for (var gridY = 0; gridY < width; gridY += 25) {
    for (var gridX = 0; gridX < height; gridX += 25) {
      var diameter = dist(mouseX, mouseY, gridX, gridY);
      diameter = diameter / maxDistance * 40;
      push();
      translate(gridX, gridY, diameter * 5);
      if (tileShape == "R") {
        rect(0, 0, diameter, diameter); // display rectangles
      }
      if (tileShape == "E") {
        ellipse(0, 0, diameter, diameter); // display ellipses
      }
      pop();
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (key == '1') { tileShape = "R";} // switch to rectangles if 1 is pressed
  if (key == '2') { tileShape = "E";} // switch to ellipses if 2 is pressed
}
