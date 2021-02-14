// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_2_04

/**
 * moving corners of rectangles in a grid
 *
 * MOUSE
 * position x          : corner position offset x
 * position y          : corner position offset y
 * left click          : random position
 *
 * KEYS
 * s                   : save png
 * 1, 2, 3             : set tileCount
 */
'use strict';

var tileCount = 20;
var actRandomSeed = 0;
var canvasSize = 600;
var rectSize = canvasSize / tileCount;

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  fill(192, 100, 64, 60);
}

function draw() {
  clear();

  randomSeed(actRandomSeed);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      var shiftX1 = mouseX / tileCount * random(-1, 1);
      var shiftY1 = mouseY / tileCount * random(-1, 1);
      var shiftX2 = mouseX / tileCount * random(-1, 1);
      var shiftY2 = mouseY / tileCount * random(-1, 1);
      var shiftX3 = mouseX / tileCount * random(-1, 1);
      var shiftY3 = mouseY / tileCount * random(-1, 1);
      var shiftX4 = mouseX / tileCount * random(-1, 1);
      var shiftY4 = mouseY / tileCount * random(-1, 1);

      push();
      translate(posX, posY);
      beginShape();
      vertex(shiftX1, shiftY1);
      vertex(rectSize + shiftX2, shiftY2);
      vertex(rectSize + shiftX3, rectSize + shiftY3);
      vertex(shiftX4, rectSize + shiftY4);
      endShape();
      pop();
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
  switch (key) { // change tileCount with 1, 2 and 3
    case '1': 
      tileCount = 15;
      rectSize = canvasSize / tileCount;
      break;
    case '2': 
      tileCount = 20;
      rectSize = canvasSize / tileCount;
      break;
    case '3': 
      tileCount = 25;
      rectSize = canvasSize / tileCount;
      break;
  }
}
