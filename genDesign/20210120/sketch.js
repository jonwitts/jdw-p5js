// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_2_1_01

/**
 * draw the path of a stupid agent
 *
 * MOUSE
 * position x          : drawing speed
 *
 * KEYS
 * 1, 2, 3             : set diameter and stepSize
 * DEL/BACKSPACE       : clear display
 * s                   : save png
 */
'use strict';

var NORTH = 0; // eight constants with different numerical value
var NORTHEAST = 1; // each point of the compass
var EAST = 2;
var SOUTHEAST = 3;
var SOUTH = 4;
var SOUTHWEST = 5;
var WEST = 6;
var NORTHWEST = 7;
var direction;

var stepSize = 1; //step size and diameter of agent are set here
var diameter = 1;

var posX;
var posY;

function setup() {
  createCanvas(windowWidth - 100, windowHeight -100);
  noStroke();
  fill(255, 40);

  posX = width / 2;
  posY = height / 2;
}

function draw() {
  for (var i = 0; i <= mouseX; i++) {
    direction = int(random(0, 8)); // create random number between 0.000 and 7.999, rounded down to 0 and 7 with int()

    if (direction == NORTH) { // if direction = NORTH decrease posY by step size
      posY -= stepSize;
    } else if (direction == NORTHEAST) { // decrease posY and increase posX by step size
      posX += stepSize;
      posY -= stepSize;
    } else if (direction == EAST) {
      posX += stepSize;
    } else if (direction == SOUTHEAST) {
      posX += stepSize;
      posY += stepSize;
    } else if (direction == SOUTH) {
      posY += stepSize;
    } else if (direction == SOUTHWEST) {
      posX -= stepSize;
      posY += stepSize;
    } else if (direction == WEST) {
      posX -= stepSize;
    } else if (direction == NORTHWEST) {
      posX -= stepSize;
      posY -= stepSize;
    }

    if (posX > width) posX = 0; // when agent posX extends past width, set to 0 so it continues at other side of screen
    if (posX < 0) posX = width;
    if (posY < 0) posY = height;
    if (posY > height) posY = 0;

    ellipse(posX + stepSize / 2, posY + stepSize / 2, diameter, diameter); // transparent circle drawn in new position with fill(0, 40)
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (keyCode == DELETE || keyCode == BACKSPACE) clear();
  // change diameter and stepSize
  if (key == '1') {
    diameter = 1;
    stepSize = 1;
  }
  if (key == '2') {
    diameter = 2;
    stepSize = 2;
  }
  if (key == '3') {
    diameter = 5;
    stepSize = 5;
  }
}
