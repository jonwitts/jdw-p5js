// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_1_04

/**
 * shapes in a grid, that are always facing the mouse
 *
 * MOUSE
 * position x/y        : position to face
 *
 * KEYS
 * 1-7                 : choose shapes
 * arrow up/down       : scale of shapes
 * arrow left/right    : additional rotation of shapes
 * d                   : toggle size depending on distance
 * g                   : toggle grid resolution
 * s                   : save png
 */
'use strict';

var tileCount = 10;

var tileWidth;
var tileHeight;
var shapeSize = 50;
var newShapeSize = shapeSize;
var shapeAngle = 0;
var maxDist;
var currentShape;
var shapes;

var sizeMode = 0;

function preload() {
  shapes = []; // create shapes array
  shapes.push(loadImage('data/module_1.svg')); // load each image into array
  shapes.push(loadImage('data/module_2.svg'));
  shapes.push(loadImage('data/module_3.svg'));
  shapes.push(loadImage('data/module_4.svg'));
  shapes.push(loadImage('data/module_5.svg'));
  shapes.push(loadImage('data/module_6.svg'));
  shapes.push(loadImage('data/module_7.svg'));
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  background(255);
  // set the current shape to the first in the array
  currentShape = shapes[0];
  tileWidth = width / tileCount; // start with a 10 x 10 grid
  tileHeight = height / tileCount;
  maxDist = sqrt(pow(width, 2) + pow(height, 2));
}

function draw() {
  clear();
  background(255);

  for (var gridY = 0; gridY < tileCount; gridY++) { // draw the grid
    for (var gridX = 0; gridX < tileCount; gridX++) { // draw the grid

      var posX = tileWidth * gridX + tileWidth / 2;
      var posY = tileHeight * gridY + tileWidth / 2;

      // calculate angle between mouse position and actual position of the shape
      var angle = atan2(mouseY - posY, mouseX - posX) + (shapeAngle * (PI / 180));

      if (sizeMode == 0) newShapeSize = shapeSize;
      if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);
      if (sizeMode == 2) newShapeSize = map(dist(mouseX, mouseY, posX, posY), 0, 500, 5, shapeSize);

      push();
      translate(posX, posY);
      rotate(angle);
      noStroke();
      image(currentShape, 0, 0, newShapeSize, newShapeSize);
      pop();
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }
  if (key == 'd' || key == 'D') sizeMode = (sizeMode + 1) % 3; // cycle sizeMode between 0 and 3
  if (key == 'g' || key == 'G') {
    tileCount += 5;
    if (tileCount > 20) { // allow tileCount to be 10, 15 or 20
      tileCount = 10;
    }
    tileWidth = width / tileCount;
    tileHeight = height / tileCount;
  }

  if (key == '1') currentShape = shapes[0]; // load shapes on key presses
  if (key == '2') currentShape = shapes[1];
  if (key == '3') currentShape = shapes[2];
  if (key == '4') currentShape = shapes[3];
  if (key == '5') currentShape = shapes[4];
  if (key == '6') currentShape = shapes[5];
  if (key == '7') currentShape = shapes[6];

  if (keyCode == UP_ARROW) shapeSize += 5;
  if (keyCode == DOWN_ARROW) shapeSize = max(shapeSize - 5, 5);
  if (keyCode == LEFT_ARROW) shapeAngle += 5;
  if (keyCode == RIGHT_ARROW) shapeAngle -= 5;
}
