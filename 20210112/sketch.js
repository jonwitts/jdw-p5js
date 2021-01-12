// Sketch from Generative Design v2
// http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_1_02

/**
 * changing strokeweight on diagonals in a grid with colors
 *
 * MOUSE
 * position x          : left diagonal strokeweight
 * position y          : right diagonal strokeweight
 * left click          : new random layout
 *
 * KEYS
 * s                   : save png
 * 1                   : round strokecap
 * 2                   : square strokecap
 * 3                   : project strokecap
 * 4                   : color left diagonal
 * 5                   : color right diagonal
 * 6                   : transparency left diagonal
 * 7                   : transparency right diagonal
 * 0                   : default
 */
'use strict';

var tileCount = 20; // defines grid resolution
var actRandomSeed = 0;

var actStrokeCap;

var colorLeft;
var colorRight;
var alphaLeft = 255;
var alphaRight = 255;

function setup() {
  createCanvas(600, 600);
  
  actStrokeCap = ROUND; // starting StrokeCap
  colorLeft = color(197, 0, 123, alphaLeft);
  colorRight = color(87, 35, 129, alphaRight);
}

function draw() {
  clear();
  background(255, 204, 0, 255);
  strokeCap(actStrokeCap);

  randomSeed(actRandomSeed);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;

      var toggle = int(random(0, 2)); // random number between 0.000 and 1.999, rounded off when converted to int to give value between 0 and 1

      if (toggle == 0) { // if toogle is set to zero (see line 55) draw line from upper left to lower right in grid (line A)
        stroke(colorLeft);
        strokeWeight(mouseX / 10); // mouse pos on X defines stroke weight of line A
        line(posX, posY, posX + width / tileCount, posY + height / tileCount);
      }
      if (toggle == 1) { // if toogle is set to one (see line 55) draw line from lower left to upper right in grid (line B)
        stroke(colorRight);
        strokeWeight(mouseY / 10); // mouse pos on Y defines stroke weight of line B
        line(posX, posY + width / tileCount, posX + height / tileCount, posY);
      }
    }
  }
}

function mousePressed() {
  actRandomSeed = random(100000); // set a new Random Seed value between 0 and 100000 when mouse is clicked
}

function keyReleased() {
  if (key == 's' || key == 'S') { // save png if S key released
    let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second() + "-" + nf(millis(), 3, 0);
    saveCanvas(timeStamp, 'png');
  }

  if (key == '1') actStrokeCap = ROUND; // keys 1 through 3 set stroke end type
  if (key == '2') actStrokeCap = SQUARE;
  if (key == '3') actStrokeCap = PROJECT;

  var black = color(0, 0, 0, 255); // create black colour variable
  if (key == '4') { // key 4 changes colorLeft diagnols
    if (colorsEqual(colorLeft, black)) {
      colorLeft = color(197, 0, 123, alphaLeft); // if colorLeft is black 
    } else {
      colorLeft = color(0, 0, 0, alphaLeft); // if colorLeft is not black
    }
  }
  if (key == '5') { // key 5 changes colorRight diagnols
    if (colorsEqual(colorRight, black)) { 
      colorRight = color(87, 35, 129, alphaRight); // if colorRight is black
    } else {
      colorRight = color(0, 0, 0, alphaRight); // if colorRight s not black
    }
  }

  if (key == '6') { // key 6 changes diagnol left transparency
    if (alphaLeft == 255) {
      alphaLeft = 127; // if alphaLeft is full transparent
    } else {
      alphaLeft = 255; 
    }
    colorLeft = color(red(colorLeft), green(colorLeft), blue(colorLeft), alphaLeft);
  }
  if (key == '7') { // key 7 changes diagnol right transparency
    if (alphaRight == 255) {
      alphaRight = 127; // if alphaRight is full transparent
    } else {
      alphaRight = 255;
    }
    colorRight = color(red(colorRight), green(colorRight), blue(colorRight), alphaRight);
  }

  if (key == '0') { // key 0 sets everything back to default
    actStrokeCap = ROUND;
    alphaLeft = 255;
    alphaRight = 255;
    colorLeft = color(197, 0, 123, alphaLeft);
    colorRight = color(87, 35, 129, alphaRight);
  }
}

function colorsEqual(col1, col2) { // function to compare colour values as string
  return col1.toString() == col2.toString();
}
